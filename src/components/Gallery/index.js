import React from 'react';
import s from './index.module.scss';

function Gallery({ imageUrl }) {
  return (
    <div className={s.root}>
      <div
        className={s.left}
        style={{ backgroundImage: `url('${imageUrl[0]}')` }}
      />
      <div className={s.right_wrapper}>
        <div
          className={s.right}
          style={{ backgroundImage: `url('${imageUrl[1]}')` }}
        />
        <div
          className={s.right}
          style={{ backgroundImage: `url('${imageUrl[2]}')` }}
        />
      </div>
    </div>
  );
}

export default Gallery;
