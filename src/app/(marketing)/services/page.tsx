import Footer from "@/components/Footer"
import Image from "next/image"

export default function Services() {
  return (
    <main className="pt-24 w-full">
      <div className="min-h-screen py-12 md:py-24 flex flex-col items-stretch space-y-10 px-4 md:px-8 lg:px-24">
        <header className="px-4 md:px-8 lg:px-16 flex flex-col items-stretch text-center space-y-10 ">
          <h1 className="text-5xl font-extrabold">Our Services</h1>
          <p className="text-xl">At Amazing Influencers, we believe that customer feedback is a goldmine of valuable data. We offer a user-friendly platform and a seamless integration process, making it easy for businesses of all sizes to leverage the power of customer insights.</p>
        </header>
        <hr className="text-[#343A40]" />
        <section className="flex flex-col items-stretch text-start space-y-8 md:space-y-24 px-4 md:px-8 lg:px-28">
          <article className="flex flex-col md:items-center md:flex-row-reverse h-fit space-y-10 md:space-x-10 md:space-y-0 md:space-x-reverse">
            <div className="self-stretch space-y-6">
              <h2 className="text-2xl font-semibold">E-commerce</h2>
              <p className="text-xl">Increase and automate review collection on popular marketplaces including Amazon, Walmart, Target, Etsy, eBay, and more.</p>
            </div>
            <Image
              alt="E-Commerce"
              src={"/ecommerce.png"}
              width={200}
              height={200}
              className="self-center"
            />
          </article>
          <article className="flex flex-col md:items-center md:flex-row h-fit space-y-10 md:space-x-10 md:space-y-0">
            <div className="self-stretch space-y-6">
              <h2 className="text-2xl font-semibold">Services</h2>
              <p className="text-xl">For agencies and freelancers, we integrate with leading platforms like Trustpilot and Google Places to increase public feedback for your business.</p>
            </div>
            <Image
              alt="E-Commerce"
              src={"/services.png"}
              width={200}
              height={200}
              className="self-center"
            />
          </article>
        </section>
      </div>
      <Footer />
    </main>
  )
}