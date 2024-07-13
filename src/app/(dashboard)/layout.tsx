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
    <div className={cn(lato.className, "w-screen h-screen flex flex-row justify-stretch items-stretch overflow-clip")}>
      <Sheet>
        <Sidebar className="hidden md:flex" />
        <SheetContent side={"left"}>
          <Sidebar />
        </SheetContent>
        <aside className="w-full h-full">
          <header className="w-full h-20 min-h-20 z-10 border-b border-[#343A40] border-opacity-25 flex flex-row justify-between items-center py-2 px-4">
            <SheetTrigger>
              <Button variant={"ghost"} className="block md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <AmazingInfluencers className="block md:hidden" />
            <div className="flex flex-row space-x-2">
              <Button variant={"ghost"}>
                <BellIcon />
              </Button>
              <Button variant={"ghost"} className="hover:bg-transparent hover:opacity-90">
                <Image 
                  alt="Profile Picture"
                  src={"/dashboard/profile-placeholder.png"}
                  width={40}
                  height={40}
                />
              </Button>
            </div>
          </header>
          <main className="overflow-y-auto overflow-x-hidden bg-[#F5FAFF] w-full h-full *:w-full *:h-full z-0">
            <div className="px-4 md:px-8 lg:px-20 py-6 md:py-8 *">
              {children}
            </div>
          </main>
        </aside>
      </Sheet>
    </div>
  )
}
