"use client";
import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { type EditorState, type LexicalEditor } from "lexical";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

const OnChangePlugin = ({
  onChange,
}: {
  onChange: (editorState: EditorState) => void;
}) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
};

const Editor = ({
  paperId,
  editorState,
}: {
  paperId?: string;
  editorState?: EditorState;
}) => {
  const pathname = usePathname();
  const supabase = createClient();
  const editorRef = useRef<LexicalEditor>(null);

  const initialConfig: InitialConfigType = {
    editable: false,
    editorState: editorState,
    namespace: "MyEditor",
    theme: {},
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
    ],
    onError: () => console.log("error"),
  };

  useEffect(() => {
    let editable;

    if (pathname === "/") {
      editable = true;
    } else if (paperId) {
      const editableIds =
        typeof window !== "undefined"
          ? localStorage.getItem("editableIds")
          : null;

      editable = editableIds
        ? JSON.parse(editableIds).includes(paperId)
        : false;
    }
    editorRef?.current?.setEditable(editable);
  }, []);

  const handleChange = async (editorState: EditorState) => {
    const state = editorState.toJSON();
    const value = JSON.stringify(editorState.toJSON());
    // @ts-expect-error: to fix
    if (state.root.children[0].children.length) {
      localStorage.setItem("editorState", value);
      if (pathname === "/") {
        const id = crypto.randomUUID();
        history.replaceState({}, "", `/${id}`);
        const editableIdsCache = localStorage.getItem("editableIds");

        const ids = editableIdsCache ? JSON.parse(editableIdsCache) : [];

        localStorage.setItem("editableIds", JSON.stringify(ids.concat(id)));

        await supabase
          .from("papers")
          .insert([
            {
              id,
              editorState: value,
            },
          ])
          .select();
      } else {
        await supabase
          .from("papers")
          .update({ editorState: value })
          .eq("id", pathname.slice(1))
          .select();
      }
    } else {
      if (pathname.length > 2) {
        localStorage.removeItem("editorState");
        await supabase
          .from("papers")
          .update({ editorState: value })
          .eq("id", pathname.slice(1))
          .select();
      }
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-screen outline-none" />
        }
        placeholder={
          <div className="absolute left-0 top-0 text-base m-0">
            Start writing...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ClearEditorPlugin />

      <ListPlugin />
      <OnChangePlugin onChange={handleChange} />
      <EditorRefPlugin editorRef={editorRef} />
    </LexicalComposer>
  );
};

export default Editor;
