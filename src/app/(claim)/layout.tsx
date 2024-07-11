import pngRewardsBackdrop from "@/../public/claim/rewards-backdrop.png";
import Footer from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <section
        className={cn("w-full flex flex-col justify-stretch h-fit md:grid grid-cols-2 min-h-screen bg-no-repeat bg-center bg-cover",
          "*:px-4 *:md:px-8 *:lg:px-14 *:py-10 *:md:py-20"
        )}
        style={{
          
          backgroundImage: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('${pngRewardsBackdrop.src}')`,
        }}
      >
        <aside className="w-full h-full flex flex-col justify-start items-stretch text-white">
          <h1 className="font-bold text-4xl">
            Current Customers Get A <span className="text-[#FCE48E]">Free</span> Gift
          </h1>
          <Badges />
          <List />
        </aside>
        <aside className="w-full h-full flex justify-center items-center ">
          {children}
        </aside>
      </section>
      <section className="w-full h-fit flex flex-col items-center space-y-14 py-14 px-4 md:px-8 lg:px-28">
        <h1 className="font-semibold text-3xl">
          Get Your Free Gift in 2 Simple Steps
        </h1>
        <article
          className={cn("grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-8 md:gap-20 text-center",
            "*:w-full *:h-full *:flex *:flex-col *:items-stretch *:justify-center *:space-y-10 *:rounded-2xl *:shadow-2xl *:px-8 *:py-14",
          )}
        >
          <div>
            <Image 
              alt="Fill Form"
              src={"/claim/claim-1.png"}
              width={180}
              height={180}
              className="self-center"
            />
            <div className="flex flex-col items-stretch space-y-5">
              <h3 className="text-xl">Fill out form above</h3>
              <p className="text-[#343A40] text-lg">Fill out the form using your order information</p>
            </div>
          </div>
          <div>
            <Image 
              alt="Fill Form"
              src={"/claim/claim-2.png"}
              width={180}
              height={180}
              className="self-center"
            />
            <div className="flex flex-col items-stretch space-y-5">
              <h3 className="text-xl">Fill out form above</h3>
              <p className="text-[#343A40] text-lg">Fill out the form using your order information</p>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  )
}

function Badges() {
  return (
    <div
      className={cn("flex flex-row justify-start flex-wrap py-6",
        "*:w-fit *:h-fit *:rounded-lg *:px-2 *:py-2 *:m-2 *:text-xl *:bg-[rgba(32,201,151,0.5)]"
      )}
    >
      <div className="">
        No Credit Card
      </div>
      <div className="">
        No Shipping
      </div>
      <div className="">
        100% Free
      </div>
    </div>
  )
}

function List() {
  const list = [
    "Limit one free product per household. Only valid for full priced purchases. Proof of purchase from an authorized retailer may also be required.",
    "No additional purchase is necessary.",
    "Please allow 1-2 weeks for delivery.",
    "Our offer is not in any way dependent on feedback that you provide, whether that be positive or negative.",
    "Void where prohibited. Offer valid while supplies last and subject to change or cancellation at any time.",
  ]

  return (
    <ul className="text-base list-none flex flex-col items-stretch space-y-5">
      {list.map((item, index) => (
        <li key={index} className="flex flex-row justify-stretch items-start space-x-4">
          <Image
            alt=""
            src={"/claim/checkmark.svg"}
            width={26}
            height={26}
            className="self-start"
          />
          <p>
            {item}
          </p>
        </li>
      ))}

    </ul>
  )
}
