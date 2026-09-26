import NavLinks from './NavLinks';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Oak Hills 1st Ward
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{currentDate}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}