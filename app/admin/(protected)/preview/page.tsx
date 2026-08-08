import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PortfolioHome from "@/app/components/PortfolioHome";

export const metadata = {
  title: "Preview — Portfolio",
  robots: { index: false, follow: false },
};

// Admin-only live preview of the public site. The proxy blocks the real public
// routes while logged in, so this is how the admin reviews their edits without
// signing out. It renders the exact same page component as `/`.
export default function PreviewPage() {
  return (
    <div className="-mx-6 -my-10">
      <div className="sticky top-0 z-[60] flex items-center justify-between gap-4 bg-slate-900/90 text-white px-6 py-2.5 backdrop-blur">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Preview mode
        </span>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-bold hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
      </div>
      <PortfolioHome />
    </div>
  );
}
