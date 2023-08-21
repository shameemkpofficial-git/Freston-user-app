import React from 'react';
import DatePicker from 'react-native-date-picker';

const DateSelector = props => {
  const {date, style, onDateChange, minDate, maxDate, disabled} = props;
  
  return (
    <DatePicker
      style={style}
      date={date}
      mode="date"
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled || false}
      format="DD/MM/YYYY"
      androidMode="spinner"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          display: 'none',
        },
      }}
      onDateChange={onDateChange}
    />
  );
};

export default DateSelector;
