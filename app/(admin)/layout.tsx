export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-800 text-white p-4">
        <h2 className="text-lg font-semibold">Leader Admin Console</h2>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
