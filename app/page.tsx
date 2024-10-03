import { createClient } from "@/utils/supabase/server";
import Editor from "@/app/components/editor";
import LogoLine from "@/app/components/logo-line";
import Sqids from "sqids";

const sqids = new Sqids({
  minLength: 8,
});

export const runtime = "edge";

const Home = async () => {
  const supabase = createClient();

  const { count } = await supabase
    .from("papers")
    .select("*", { count: "exact", head: true });

  const paperId = sqids.encode([count || 0]);

  return (
    <div>
      <div className="my-12 md:my-8 w-full flex flex-col items-center gap-y-16 px-4">
        <article className="prose prose-blue lg:prose-lg relative w-full">
          <Editor initPaperId={paperId} />
        </article>
        <LogoLine />
      </div>
    </div>
  );
};

export default Home;
