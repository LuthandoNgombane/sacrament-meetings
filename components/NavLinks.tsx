'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'Current Week' },
  ];

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => {
        const isActive =
          link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive
                ? 'text-blue-600 underline underline-offset-8 decoration-2 font-semibold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}