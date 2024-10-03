import { createClient } from "@/utils/supabase/server";
import Editor from "@/app/components/editor";
import LogoLine from "@/app/components/logo-line";
export const runtime = "edge";

const Page = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("papers")
    .select("*")
    .eq("paperId", params.id);

  return (
    <div>
      <div className="my-12 md:my-8 w-full flex flex-col items-center gap-y-16 px-4">
        <article className="prose prose-blue lg:prose-lg relative w-full">
          <Editor paperId={params.id} editorState={data?.[0].editorState} />
        </article>
        <LogoLine />
      </div>
    </div>
  );
};

export default Page;
