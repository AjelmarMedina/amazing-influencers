"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsPages = [
  {
    name: "Account",
    route: "/account",
  },
  {
    name: "Profile",
    route: "/profile",
  },
  {
    name: "Plan & Billing",
    route: "/billing",
  },
  {
    name: "Mail",
    route: "/mail",
  },
  {
    name: "Refer & Earn",
    route: "/refer",
  },
  {
    name: "Shipping & Handling",
    route: "/shipping",
  },
  {
    name: "Developers",
    route: "/developers",
  },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname().replace("/dashboard/settings", "");

  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Account settings</h1>
      </header>
      <section className="w-full shadow-md bg-white rounded-xl grid items-stretch overflow-auto">
        <header className="w-full flex flex-row bg-[rgba(32,201,151,0.2)] justify-start overflow-auto">
          {settingsPages.map((page, index) => (
            <Button
              key={index}
              variant={"ghost"}
              className={cn("font-bold text-base rounded-none hover:bg-primary/90",
                pathname === page.route && "text-primary border-b-[3.5px] border-primary"
              )}
            >
              <Link href={`/dashboard/settings${page.route}`}>
                {page.name}
              </Link>
            </Button>
          ))}
        </header>
        <div className="p-6 flex flex-col items-stretch">
          {children}
        </div>
      </section>
    </div>
  )
}