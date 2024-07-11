/* eslint-disable @next/next/no-img-element */
import style from "../sass-components/page/home.module.scss";

export default function Footer() {
  return (
    <footer className={style.sec4}>
      <div className={style.borderlast}>
        <p className={style.footertext}>Amazing <span className={style.footerspan}>Influencers</span></p>
      </div>
      <div className={style.lastflexitems}>

        <small className={style.smalltxt}>© 2024 Amazinginfluencers.com | All rights reserved.</small>
        <div className={style.tags}>
          <img src={"/images/Facebook.png"} alt="" />
          <img src={"/images/Instagram.png"} alt="" />
          <img src={"/images/TwitterX.png"} alt="" />
        </div>
      </div>
    </footer>
  )
}