// @flow

import Lottie from 'lottie-react-native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import { AppContext } from 'app/common/constants';
import { CalendarStyle } from 'app/styles/CalendarStyle';
import {
  BT_color,
  black,
  primaryColor,
  secondaryColor
} from 'app/theme/Colors';
import { DevWidth } from 'app/theme/devices';
import Fonts from 'app/theme/fonts';

const leave = { color: 'red', key: 'leave' };
const birthday = { color: 'blue', key: 'birthday' };
const other = { color: 'green', key: 'other' };

const getDotColor = (event, preDots) => {
  if (event === 'Birthday') {
    return preDots === undefined ? [birthday] : [...preDots, birthday];
  } else if (event === 'Leave') {
    return preDots === undefined ? [leave] : [...preDots, leave];
  }
  return preDots === undefined ? [other] : [...preDots, other];
};

export const Calender = () => {
  const { manualCalendar } = useContext(AppContext);
  const newArry = [];
  manualCalendar.map((item) => {
    const setType = {};
    setType.date = item.date;
    setType.event = item.title;
    setType.other = 'BT- UK';
    newArry.push(setType);
  });
  const [event, setevent] = useState([]);
  const [cald, setcald] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [selectedDateColor, setselectedDateColor] = useState();
  const [emplyDOb, setemplyDOb] = useState([]);

  const dates = [
    { date: new Date('2022-11-22'), event: 'Birthday', other: 'Shameen' },
    {
      date: new Date('2022-11-22'),
      event: 'Other',
      other: 'Restricted holiday'
    },
    { date: new Date('2022-11-22'), event: 'Leave', other: 'Sick leave' },
    { date: new Date('2022-11-23'), event: 'Birthday', other: 'salih' },
    {
      date: new Date('2022-11-23'),
      event: 'Other',
      other: 'Restricted holiday'
    },
    { date: new Date('2022-11-23'), event: 'Leave', other: 'Sick leave' },
    { date: new Date('2022-11-5'), event: 'Leave', other: 'Personal Leave' },
    { date: new Date('2022-11-7'), event: 'Birthday', other: 'favaz' },
    { date: new Date('2022-12-7'), event: 'Birthday', other: 'shibil' },
    { date: new Date('2022-12-8'), event: 'Birthday', other: 'favaz' },
    { date: new Date('2022-12-24'), event: 'Restricted holiday', other: '' }
  ];

  const allCalendarItems = [...newArry, ...emplyDOb];
  useEffect(() => {
    const setDate = {};
    allCalendarItems.map((item) => {
      const key2 = moment(item.date).format('YYYY-MM-DD').toString();
      const checkKey = setDate.hasOwnProperty(key2);
      if (checkKey === false) {
        setDate[key2] = {
          dots: getDotColor(item.event, setDate[key2]),
          marked: true,
          selected: true,
          selectedColor: primaryColor
        };
      } else if (checkKey === true) {
        setDate[key2] = {
          dots: getDotColor(item.event, setDate[key2].dots),
          marked: true,
          selected: true,
          selectedColor: primaryColor
        };
      }
    });
    setcald(setDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    checkDayEvent(moment(new Date()).format('YYYY-MM-DD'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    birthDate();
  }, []);

  const birthDate = () => {
    const employeeDoB = [];
    const setDate = {};
    fetch('http://134.209.152.225:4000/api/get/user/employee-birthday', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          employDate(data.data);
        }
        // setDob(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const employDate = (data) => {
    const employeeDoB = [];
    data.map((item) => {
      const birthDate = moment(new Date(item.birthday)).format('DD');
      const birthMonth = moment(new Date(item.birthday)).format('MM');
      const birthYear = moment(new Date()).format('YYYY');
      const obj = {
        date: `${birthYear}-${birthMonth}-${birthDate}`,
        event: 'Birthday',
        other: item.name
      };
      employeeDoB.push(obj);
    });
    setemplyDOb(employeeDoB);
    // console.log(employeeDoB, 'setDateefeeeee');
  };

  const checkDayEvent = (selectDate) => {
    setselectedDate(selectDate);
    const eve = [];
    allCalendarItems.map((item) => {
      if (moment(item.date).format('YYYY-MM-DD') === selectDate) {
        eve.push(item);
      }
    });
    setevent(eve);
    console.log(event, 'event');
  };
  const eventColor = (txtColor) => {
    console.log(txtColor, 'txtColor');
    if (txtColor.event === 'Birthday') {
      return 'blue';
    } else if (txtColor.event === 'Leave') {
      return 'red';
    }
    console.log(txtColor.other, 'txtColor.other');
    if (txtColor.other === 'BT- UK') {
      return BT_color;
    }
    console.log('else');
    return 'green';
  };
  const selctedDateColor = (selctedDate) => {
    // console.log(selctedDate, 'selctedDate');
    const setType = {};
    setType[selctedDate.dateString] = {
      customStyles: {
        container: {
          backgroundColor: secondaryColor
        },
        text: {
          color: 'white',
          fontWeight: 'bold'
        }
      }
    };
    setselectedDateColor(setType);
  };
  return (
    <SafeAreaView style={CalendarStyle.container}>
      <View style={{}}>
        <RNCalendar
          disableMonthChange={true}
          enableSwipeMonths={true}
          // markedDates={{ ...markedDates, ...selectedDates }}
          // initialDate={moment(new Date()).format('YYYY-MM-DD')}
          markedDates={{ ...cald, ...selectedDateColor }}
          markingType={'multi-dot' && 'custom'}
          minDate={moment(new Date()).startOf('month').format('YYYY-MM-DD')}
          onDayPress={(selectDate) => {
            checkDayEvent(selectDate.dateString);
            selctedDateColor(selectDate);
          }}
          onPressArrowRight={(addMonth) => {
            addMonth();
            setevent([]);
          }}
          style={{
            elevation: 7,
            borderRadius: 5,
            height: 360
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#FFFF',
            selectedDayTextColor: 'skyblue',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: black,
            indicatorColor: 'black',
            textDayFontFamily: 'Poppins-SemiBold',
            textMonthFontFamily: 'Poppins-Bold',
            textDayHeaderFontFamily: 'Poppins-Light',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            arrowColor: 'black',
            'stylesheet.calendar.header': {
              week: {
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
          hideExtraDays={true}
          // selected={moment(new Date()).format('YYYY-MM-DD')}
          onPressArrowLeft={(subtractMonth) => {
            subtractMonth();
            setevent([]);
          }}
        />
      </View>
      <View style={CalendarStyle.eventTitle}>
        <FlatList
          ListEmptyComponent={
            <View style={CalendarStyle.flatListContainer}>
              <Lottie
                autoPlay
                loop
                source={require('app/assets/animations/nocalender.json')}
                style={CalendarStyle.lofftyStyle}
              />
              <Text style={CalendarStyle.noEventTitle}>No Events</Text>
            </View>
          }
          data={event}
          keyExtractor={(item) => item.event}
          renderItem={({ item }) => (
            <View style={CalendarStyle.item}>
              <Text
                style={{
                  color: eventColor(item),
                  fontFamily: Fonts.medium
                }}
              >
                {item.event} {'  '}
              </Text>
              {item.other !== '' && (
                <Text style={{ color: 'black', fontFamily: Fonts.regular }}>
                  {item.other !== '' && item.other}
                </Text>
              )}
            </View>
          )}
        />
      </View>
      {event.length !== 0 && (
        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View
              style={{
                backgroundColor: 'red',
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                height: 10,
                width: DevWidth / 4.4
              }}
            />
            <View
              style={{
                backgroundColor: 'blue',
                height: 10,
                width: DevWidth / 4.4
              }}
            />
            <View
              style={{
                backgroundColor: 'green',
                height: 10,
                width: DevWidth / 4.4
              }}
            />
            <View
              style={{
                backgroundColor: '#7509b7',
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                height: 10,
                width: DevWidth / 4.4
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: DevWidth / 4.4 }}>
              <Text
                style={{
                  color: 'red',
                  fontFamily: Fonts.light,
                  fontSize: 10,
                  textAlign: 'center'
                }}
              >
                Leave
              </Text>
            </View>
            <View style={{ width: DevWidth / 4.4 }}>
              <Text
                style={{
                  color: 'blue',
                  fontFamily: Fonts.light,
                  fontSize: 10,
                  textAlign: 'center'
                }}
              >
                Birthday
              </Text>
            </View>
            <View style={{ width: DevWidth / 4.4 }}>
              <Text
                style={{
                  color: 'green',
                  fontFamily: Fonts.light,
                  fontSize: 10,
                  textAlign: 'center'
                }}
              >
                Other
              </Text>
            </View>
            <View style={{ width: DevWidth / 4.4 }}>
              <Text
                style={{
                  color: BT_color,
                  fontFamily: Fonts.light,
                  fontSize: 10,
                  textAlign: 'center'
                }}
              >
                BT-Leave
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
