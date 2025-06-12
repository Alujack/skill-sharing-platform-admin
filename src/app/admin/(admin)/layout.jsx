import React from "react";
import SideBar from  "../../../components/sidebar";
export default function RootLayout({children}) {
  return (
        <div className="flex h-screen">
          <SideBar>
            <div className=" rounded-lg dark:border-gray-700">
              <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
          </SideBar>
        </div>
  );
}
