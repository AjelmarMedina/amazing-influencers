import Footer from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import { CircleArrowOutUpLeftIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

export default function Demo() {
  return (
    <main className="pt-24 w-full">
      <div className="min-h-screen flex flex-col items-stretch space-y-28 px-4 md:px-8 lg:px-16 py-8 md:py-24 ">
        <section className="flex flex-col items-stretch space-y-10">
          <header className="text-center px-4 md:px-8 lg:px-16 space-y-8">
            <h1 className="text-5xl font-extrabold">
              5-Minute Product Demo
            </h1>
            <h1 className="text-5xl font-extrabold text-primary">
              More Reviews, More Customers
            </h1>
            <p className="text-[#343A40] text-lg">
              Watch how AmazingInfluencers helps increase shopper feedback on autopilot to grow your business.
            </p>
          </header>
          <div className="w-full aspect-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=A93EAGMMV2Vq4ron"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
        <section className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
          <header className="max-w-sm flex flex-col items-center lg:items-start text-center lg:text-start space-y-8">
            <h1 className="font-extrabold text-4xl ">Ready To Start?</h1>
            <p className="text-lg text-[#343A40]">
              <span className="text-primary font-semibold">Plans</span> start at just $19 /month and scale based on your success rate, not features.
            </p>
            <p className="text-lg text-[#343A40]">
              Questions? Call us: {" "}
              <Link
                href={""}
                className="text-primary hover:text-primary/90 hover:underline inline font-semibold"
              >
                090078601
              </Link>
            </p>
          </header>
          <article
            className={cn("grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-6",
               "*:max-w-xs *:w-full *:h-full *:px-8 *:py-6 *:flex-col *:items-start *:space-y-6 *:border-2 *:shadow-lg *:rounded-2xl"
            )}
          >
            <div className="border-primary">
              <CircleArrowOutUpLeftIcon className="w-12 h-12" />
              <h3 className="font-bold text-2xl">
                Start Now
              </h3>
              <p className="text-base text-[#343A40]">
                Jump right into the dashboard and create a working survey within 2 minutes.
              </p>
              <Link href={"/contact"} className="text-primary hover:text-primary/90 hover:underline font-bold block">
                Start Now &rarr;
              </Link>
            </div>
            <div className="border-[#FCE48E]">
              <PhoneCallIcon className="w-12 h-12" />
              <h3 className="font-bold text-2xl">
                1:1 Onboarding
              </h3>
              <p className="text-base text-[#343A40]">
                Need to speak with a human? Book a private demo call with our team to learn more about us.
              </p>
              <Link href={"/contact"} className="text-[#FCE48E] hover:text-[#FCE48E]/90 hover:underline font-bold block">
                Book a demo &rarr;
              </Link>
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </main>
  )
}