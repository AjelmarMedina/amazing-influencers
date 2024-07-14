import AmazingInfluencers from "@/components/Logo";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BellIcon, MenuIcon } from 'lucide-react';
import { Lato } from "next/font/google";
import Image from "next/image";

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
        <SheetContent side={"left"}>
          <Sidebar />
        </SheetContent>
        <aside className="w-full max-w-full h-full flex flex-col items-stretch">
          <header className="h-20 min-h-20 z-10 border-b border-[#343A40] border-opacity-25 flex flex-row justify-between items-center py-2 px-4">
            <SheetTrigger className="visible lg:invisible">
              <MenuIcon />
            </SheetTrigger>
            <AmazingInfluencers className="block lg:hidden" />
            <div className="flex flex-row space-x-4">
              <Button variant={"ghost"} className="w-10 h-10 relative px-0">
                <BellIcon />
                <span className="absolute block w-3 h-3 rounded-full bg-red-500 border border-white top-0 right-0" />
              </Button>
              <Button variant={"ghost"} className="relative hover:bg-transparent hover:opacity-90 px-0">
                <Image 
                  alt="Profile Picture"
                  src={"/dashboard/profile-placeholder.png"}
                  width={40}
                  height={40}
                />
                <span className="absolute block w-3 h-3 rounded-full bg-green-500 border border-white bottom-0 right-0" />
              </Button>
            </div>
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
