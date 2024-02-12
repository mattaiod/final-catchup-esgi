import React, { useState } from 'react';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="flex flex-col w-full overflow-x-hidden text-slate-700 dark:text-slate-50 bg-gray-50 dark:bg-slate-800">
        <div className={`w-full  relative transition-padding duration-700 pl-0 md:pl-16 rtl:pl-0 md:rtl:pr-16`}>
          <main className="w-full pt-20 ps-8  text-slate-600 dark:text-slate-50 min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
