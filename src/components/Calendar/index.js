import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import s from './index.module.scss';
import { useMappedState } from 'redux-react-hook';
import moment from 'moment';

function Calendar() {
  const [date] = useState(null);
  const booking = useMappedState(state => state.booking);

  const isBooked = day => {
    let result = false;
    booking.forEach(item => {
      if (day.isSame(item.date, 'day')) {
        result = true;
      }
    });
    return result;
  };

  return (
    <div className={s.root}>
      <SingleDatePicker
        numberOfMonths={1}
        verticalSpacing={0}
        date={date}
        focused
        onFocusChange={() => {}}
        isDayHighlighted={isBooked}
        isOutsideRange={date => date.diff(moment().startOf('day'), 'days') < 1}
        noBorder
      />
    </div>
  );
}

export default Calendar;
