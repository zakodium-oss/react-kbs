import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useKbsGlobal } from '../component';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Team', icon: UsersIcon, href: '/team', count: 3 },
  { name: 'Projects', icon: FolderIcon, href: '/projects', count: 4 },
  { name: 'Calendar', icon: CalendarIcon, href: '/calendar' },
  { name: 'Documents', icon: InboxIcon, href: '/documents', count: 12 },
  { name: 'Reports', icon: ChartBarIcon, href: '/reports' },
];

export default function Navigation() {
  const history = useHistory();
  const { pathname } = useLocation();

  const shortcuts = [
    {
      shortcut: { key: 'PageUp', shift: true },
      handler() {
        const currentItem = navigation.findIndex(
          (item) => item.href === pathname,
        );
        if (currentItem === -1 || currentItem === 0) return;
        history.push(navigation[currentItem - 1].href);
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
        history.push(navigation[currentItem + 1].href);
      },
      meta: { description: 'Go to next page' },
    },
  ];

  useKbsGlobal(shortcuts);

  return (
    <div className="flex flex-col w-64 h-full pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
      <div className="flex items-center flex-shrink-0 px-4">
        <img
          className="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
          alt="Workflow"
        />
      </div>
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
          {`Press "?" to show global shortcuts.`}
        </div>
      </div>
    </div>
  );
}
