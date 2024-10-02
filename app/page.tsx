import Editor from "@/app/components/editor";
import LogoLine from "@/app/components/logo-line";

export default function Home() {
  return (
    <div>
      <div className="my-12 md:my-8 w-full flex flex-col items-center gap-y-16 px-4">
        <article className="prose prose-blue lg:prose-lg relative w-full">
          <Editor />
        </article>
        <LogoLine />
      </div>
    </div>
  );
}
