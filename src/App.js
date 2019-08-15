import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ startDate, setStartDate ] = useState(null);
  const [ endDate, setEndDate ] = useState(null);
  const [ focusInput, setFocusInput ] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = input => {
    setFocusInput(input)
  };

  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate}
        startDateId="start"
        endDate={endDate}
        endDateId="end"
        onDatesChange={onDatesChange}
        focusedInput={focusInput}
        onFocusChange={onFocusChange}
      />
    </div>
  );
}

export default App;
