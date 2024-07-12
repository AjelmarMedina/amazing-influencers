import SimpleSlider from "@/components/sass-components/slickslider/slider";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return(
    <main className="pt-24 w-full">
      <div className="min-h-screen py-8 md:py-24 flex flex-col items-stretch space-y-10 px-4 md:px-8 lg:px-16">
        <section className="flex flex-col-reverse justify-stretch space-y-reverse space-y-8 md:space-y-0 md:grid grid-cols-2 md:gap-8 lg:gap-14">
          <article className="flex flex-col items-stretch space-y-8">
            <h1 className="text-4xl font-extrabold text-center md:text-start">About Us</h1>
            <p>
              At Amazing Influencers, we&apos;re passionate about creating a win-win situation for both businesses and customers. We believe that genuine customer feedback holds immense power to improve products, build brand loyalty, and ultimately drive success.
            </p>
            <p>
              Our mission is to revolutionize customer engagement by providing businesses with a seamless and effective way to collect valuable feedback directly from their customers. We strive to empower businesses to make data-driven decisions that enhance customer satisfaction and foster long-lasting brand loyalty.
            </p>
            <Button className="bg-primary hover:bg-primary/90" asChild={true}>
              <Link href={"/contact"}>
                Contact us now
              </Link>
            </Button>
          </article>
          <Image 
            alt="About us"
            src={"/about-us.png"}
            width={626}
            height={417}
            className="self-center justify-self-center"
          />
        </section>
        <section>
          <SimpleSlider className="bg-transparent" />
        </section>
      </div>
      <Footer />
    </main>
  )
}