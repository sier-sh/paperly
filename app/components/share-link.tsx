"use client";
import { usePathname } from "next/navigation";

const ShareLink = () => {
  const pathname = usePathname();

  return (
    pathname.length > 3 && (
      <div className="not-prose fixed top-0 right-0 text-right text-sm text-neutral-500 px-2 py-1 flex flex-col gap-y-1 items-end">
        <button
          className="h-fit cursor-pointer text-neutral-500 hover:text-neutral-600 transition-all px-2 py-1 hover:shadow rounded"
          onClick={() => navigator.clipboard.writeText(location.href)}
        >
          Copy Paperlink
        </button>
        {/* <Link className="hover:text-neutral-800 transition-all" href="/">
          New
        </Link>
        <button className="hover:text-neutral-800 transition-all">Save</button> */}
      </div>
    )
  );
};

export default ShareLink;
