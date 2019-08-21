import React from 'react';
import s from './index.module.scss';
import { Link } from 'react-router-dom';

function Card({ item }) {
  return (
    <div className={s.root}>
      <Link to={`room/${item.id}`}>
        <div
          className={s.img}
          style={{ backgroundImage: `url('${item.imageUrl}')` }}
        />
        <div className={s.info}>
          <div>
            <span className={s.name}>{item.name}</span>
          </div>
          <div className={s.price}>
            <span className={s.normal_price}>
              NT.{item.normalDayPrice}
              <span className={s.tag}>平日</span>
            </span>
            <span className={s.holiday_price}>
              NT.{item.holidayPrice}
              <span className={s.tag}>假日</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
