export const metadata = { title: 'Dashboard | LMS' };

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">LMS Dashboard</h1>
      <p className="mt-2 text-zinc-700">Protected route: you're logged in.</p>
      
      <div className="mt-8 pt-8 border-t border-zinc-200">
        <p className="text-xs text-zinc-500">
          This is a proprietary instructional and workforce development platform operated by Elevate for Humanity. Access is limited to authorized participants.
        </p>
      </div>
    </main>
  );
}
