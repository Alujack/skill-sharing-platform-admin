'use client'
import InstructorSideBar from "@/components/sidebar/InstructorSidebar";

export default function RootLayout({children}) {
  return (

        <div className="flex h-screen">
          <InstructorSideBar>
            <div className=" rounded-lg dark:border-gray-700">
              <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
          </InstructorSideBar>
        </div>
  );
}
