"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { Button } from "./ui/button";

export default function HeaderNav({ className, children }: React.HtmlHTMLAttributes<ReactElement>) {
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