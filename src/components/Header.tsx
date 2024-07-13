'use client';

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Header() {
  return (
    <section className="light fixed w-screen h-fit px-8 md:px-16 py-4 md:py-8 z-30">
      <header className="flex flex-row justify-between items-center w-full h-fit border rounded-3xl border-primary px-5 bg-white py-4">
        <Button variant={"ghost"} className="hover:bg-transparent" asChild={true}>
          <Link href={"/"}>
            <h1 className="w-max h-full text-base">
              Amazing <span className="text-primary">Influencers</span>
            </h1>
          </Link>
        </Button>
        <Nav className="hidden lg:block" />
        <AccountSet className="hidden lg:block" />

        <Sheet>
          <SheetTrigger className="bg-primary hover:bg-primary/90 lg:hidden p-2 rounded">
              <MenuIcon className={cn("text-white transition-transform")} />
          </SheetTrigger>
          <SheetContent side={"top"}>
            <Nav
              className={cn("lg:hidden bg-white space-y-4 py-4 rounded-3xl flex flex-col items-stretch justify-center w-full h-fit")}
            >
              <AccountSet className="flex justify-center" />
            </Nav>
          </SheetContent>
        </Sheet>
      </header>
    </section>
  )
}

function Nav({ className, children }: React.HtmlHTMLAttributes<ReactElement>) {
  const pathname = usePathname();
  
  return(
    <nav className={cn("*:text-xl", className)}>
      <Button
        variant={"ghost"}
        asChild={true}
        className={cn(pathname === "/" && "text-primary hover:text-primary/90")}
      >
        <Link href={"/"}>
          Home
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        asChild={true}
        className={cn(pathname === "/about" && "text-primary hover:text-primary/90")}
      >
        <Link href={"/about"}>
          About us
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        asChild={true}
        className={cn(pathname === "/services" && "text-primary hover:text-primary/90")}
      >
        <Link href={"/services"}>
          Services
        </Link>
      </Button>
      <Button
        variant={"ghost"}
        asChild={true}
        className={cn(pathname === "/contact" && "text-primary hover:text-primary/90")}
      >
        <Link href={"/contact"}>
          Get in touch
        </Link>
      </Button>
      {children}
    </nav>
  )
}

function AccountSet({ className }: React.HtmlHTMLAttributes<ReactElement>) {
  return (
    <div className={cn("space-x-2", className)}>
      <Button variant={"ghost"} className="text-primary hover:text-primary text-base" asChild={true}>
        <Link href={"/login"}>
          Login
        </Link>
      </Button>
      <Button variant={"default"} className="text-white bg-primary hover:bg-primary/90 text-base" asChild={true}>
        <Link href={"/register"}>
          Sign up
        </Link>
      </Button>
    </div>
  )
}