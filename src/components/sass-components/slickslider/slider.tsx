/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import style from "./slide.module.scss";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <>
      <section className={style.mainsec}>
        <Slider {...settings} className={style.editsliderr}>
          <div className={style.mainslider}>
            <img src={"/images/profile1.png"} alt="" className={style.profile1edit} />
            <img src={"/images/backpic1.png"} alt="" />
            <img src={"/images/backpic2.png"} alt="" className={style.pic2edit} />
            <h4 className={style.h2edit}>Hannah Schmitt</h4>
            <p className={style.pedit}>Lead designer</p>
            <img src={"/images/clarityblock.png"} alt="" className={style.coma} />
            <p className={style.peditt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh
              mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget
              nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
              felis id augue sit cursus pellentesque enim{" "}
            </p>
          </div>
          <div className={style.mainslider2}>
            <img src={"/images/profile2.png"} alt="" className={style.profile2edit} />
            <img src={"/images/backpic3.png"} alt="" />
            <img src={"/images/backpic4.png"} alt="" className={style.pic3edit} />
            <h4 className={style.h3edit}>Hannah Schmitt</h4>
            <p className={style.p2edit}>Lead designer</p>
            <img src={"/images/clarityblock.png"} alt="" className={style.coma1} />
            <p className={style.p2editt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim
            </p>
          </div>
          <div className={style.mainslider}>
            <img src={"/images/profile1.png"} alt="" className={style.profile1edit} />
            <img src={"/images/backpic1.png"} alt="" />
            <img src={"/images/backpic2.png"} alt="" className={style.pic2edit} />
            <h4 className={style.h2edit}>Hannah Schmitt</h4>
            <p className={style.pedit}>Lead designer</p>
            <img src={"/images/clarityblock.png"} alt="" className={style.coma} />
            <p className={style.peditt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh
              mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget
              nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
              felis id augue sit cursus pellentesque enim{" "}
            </p>
          </div>
        </Slider>
      </section>
    </>
  );
}
