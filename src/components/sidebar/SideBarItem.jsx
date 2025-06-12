'use client'
import React from "react";


export function SideBarItem({
  href,
  icon,
  label,
  badge,
  badgeColor = "gray"
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        {badge && (
          <span 
            className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full dark:bg-${badgeColor}-900 dark:text-${badgeColor}-300`}
          >
            {badge}
          </span>
        )}
      </a>
    </li>
  );
}