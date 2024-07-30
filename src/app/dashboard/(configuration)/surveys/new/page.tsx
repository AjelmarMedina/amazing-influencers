import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CreateSurveyForm from "./CreateSurveyForm";

export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-start">
        <Button variant={"ghost"} asChild> 
          <Link href={"/dashboard/surveys"}>
            <ChevronLeftIcon />
          </Link> 
        </Button>
        <h1 className="font-bold text-2xl">Create a new Survey</h1>
      </header>
      <section className="max-w-full shadow-md bg-white rounded-xl flex flex-col items-stretch">
        <header className="p-6 bg-[rgba(243,244,246,0.8)] justify-start">
          <h2 className="font-bold text-base">New Survey </h2>
        </header>
        <div className="p-6 flex flex-col items-stretch space-y-4">
          <Suspense>
            <CreateSurveyForm />
          </Suspense>
        </div>
      </section>
    </div>
  )
}