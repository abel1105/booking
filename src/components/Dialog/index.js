import React, { useState } from 'react';
import cx from 'classnames';
import Modal from '@material-ui/core/Modal';
import s from './index.module.scss';
import DatePicker from '../DatePicker';
import moment from 'moment';
import { useMappedState } from 'redux-react-hook';
import { postRoom } from '../../helpers/API';
import success from '../../svg/tick-inside-circle.svg';

function Dialog({ open, onClose }) {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [step, setStep] = useState(null);

  const { id, normalDayPrice, holidayPrice } = useMappedState(state => ({
    id: state.room.id,
    normalDayPrice: state.room.normalDayPrice,
    holidayPrice: state.room.holidayPrice
  }));

  let normalDay = 0;
  let holiday = 0;
  if (end && start) {
    let totalDay = end.diff(start, 'days') + 1;
    if (totalDay > 0) {
      for (let i = 0; i < totalDay; i++) {
        const weekday = moment(start)
          .add(i, 'days')
          .isoWeekday();
        if (weekday === 6 || weekday === 7) {
          holiday += 1;
        }
      }
      normalDay = totalDay - holiday;
    }
  }
  const price = normalDay * normalDayPrice + holiday * holidayPrice;

  const checkout = () => {
    if (!price || name === '' || tel === '') return false;
    postRoom(id, name, tel, start, end).then(r => {
      setStep(r.success ? 'success' : 'failure');
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={s.root}>
        {!step && (
          <React.Fragment>
            <span className={s.title}>預約時段</span>
            <div className={s.form}>
              <div className={s.input}>
                <label>姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={s.input}>
                <label>電話</label>
                <input
                  type="text"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
              </div>
              <div className={s.input}>
                <label>預約起訖</label>
                <DatePicker date={start} setDate={setStart} />
                &nbsp;&nbsp;~&nbsp;&nbsp;
                <DatePicker date={end} setDate={setEnd} />
              </div>
            </div>
            <div className={s.detail}>
              <div className={s.detail_row}>
                <span>平日時段</span>
                <span>{normalDay}夜</span>
              </div>
              <div className={s.detail_row}>
                <span>假日時段</span>
                <span>{holiday}夜</span>
              </div>
            </div>
            <div className={s.total}>
              <span>=&nbsp;&nbsp;&nbsp;NT.{price}</span>
            </div>
            <div className={s.action}>
              <button className={s.button} onClick={onClose}>
                取消
              </button>
              <button className={cx(s.button, s.active)} onClick={checkout}>
                確定預約
              </button>
            </div>
          </React.Fragment>
        )}
        {step === 'success' && (
          <React.Fragment>
            <span className={s.title}>預約成功</span>
            <div className={s.form} style={{ textAlign: 'center' }}>
              <img className={s.success} src={success} alt="success" />
            </div>
            <div className={s.action_one}>
              <button className={s.button} onClick={onClose}>
                回頁面
              </button>
            </div>
          </React.Fragment>
        )}
        {step === 'failure' && (
          <React.Fragment>
            <span className={s.title}>預約成功</span>
            <div className={s.form}>
              <span>預約時間已被人預訂</span>
            </div>
            <div className={s.action_one}>
              <button className={s.button} onClick={() => setStep(null)}>
                返回
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </Modal>
  );
}

export default Dialog;
