'use client';

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { Button } from "./button";

export default function Header() {
  const [ isOpen, setIsOpen] = useState(false);

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
        <Button onClick={() => setIsOpen(!isOpen)} className="bg-primary hover:bg-primary/90 lg:hidden">
          <MenuIcon className={cn("text-white transition-transform", isOpen && "rotate-90")} />
        </Button>
      </header>
      <Nav 
        className={cn("lg:hidden bg-white space-y-4 py-4 rounded-3xl", 
          isOpen
            ? "flex flex-col items-stretch justify-center w-full h-fit"
            : "hidden"
        )} 
      >
        <AccountSet className="flex justify-center" />
      </Nav>
    </section>
  )
}

function Nav({ className, children }: React.HtmlHTMLAttributes<ReactElement>) {
  return(
    <nav className={cn("*:text-xl", className)}>
      <Button variant={"ghost"} asChild={true}>
        <Link href={"/"}>
          Home
        </Link>
      </Button>
      <Button variant={"ghost"}>
        About us
      </Button>
      <Button variant={"ghost"}>
        Services
      </Button>
      <Button variant={"ghost"}>
        Get in touch
      </Button>
      {children}
    </nav>
  )
}

function AccountSet({ className }: React.HtmlHTMLAttributes<ReactElement>) {
  return (
    <div className={className}>
      <Button variant={"ghost"} className="text-primary hover:text-primary text-base" asChild={true}>
        <Link href={""}>
          Login
        </Link>
      </Button>
      <Button variant={"default"} className="text-white bg-primary hover:bg-primary/90 text-base" asChild={true}>
        <Link href={""}>
          Sign up
        </Link>
      </Button>
    </div>
  )
}