import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { NavAccountSet } from "./AccountSet";
import AmazingInfluencers from "./Logo";
import HeaderNav from "./Nav";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {

  return (
    <section className="light fixed w-screen h-fit px-8 md:px-16 py-4 md:py-8 z-30">
      <header className="flex flex-row justify-between items-center w-full h-fit border rounded-3xl border-primary px-5 bg-white py-4">
        <AmazingInfluencers />
        <HeaderNav className="hidden lg:block" />
        <NavAccountSet className="hidden lg:flex" />
        <Sheet>
          <SheetTrigger className="bg-primary hover:bg-primary/90 lg:hidden p-2 rounded">
            <MenuIcon className={cn("text-white transition-transform")} />
          </SheetTrigger>
          <SheetContent side={"top"}>
            <HeaderNav
              className={cn("lg:hidden bg-white space-y-4 py-4 rounded-3xl flex flex-col items-stretch justify-center w-full h-fit")}
            >
              <NavAccountSet />
            </HeaderNav>
          </SheetContent>
        </Sheet>
      </header>
    </section>
  )
}


