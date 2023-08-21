import React, { useState, useContext } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { black } from 'app/theme/Colors';
import { AppContext } from 'app/common/constants';

const PeriodCalendar = (props) => {
  const { startDate, endDate, fromDate, toDate } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  const disableDate = (date) => {
    let d = new Date(date);
    if (d.getDay() === 6 || d.getDay() === 0) {
      return date;
    }
  };
  const confirmDate = () => {
    setModalVisible(!modalVisible);
    endDate(selectedEndDate);
    startDate(selectedStartDate);
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={([styles.centeredView], { marginTop: 40 })}>
          <View style={styles.modalView}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()}
              width={350}
              weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
              months={[
                'January',
                'Febraury',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ]}
              previousTitle='Previous'
              nextTitle='Next'
              todayBackgroundColor='#953993'
              selectedDayColor='#105493'
              selectedDayTextColor='#fff'
              scaleFactor={375}
              textStyle={{
                fontFamily: 'WorkSans-Italic-VariableFont_wght',
                color: '#000000'
              }}
              onDateChange={onDateChange}
              disabledDates={disableDate}
              selectedDisabledDatesTextStyle={{ opacity: 0.5 }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: 300,
                justifyContent: 'space-evenly'
              }}
            >
              {selectedStartDate !== null && selectedEndDate !== null && (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => confirmDate()}
                >
                  <Text style={styles.confirmText}>Confirm</Text>
                </Pressable>
              )}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.confirmText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => setModalVisible(true)}
      >
        {fromDate !== '' && toDate !== '' ? (
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.textStyle}>
              {'From Date'} {':'} {new Date(fromDate).toDateString()}
            </Text>
            <Text style={[styles.textStyle_toDate]}>
              {'To Date'} {':'} {new Date(toDate).toDateString()}
            </Text>
          </View>
        ) : (
          <Text style={styles.textStyle}> {'Select from and To date'} </Text>
        )}
        <MaterialCommunityIcons
          name='chevron-down'
          size={25}
          color={black}
          style={{
            marginTop: -10,
            marginLeft: fromDate !== '' && toDate !== '' ? 4 : 30
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#105493'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginTop: -10,
    marginLeft: -2,
    fontFamily: 'WorkSans-Italic-VariableFont_wght'
  },
  textStyle_toDate: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
    marginLeft: -2,
    fontFamily: 'WorkSans-Italic-VariableFont_wght'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default PeriodCalendar;
