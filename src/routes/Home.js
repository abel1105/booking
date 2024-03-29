import React from 'react';
import { useMappedState } from 'redux-react-hook';
import s from './Home.module.scss';
import Slider from 'react-slick';
import logo from '../svg/logo_white.svg';
import fb from '../svg/facebook-square-brands.svg';
import ig from '../svg/instagram-brands.svg';
import phone from '../svg/phone-alt-solid.svg';
import envelope from '../svg/envelope-solid.svg';
import home from '../svg/home-solid.svg';
import Card from '../components/Card';

function Home() {
  const rooms = useMappedState(state => state.rooms);

  return (
    <div>
      <div className={s.swiper}>
        <Slider
          infinite
          fade
          autoplay
          swipe={false}
          touchMove={false}
          speed={1000}
        >
          {rooms.map((item, i) => {
            return (
              <div>
                <div
                  key={i}
                  className={s.bg}
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className={s.main}>
        <img className={s.logo} src={logo} alt="" />
        <div className={s.info}>
          <div className={s.social}>
            <img className={s.icon} src={fb} alt="" />
            <img className={s.icon} src={ig} alt="" />
          </div>
          <div className={s.contact}>
            <div className={s.contact_item}>
              <img className={s.icon_small} src={phone} alt="" />
              <span>02-17264937</span>
            </div>
            <div className={s.contact_item}>
              <img className={s.icon_small} src={envelope} alt="" />
              <span>whitespace@whitespace.com.tw</span>
            </div>
            <div className={s.contact_item}>
              <img className={s.icon_small} src={home} alt="" />
              <span>台北市羅斯福路十段30號</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.card_container}>
        {rooms.map((item, i) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Home;
