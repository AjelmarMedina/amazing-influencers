/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import Link from "next/link";
import SimpleSlider from "../slickslider/slider";
import style from "./home.module.scss";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <>
      <section className={style.holepage}>
        <section className={style.sec1}>
          <div>
            <div className={style.mainheaddiv}>
              <text className={style.mainheading}>
                Get <span className={style.mainheadingspan}>Rewards</span>&{" "}
                <span className={style.mainheadingspan}>Cashback</span> For Your
                Purchases
              </text>
            </div>
            <p className={style.sec1p}>
              Scan the QR code on your receipt and unlock exclusive offers.
            </p>
            <div className={style.btndiv}>
              <Link href={"#try"}><button className={style.btn1}>Find your rewards now</button></Link>
              <Link href={"/demo"}><button className={style.btn2}>Watch The Demo</button></Link>
            </div>
          </div>
          <div className={style.picdiv1}>
            <img src={"/images/pic1.png"} alt="mainpic" className={style.sec1pic1} />
          </div>
        </section>

        <section className={cn(style.sec2main, "pb-16")}>
          <h2 className="text-4xl font-bold text-slate-900">How it works</h2>

        
            <div className={style.stepscontainer}>
              <div className={style.step}>
                <div className={style.icon}>
                  <img src={"/images/pic2.png"} alt="QR Code" />
                </div>
                <div className={style.number}>
                  <span>1</span>
                </div>
                <div className={style.content}>
                  <h3>Scan the QR code</h3>
                  <p>Find the unique QR code on your receipt.</p>
                </div>
              </div>
              <div className={style.step2}>
                
                <div className={style.content}>
                  <h3>Post images and make a reel</h3>
                  <p>Upload a reel on Instagram showcasing the product.</p>
                </div>
                <div className={style.number}>
                  <span>2</span>
                </div>
                <div className={style.icon2}>
                  <img src={"/images/pic3.png"} alt="Details" />
                </div>
              
              </div>
              <div className={style.step3}>
                <div className={style.icon3}>
                  <img src={"/images/pic4.png"} alt="Feedback" />
                </div>
                <div className={style.number}>
                  <span>3</span>
                </div>
                <div className={style.content}>
                  <h3>Give your review</h3>
                  <p>Leave a review on the platform or website where you made your purchase.</p>
                </div>
              </div>
              <div className={style.step4}>
                <div className={style.content}>
                  <h3>Post on Instagram</h3>
                  <p>Tag us on Instagram and share your experience!</p>
                </div>
                <div className={style.number}>
                  <span>4</span>
                </div>
                <div className={style.icon4}>
                  <img src={"/images/Instagram.png"} alt="Reward" />
                </div>
              </div>
              <div className={style.step3}>
                <div className={style.icon3}>
                  <img src={"/images/pic5.png"} alt="Details" />
                </div>
                <div className={style.number}>
                  <span>5</span>
                </div>
                <div className={style.content}>
                  <h3>Submit your details</h3>
                  <p>Fill in your info to unlock your rewards..</p>
                </div>
              </div>
            </div>
          
        </section>
        <section>
          <SimpleSlider className="bg-[rgba(32,201,151,0.05)]" />
        </section>
{/*         <section className={style.sec3main}>
          <div id="try">
            <h2 className={style.sec3h2}>
                Try It Now
            </h2>
            <p className={style.sec3p}>
              Scan a QR code, and tell us your thoughts, and unlock exclusive rewards like instant cashbacks, discounts on future purchases, early access to new products. It&apos;s that easy!
            </p>
            
          </div>
          <img src={"/images/pic6.png"} alt="" />
        </section> */}
      </section>
      <Footer />
    </>
  );
};

export default Home;
