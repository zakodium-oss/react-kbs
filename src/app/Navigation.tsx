/* This example requires Tailwind CSS v2.0+ */
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { useState } from 'react';

import { useKbsGlobalShortcuts } from '../component';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#' },
  { name: 'Team', icon: UsersIcon, href: '#', count: 3 },
  { name: 'Projects', icon: FolderIcon, href: '#', count: 4 },
  { name: 'Calendar', icon: CalendarIcon, href: '#' },
  { name: 'Documents', icon: InboxIcon, href: '#', count: 12 },
  { name: 'Reports', icon: ChartBarIcon, href: '#' },
];

export default function Navigation() {
  const [currentItem, setCurrentItem] = useState(0);

  function selectNextItem() {
    setCurrentItem((currentItem) => {
      if (currentItem < navigation.length - 1) {
        return currentItem + 1;
      }
      return currentItem;
    });
  }

  function selectPreviousItem() {
    setCurrentItem((currentItem) => {
      if (currentItem > 0) {
        return currentItem - 1;
      }
      return currentItem;
    });
  }

  useKbsGlobalShortcuts([
    {
      key: 'PageUp',
      shift: true,
      handler: selectPreviousItem,
    },
    {
      key: 'PageDown',
      shift: true,
      handler: selectNextItem,
    },
  ]);

  return (
    <div className="flex flex-col flex-grow w-64 h-full pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
      <div className="flex items-center flex-shrink-0 px-4">
        <img
          className="w-auto h-8"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
          alt="Workflow"
        />
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
          {navigation.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={clsx(
                index === currentItem
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              )}
            >
              <item.icon
                className={clsx(
                  index === currentItem
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
                    index === currentItem
                      ? 'bg-white'
                      : 'bg-gray-100 group-hover:bg-gray-200',
                    'ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full',
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
