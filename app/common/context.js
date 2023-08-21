import React, { useState, useEffect } from 'react';
import { AppContext } from 'app/common/constants';
import Router from 'app/common/router';

export const Context = () => {
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [userDetails, setUserDetails] = React.useState([]);
  const [manualCalendar, setManualCalendar] = React.useState();

  const startDate = (data) => {
    setFromDate(data);
  };

  const endDate = (data) => {
    setToDate(data);
  };
  React.useEffect(() => {
    getCalendarDate();
  }, []);

  const getCalendarDate = () => {
    fetch('https://www.gov.uk/bank-holidays.json')
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        let befeDate = responseJson['england-and-wales'];
        setManualCalendar(befeDate.events);
      })
      .catch((error) => {
        console.log(error, 'errrrrrr');
      });
  };

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        fromDate,
        toDate,
        startDate,
        endDate,
        manualCalendar
      }}
    >
      <Router />
    </AppContext.Provider>
  );
};
