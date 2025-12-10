"use client";

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-auto">
      <h3 className="font-semibold mb-3">Preview</h3>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
