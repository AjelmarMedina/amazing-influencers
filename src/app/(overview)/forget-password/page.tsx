import Link from "next/link";
import ForgetForm from "./forgetForm";

export default function Login() {

  return (
    <main className="w-full h-fit min-h-screen pt-28 py-28 bg-[#F5FAFF]">
      <section className="w-full h-fit text-center py-8">
        <h1 className="text-2xl font-extrabold">
          Forget Your Password
        </h1>
        <p className="text-lg">
          Or <Link href={"/register"} className="text-primary hover:underline">Register here</Link>
        </p>
      </section>
      <section className="w-full flex justify-center px-4 md:px-8">
        <ForgetForm />
      </section>
    </main>
  )
}