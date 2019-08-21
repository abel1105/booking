import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { deleteRooms, getRoom } from '../helpers/API';
import { setBookingWithData, setRoomWithData } from '../store/actions';
import { useDispatch, useMappedState } from 'redux-react-hook';
import logo from '../svg/logo_block.svg';
import Gallery from '../components/Gallery';
import s from './Room.module.scss';
import { Link } from 'react-router-dom';
import wifi from '../svg/wifi.svg';
import phone from '../svg/phone.svg';
import mountain from '../svg/mountain-range.svg';
import breakfast from '../svg/breakfast.svg';
import bar from '../svg/bar.svg';
import dog from '../svg/dog.svg';
import smoke from '../svg/no-smoke-symbol.svg';
import service from '../svg/room_service.svg';
import baby from '../svg/crawling-baby-silhouette.svg';
import ac from '../svg/breeze.svg';
import fridge from '../svg/fridge.svg';
import sofa from '../svg/sofa.svg';
import Calendar from '../components/Calendar';
import Dialog from '../components/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

function Room(props) {
  const { id } = props.match.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const { room } = useMappedState(state => ({
    room: state.room
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    getRoom(id).then(r => {
      dispatch(setRoomWithData(r.room[0]));
      dispatch(setBookingWithData(r.booking));
      setIsLoaded(true);
    });
  }, [dispatch, id]);

  const clearBooking = () => {
    deleteRooms().then(() => {
      window.location.reload();
    });
  };

  return (
    <div className={s.root}>
      {!isLoaded && (
        <div className={s.loader}>
          <CircularProgress />
        </div>
      )}
      {isLoaded && (
        <div className={s.container}>
          <Link to="/">
            <img className={s.logo} src={logo} alt="logo" />
          </Link>
          <Gallery imageUrl={room.imageUrl} />
          <div className={s.content}>
            <div className={s.content_short}>
              <span className={s.title}>{room.name}</span>
              <span className={s.header}>
                房客人數限制：{room.descriptionShort.GuestMin}~
                {room.descriptionShort.GuestMax}人
              </span>
              <span className={s.header}>
                床型：{room.descriptionShort.Bed.join(', ')}
              </span>
              <span className={s.header}>
                衛浴數量：{room.descriptionShort['Private-Bath']}間
              </span>
              <span className={s.header}>
                房間大小：{room.descriptionShort.Footage}平方公尺
              </span>
              <span className={s.description}>{room.description}</span>
              <div className={s.check}>
                <div className={s.check_detail}>
                  <span>Check In</span>
                  <span>
                    {room.checkInAndOut.checkInEarly} -{' '}
                    {room.checkInAndOut.checkInLate}
                  </span>
                </div>
                <div className={s.check_detail}>
                  <span>Check Out</span>
                  <span>{room.checkInAndOut.checkOut}</span>
                </div>
              </div>
              <div className={s.grid}>
                <span className={cx({ [s.active]: room.amenities['Wi-Fi'] })}>
                  <img src={wifi} alt="wifi" />
                  Wi-Fi
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Television'] })}
                >
                  <img src={phone} alt="phone" />
                  電話
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Great-View'] })}
                >
                  <img src={mountain} alt="mountain" />
                  漂亮的視野
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Breakfast'] })}
                >
                  <img src={breakfast} alt="breakfast" />
                  早餐
                </span>
                <span
                  className={cx({
                    [s.active]: room.amenities['Air-Conditioner']
                  })}
                >
                  <img src={ac} alt="ac" />
                  空調
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Smoke-Free'] })}
                >
                  <img src={smoke} alt="smoke" />
                  禁止吸煙
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Mini-Bar'] })}
                >
                  <img src={bar} alt="bar" />
                  Mini Bar
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Refrigerator'] })}
                >
                  <img src={fridge} alt="fridge" />
                  冰箱
                </span>
                <span
                  className={cx({
                    [s.active]: room.amenities['Child-Friendly']
                  })}
                >
                  <img src={baby} alt="baby" />
                  適合兒童
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Room-Service'] })}
                >
                  <img src={service} alt="service" />
                  Room Service
                </span>
                <span className={cx({ [s.active]: room.amenities['Sofa'] })}>
                  <img src={sofa} alt="sofa" />
                  沙發
                </span>
                <span
                  className={cx({ [s.active]: room.amenities['Pet-Friendly'] })}
                >
                  <img src={dog} alt="dog" />
                  寵物攜帶
                </span>
              </div>
            </div>
            <div className={s.price}>
              <span className={cx(s.title, s.tag)}>
                NT.{room.normalDayPrice}
              </span>
              <span>平日(一～四)</span>
              <span className={s.tag}>NT.{room.holidayPrice}</span>
              <span>假日(五～日)</span>
            </div>
            <div className={s.calendar}>
              <Calendar />
              <div className={s.button_container}>
                <button className={s.button} onClick={() => setOpen(true)}>
                  預約時段
                </button>
                <button className={s.button} onClick={clearBooking}>
                  測試清除預約
                </button>
              </div>
            </div>
          </div>
          <Dialog open={open} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Room;
