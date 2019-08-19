import React, { useState, useEffect } from 'react';
import s from './Card.module.scss';

function Card({ item }) {
  return (
    <div className={s.root}>
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
    </div>
  );
}

export default Card;
