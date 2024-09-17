import Page from "./RegisterForm";

export default function Register() {
  return (
    <main className="w-full h-fit min-h-screen pt-28 py-28 bg-[#F5FAFF]">
      <section className="w-full h-fit text-center py-8">
        <h1 className="text-2xl font-extrabold">
          Sign up now!
        </h1>
        <p className="text-lg">
          Signing up is easy!
        </p>
      </section>
      <section className="w-full flex justify-center">
        <Page />
      </section>
    </main>
  )
}
