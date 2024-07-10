/* eslint-disable @next/next/no-img-element */
import Header from "../header";
import SimpleSlider from "../slickslider/slider";
import style from "./home.module.scss";
const Home = () => {
  return (
    <>
     <section className={style.holepage}>
      <Header />
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
            <button className={style.btn1}>Find your rewards now</button>
            <button className={style.btn2}>Watch The Demo</button>
          </div>
        </div>
        <div className={style.picdiv1}>
          <img src={"/images/pic1.png"} alt="mainpic" className={style.sec1pic1} />
        </div>
      </section>

      <section className={style.sec2main}>
        <h2 className={style.h2sec2}>how it works</h2>

       
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
                <h3>Enter your details</h3>
                <p>Simply enter a few details about your purchase.</p>
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
                <h3>Share your feedback</h3>
                <p>Answer a few quick questions about your experience.</p>
              </div>
            </div>
            <div className={style.step4}>
              <div className={style.content}>
                <h3>Claim your reward</h3>
                <p>Unlock exclusive offers and cashbacks!</p>
              </div>
              <div className={style.number}>
                <span>4</span>
              </div>
              <div className={style.icon4}>
                <img src={"/images/pic5.png"} alt="Reward" />
              </div>
            </div>
          </div>
        
      </section>
    <section>
    <SimpleSlider />
    </section>
      <section className={style.sec3main}>
        <div>
          <h2 className={style.sec3h2}>
              Try It Now
          </h2>
          <p className={style.sec3p}>
          Scan the QR code, tell us your thoughts, and unlock exclusive rewards like instant cashbacks, discounts on future purchases, early access to new products. It&apos;s that easy!
          </p>
          <button className={style.sec3btn}>Scan QR Code Now</button>
        </div>
        <img src={"/images/pic6.png"} alt="" />
      </section>
      </section>
      <section className={style.sec4}>
    <div className={style.borderlast}>
        <p className={style.footertext}>Amazing <span className={style.footerspan}>Influencers</span></p>
      </div>
      <div className={style.lastflexitems}>

      <small className={style.smalltxt}>© 2024 Amazinginfluencers.com | All rights reserved.</small>
      <div className={style.tags}>
        <img src={"/images/Facebook"} alt="" />
        <img src={"/images/Instagram.png"} alt="" />
        <img src={"/images/TwitterX.png"} alt="" />
      </div>
      </div>
      </section>
     
    </>
  );
};

export default Home;
