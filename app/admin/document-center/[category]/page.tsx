import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryInfo, getDocumentsByCategory, type DocumentCategory } from "@/lms-data/docs";

interface PageProps {
  params: { category: string };
}

export const metadata = {
  title: "Document Category | Elevate for Humanity",
};

export default function DocumentCategoryPage({ params }: PageProps) {
  const categoryInfo = getCategoryInfo(params.category as DocumentCategory);

  if (!categoryInfo) {
    notFound();
  }

  const docs = getDocumentsByCategory(params.category as DocumentCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href="/admin/document-center"
            className="text-[11px] text-slate-300 hover:text-white"
          >
            ← Back to Document Center
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-3xl">{categoryInfo.icon}</div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
                Document Category
              </p>
              <h1 className="text-lg font-semibold text-white">
                {categoryInfo.title}
              </h1>
              <p className="mt-1 text-[11px] text-slate-300">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          {docs.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 text-center text-xs text-slate-300">
              <p>No documents in this category yet.</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Add documents by updating <code className="font-mono text-[10px]">lms-data/docs.ts</code> and
                placing PDFs in <code className="font-mono text-[10px]">public/docs/...</code>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b border-slate-800 bg-slate-950/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-200">
                      Document
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-200">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-200">
                      Tags
                    </th>
                    <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-200">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-slate-800/50 hover:bg-slate-950/50"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-100">
                          {doc.title}
                        </p>
                        {doc.dateAdded && (
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Added: {doc.dateAdded}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {doc.description}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={doc.url}
                          target={doc.isExternal ? "_blank" : undefined}
                          rel={doc.isExternal ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-700"
                        >
                          {doc.isExternal ? "Open Link" : "View PDF"}
                          {doc.isExternal && (
                            <span className="text-[10px]">↗</span>
                          )}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
            <p className="font-semibold text-slate-100">
              How to add your own documents:
            </p>
            <ol className="mt-2 space-y-1 pl-4 text-[11px]">
              <li>
                1. Place your PDF in <code className="font-mono text-[10px]">public/docs/...</code> (e.g.,{" "}
                <code className="font-mono text-[10px]">public/docs/funding/my-doc.pdf</code>)
              </li>
              <li>
                2. Add an entry to <code className="font-mono text-[10px]">lms-data/docs.ts</code> in the{" "}
                <code className="font-mono text-[10px]">documents</code> array
              </li>
              <li>
                3. Set the <code className="font-mono text-[10px]">url</code> to{" "}
                <code className="font-mono text-[10px]">/docs/funding/my-doc.pdf</code>
              </li>
              <li>4. Refresh this page and your document will appear</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
