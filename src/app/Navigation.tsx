import { FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import type { ComponentType } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import type { KbsDefinition } from '../component/index.ts';
import { useKbsGlobal } from '../component/index.ts';

interface NavigationItem {
  name: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  count?: number;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Team', icon: UsersIcon, href: '/team', count: 3 },
  { name: 'Projects', icon: FolderIcon, href: '/projects', count: 4 },
];

export default function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const shortcuts: KbsDefinition[] = [
    {
      shortcut: { key: 'PageUp', shift: true },
      handler() {
        const currentItem = navigation.findIndex(
          (item) => item.href === pathname,
        );
        if (currentItem === -1 || currentItem === 0) return;
        void navigate((navigation.at(currentItem - 1) as NavigationItem).href);
      },
      meta: { description: 'Go to previous page' },
    },
    {
      shortcut: { key: 'PageDown', shift: true },
      handler() {
        const currentItem = navigation.findIndex(
          (item) => item.href === pathname,
        );
        if (currentItem === -1 || currentItem === navigation.length - 1) {
          return;
        }
        void navigate((navigation.at(currentItem + 1) as NavigationItem).href);
      },
      meta: { description: 'Go to next page' },
    },
    {
      shortcut: Array.from({ length: navigation.length }, (_, i) => ({
        code: `Digit${i + 1}`,
        shift: true,
      })),
      handler(event) {
        void navigate(
          (navigation.at(Number(event.code.slice(-1)) - 1) as NavigationItem)
            .href,
        );
      },
    },
  ];

  useKbsGlobal(shortcuts);

  return (
    <div className="flex flex-col w-64 h-full pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
      <div className="flex flex-col mt-5">
        <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                item.href === pathname
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              )}
            >
              <item.icon
                className={clsx(
                  item.href === pathname
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6',
                )}
                aria-hidden="true"
              />
              {item.name}
              {item.count ? (
                <span
                  className={clsx(
                    item.href === pathname
                      ? 'bg-white'
                      : 'bg-gray-100 group-hover:bg-gray-200',
                    'ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="px-2 mt-5">
          {`Press "Shift+PageUp/PageDown" to navigate.`}
          <br />
          {`Press "Shift+Number" to focus on the corresponding navigation item.`}
          <br />
          {`Press "?" to show global shortcuts.`}
        </div>
      </div>
    </div>
  );
}
