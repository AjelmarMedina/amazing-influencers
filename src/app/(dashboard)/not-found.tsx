import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center p-4 md:p-12 lg:p-28 ">
      <section className="w-full h-fit flex flex-col items-center space-y-8 text-center shadow-2xl py-24 rounded-xl">
        <AlertCircle className="w-10 h-10 text-primary" />
        <h1 className="font-extrabold text-4xl">404</h1>
        <h2 className="text-2xl">Oops! Page cannot be found...</h2>
      </section>
    </main>
  )
}