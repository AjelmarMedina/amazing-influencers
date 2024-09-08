import { Suspense } from "react";
import ReviewTable from "./ReviewTable";

export default function Page() {
  return (
    <div className="max-w-full flex flex-col w-full space-y-4">
      <header className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Reviews</h1>
      </header>
      <Suspense>
        <ReviewTable />
      </Suspense>
    </div>
  )
}