"use client";

import { cn } from "@/lib/utils";
import { BanknoteIcon, CheckIcon, FileTextIcon, GiftIcon, HexagonIcon, PackageIcon, ShoppingBagIcon, StarIcon, StoreIcon, UploadIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from "react";
import AmazingInfluencers from "./Logo";
import { Button } from "./ui/button";

type SidebarLink = {
  name: string;
  route: string;
  icon: React.ReactNode;
}

export default function Sidebar({ className }: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname().replace("/dashboard", "");
  const features = [
    {
      section: "configuration",
      links: [
        {
          name: "Surveys",
          route: "/surveys",
          icon: (<FileTextIcon />)
        },
        {
          name: "Products",
          route: "/products",
          icon: (<ShoppingBagIcon />)
        },
        {
          name: "Giveaways",
          route: "/giveaways",
          icon: (<GiftIcon />)
        },
      ]
    },
    {
      section: "distribution",
      links: [
        {
          name: "Campaigns",
          route: "/campaigns",
          icon: (<StoreIcon />),
        },
        {
          name: "Widgets",
          route: "/widgets",
          icon: (<HexagonIcon />),
        },
        {
          name: "Package Inserts",
          route: "/package",
          icon: (<PackageIcon />),
        },
      ]
    },
    {
      section: "administration",
      links: [
        {
          name: "Orders",
          route: "/orders",
          icon: (<BanknoteIcon />),
        },
        {
          name: "Upload Center",
          route: "/uploads",
          icon: (<UploadIcon />),
        },
        {
          name: "Validation Center",
          route: "/validation",
          icon: (<CheckIcon />),
        },
      ]
    },

  ]

  return (
    <aside
      className={cn("max-w-64 w-64 h-screen min-h-screen max-h-screen flex flex-col items-stretch shadow-lg z-10", className)}
    >
      <section className="flex justify-center items-center p-6 space-x-0 border-b *:border-[#343A40] *:border-opacity-25">
        <AmazingInfluencers />
      </section>
      <div className={cn("flex-col items-stretch h-full overflow-y-auto",
        "*:border-b *:border-[#343A40] *:border-opacity-25 *:flex *:flex-col *:py-4",
      )}>
        <section className="px-8 flex-row">
          <Button variant={"ghost"} className={cn("w-full text-start justify-start", pathname === "/reviews" && "bg-primary/15")} asChild={true}>
            <Link href={"/reviews"}>
              <StarIcon className={cn("mr-4", pathname === "/reviews" && "text-primary")} /> Reviews
            </Link>
          </Button>
        </section>
        {features.map((feature, index) => (
          <SidebarSection
            key={index}
            section={feature.section}
            links={feature.links}
          />
        ))}
      </div>
    </aside>
  )

  function SidebarSection({ section, links }: {
    section: string;
    links: SidebarLink[];
  }) {
    return (
      <section className="px-4 space-y-4 flex-col">
        <p className="text-sm text-[#828282]">
          { section.toUpperCase() }
        </p>
        <ul className="px-4 flex flex-col items-stretch space-y-2">
          {links.map((feature, index) => (
            <li key={index}>
              <SidebarButton
                name={feature.name}
                route={feature.route}
                icon={feature.icon}
              />
            </li>
          ))}
        </ul>
      </section>
    )
  }

  function SidebarButton({ name, route, icon }: SidebarLink) {
    return (
      <Button variant={"ghost"} className={cn("w-full text-start justify-start", pathname === route && "bg-primary/15")} asChild={true}>
        <Link href={`/dashboard${route}`}>
          <span className={cn("mr-4", pathname === route && "text-primary")} >
            { icon }
          </span>
          { name }
        </Link>
      </Button>
    )
  }
  
}

