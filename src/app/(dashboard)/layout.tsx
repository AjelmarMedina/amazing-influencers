import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn(lato.className, "w-screen h-screen flex flex-row justify-stretch items-stretch overflow-clip")}>
      <Sidebar />
      <aside className="w-full h-full">
        <header className="w-full h-20 min-h-20 z-10 border-b border-[#343A40] border-opacity-25">

        </header>
        <div className="overflow-y-auto overflow-x-hidden bg-[#F5FAFF] w-full h-full *:w-full *:h-full z-0">
          {children}
        </div>
      </aside>
    </div>
  )
}
