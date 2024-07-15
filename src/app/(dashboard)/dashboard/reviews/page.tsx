import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function Reviews() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <section className="w-full bg-white rounded-xl shadow-lg px-6 py-10 flex flex-col justify-center items-center text-center space-y-4">
        <StarIcon className="text-primary w-8 h-8"/>
        <h1 className="font-bold text-2xl">No Reviews Collected</h1>
        <p>Waiting for someone to respond to a <Link href={""} className="text-primary hover:text-primary hover:underline">survey</Link>?</p>
        <p>Looking for <Link href={""} className="text-primary hover:text-primary hover:underline">Incomplete Submissions</Link>?</p>
      </section>
    </div>  
  )
}