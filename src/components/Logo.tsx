import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AmazingInfluencers({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Button variant={"ghost"} className={cn(montserrat.className, "hover:bg-transparent text-xl font-semibold", className)} asChild={true}>
      <Link href={"/"} >
        <h1 className="w-max h-full text-base">
          Amazing <span className="text-primary">Influencers</span>
        </h1>
      </Link>
    </Button>
  )
}