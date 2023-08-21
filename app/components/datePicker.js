import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = () => {

const [date, setDate] = useState(new Date());

const onChange = (event, selectedDate) => {
 const currentDate = selectedDate || date;
 setDate(currentDate);
};

 return(
      <DateTimePicker
         value={date}
         onChange={onChange}
       />
 )
}

export default DatePickerComponent