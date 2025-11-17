export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600 mb-4" />
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
