export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-5xl px-4">
        <p>Sacrament Meeting Planner &copy; {year} &bull; The Church of Jesus Christ of Latter-day Saints</p>
      </div>
    </footer>
  );
}