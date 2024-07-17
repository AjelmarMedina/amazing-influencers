"use client";

import AccountSet from "@/components/AccountSet";
import AmazingInfluencers from "@/components/Logo";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from 'lucide-react';
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sheet>
      <div className={cn(lato.className, "w-full h-screen max-w-[100%] flex flex-row justify-between overflow-hidden")}>
        <Sidebar className="hidden lg:flex" />
        <SheetContent side={"left"} className="p-0">
          <Sidebar className="w-full max-w-full"/>
        </SheetContent>
        <aside className="w-full max-w-full h-full flex flex-col items-stretch">
          <header className="h-20 min-h-20 z-10 border-b border-[#343A40] border-opacity-25 flex flex-row justify-between items-center py-2 px-4">
            <SheetTrigger className="visible lg:invisible">
              <MenuIcon />
            </SheetTrigger>
            <AmazingInfluencers className="block lg:hidden" />
            <AccountSet />
          </header>
          <main className="overflow-y-auto overflow-x-hidden bg-[#F5FAFF] w-full h-full *:w-full *:h-full z-0">
            <div className=" *:px-4 *:md:px-8 *:lg:px-10 *:py-6 *:md:py-8">
              {children}
            </div>
          </main>
        </aside>
      </div>
    </Sheet>
  )
}
