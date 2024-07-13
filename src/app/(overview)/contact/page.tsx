import Footer from "@/components/Footer";
import { MailOpenIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import ContactForm from "./Contact";

export default function Contact() {
  return (
    <main className="w-full flex flex-col items-stretch min-h-screen py-8 md:py-14 px-4 md:px-8 lg:py-28">
      <section className="mt-16 shadow-2xl flex-col items-stretch space-y-8 md:grid grid-cols-2 gap-10 py-10 px-4 md:px-8 rounded-2xl">
        <Suspense>
          <ContactForm />
        </Suspense>
        <aside className="flex flex-col items-center space-y-8">
          <Image
            alt="Contact"
            src={"/contact-us.svg"}
            width={282}
            height={366}
          />
          <ul className="flex flex-col w-max space-y-6 justify-start text-lg">
            <li className="flex flex-row space-x-4">
              <PhoneIcon className="text-primary" />
              <p>0900-78601</p>
            </li>
            <li className="flex flex-row space-x-4">
              <MailOpenIcon className="text-primary" />
              <p>example@gmail.com</p>
            </li>
            <li className="flex flex-row space-x-4">
              <MapPinIcon className="text-primary" />
              <p>Head quarters, Pakistan.</p>
            </li>
          </ul>
        </aside>
      </section>
      <Footer />
    </main>
  )
}