// @flow

import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';
import Toast from 'react-native-root-toast';
import Share from 'react-native-share';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  AppContext,
  assetsItems,
  categoryList,
  leaveItems,
  wfh
} from 'app/common/constants';

import { black } from 'app/theme/Colors';
import DropDownPickerComponent from 'app/components/DropDownPicker';
import PeriodCalendar from 'app/components/calendar';

import { MyHTML } from 'app/components/leaveHtml';

import Spinner from 'app/components/spinner';
import { ApplyStyle } from 'app/styles/ApplyStyle';
import { LeaveFormStyle } from 'app/styles/LeaveFormStyle';

export default function LeaveForm(props) {
  const { fromDate, toDate, userDetails } = useContext(AppContext);
  const leaveDropDown = [
    { label: leaveItems.CASUAL, value: leaveItems.CASUAL },
    { label: leaveItems.EARNED, value: leaveItems.EARNED },
    { label: leaveItems.EMERGENCY, value: leaveItems.EMERGENCY }
  ];
  const Type_Values = [
    { label: categoryList.LEAVE, value: categoryList.LEAVE },
    { label: categoryList.WORK_FROM_HOME, value: categoryList.WORK_FROM_HOME },
    { label: categoryList.ASSETS, value: categoryList.ASSETS }
  ];

  const mailImages = {
    backToWork: require('app/assets/images/backto.png'),
    department: require('app/assets/images/department.png'),
    designation: require('app/assets/images/designation.png'),
    joindate: require('app/assets/images/joindd.png'),
    Leave: require('app/assets/images/leave.png'),
    selectDate: require('app/assets/images/selectdd.png'),
    selectDate: require('app/assets/images/selectdd.png'),
    user: require('app/assets/images/user.png')
  };

  console.log('Ssss', toDate);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [joinDate, setjoinDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveValue, setValue] = useState(null);
  const [leaveType, setLeaveType] = useState('');

  const SubmitData = () => {
    // setloading(true);
    const ApplyLeave = {
      Department: userDetails.department,
      Designation: userDetails.designation,
      FromDate: fromDate !== '' ? new Date(fromDate).toDateString() : fromDate,
      JoiningDate: userDetails.joiningDate,
      Leave: leaveValue,
      LeaveType: leaveType,
      Name: userDetails.name,
      Reason: reason,
      RejoinDate: joinDate !== '' ? new Date(joinDate).toDateString() : '',
      ToDate: toDate !== '' ? new Date(toDate).toDateString() : toDate
    };
    console.log(ApplyLeave, 'ApplyLeave');
    const schema = {
      Department: (value) => value !== null,

      Designation: (value) => value !== null,
      FromDate: (value) => value !== '',
      JoiningDate: (value) => value !== '',
      Leave: (value) => value !== null,
      LeaveType: (value) => value !== '',
      Name: (value) => value !== '',
      Reason: (value) => value !== '',
      RejoinDate: (value) => value !== '',
      ToDate: (value) => value !== ''
    };

    const validate = (object, schema) =>
      Object.keys(schema)
        .filter((key) => !schema[key](object[key]))
        .map((key) => new Error(`${key} is not found.`));

    const errors = validate(ApplyLeave, schema);

    if (errors.length > 0) {
      const errorItems = [];
      for (const { message } of errors) {
        errorItems.push(message);
      }
      Toast.show(errorItems, {
        animation: true,
        delay: 0,
        duration: Toast.durations.SHORT,
        hideOnPress: true,
        position: Toast.positions.BOTTOM,
        shadow: true
      });
      // setloading(false);
    } else {
      converting(ApplyLeave);
    }
  };
  const modelHandle = (item) => {
    setValue(item);
  };

  const addType = (item) => {
    setLeaveType(item);
  };
  const converting = async (ApplyLeave) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask Me Later',
          buttonPositive: 'OK',
          message:
            'HR needs access to your storage so you can save files to your device.',
          title: 'Request for'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          base64: true,
          directory: 'Download',
          fileName: `${leaveType}  Form`,
          html: MyHTML(ApplyLeave)
        };
        const file = await RNHTMLtoPDF.convert(options);
        setTimeout(() => {
          handleEmail(file.filePath);
        }, 1000);
      } else {
        // setloading(false);
      }
    } catch (err) {
      console.warn(err);
      // setloading(false);
    }
  };

  const handleEmail = (path) => {
    // setloading(false);
    Mailer.mail(
      {
        attachments: [
          {
            mimeType: '',
            name: '',
            path,
            type: ''
          }
        ],
        bccRecipients: [
          'ahmed.salih@frestonanalytics.com',
          'saleem@frestonanalytics.com'
        ],
        body: '<div><p style="color:Tomato;">shameen</p></div>',
        ccRecipients: ['jaseem@frestonanalytics.com'],
        customChooserTitle: 'This is my new title',
        isHTML: true,
        recipients: ['zaveela@frestonanalytics.com'],
        subject: `${leaveType}  Form`
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              onPress: () => console.log('OK: Email Error Response'),
              text: 'Ok'
            },
            {
              onPress: () => console.log('CANCEL: Email Error Response'),
              text: 'Cancel'
            }
          ],
          { cancelable: true }
        );
      }
    );
  };

  const confirmDate = (retunDate) => {
    if (toDate !== '') {
      // setjoinDate(retunDate);
      if (
        moment(toDate).format('MM-DD-YYYY') <
        moment(retunDate).format('MM-DD-YYYY')
      ) {
        setjoinDate(retunDate);
      } else {
        Toast.show('Check the to To date', {
          animation: true,
          delay: 0,
          duration: Toast.durations.SHORT,
          hideOnPress: true,
          position: Toast.positions.BOTTOM,
          shadow: true
        });
      }
    } else {
      setjoinDate('');
      Toast.show('First Add From Date and To Date', {
        animation: true,
        delay: 0,
        duration: Toast.durations.SHORT,
        hideOnPress: true,
        position: Toast.positions.BOTTOM,
        shadow: true
      });
    }
    setOpen(false);
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[ApplyStyle.mainContainer, { flex: 0.9 }]}
      >
        <View style={ApplyStyle.cardView}>
          <View style={ApplyStyle.cardMenu}>
            <Image source={mailImages.user} style={LeaveFormStyle.imgIcon} />
            {/* <MaterialCommunityIcons
              name="account-circle-outline"
              size={35}
              color={white}
              style={ApplyStyle.iconStyle}
            /> */}
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>{placeHolder.FULL_NAME}</Text>
            <Text style={ApplyStyle.selectStyle}>{userDetails.name}</Text>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />
        <View style={ApplyStyle.cardView}>
          <View style={ApplyStyle.cardMenu}>
            <Image
              source={mailImages.designation}
              style={LeaveFormStyle.imgIcon}
            />
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>{placeHolder.DESIGNATION}</Text>
            <Text style={ApplyStyle.selectStyle}>
              {userDetails.designation}
            </Text>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />
        <View style={ApplyStyle.cardView}>
          <View style={ApplyStyle.cardMenu}>
            <Image
              source={mailImages.department}
              style={LeaveFormStyle.imgIcon}
            />
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>{placeHolder.DEPARTMENT}</Text>
            <Text style={ApplyStyle.selectStyle}>{userDetails.department}</Text>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />

        <View style={ApplyStyle.cardView}>
          <View style={ApplyStyle.cardMenu}>
            <Image
              source={mailImages.joindate}
              style={LeaveFormStyle.imgIcon}
            />
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>
              {placeHolder.DATE_OF_JOINING}
            </Text>
            <Text style={ApplyStyle.selectStyle}>
              {userDetails.joiningDate}
            </Text>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />

        <View style={ApplyStyle.cardView}>
          <View style={ApplyStyle.cardMenu}>
            <Image source={mailImages.Leave} style={LeaveFormStyle.imgIcon} />
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>{staticItems.TYPE}</Text>
            <View>
              <DropDownPickerComponent
                containerStyle={LeaveFormStyle.ContainerStyle}
                dropDownContainerStyle={LeaveFormStyle.dropDownContainerStyle}
                dropDownListItems={Type_Values}
                leaveValue={leaveType}
                modelHandle={addType}
                placeHolderName={placeHolder.SELECT_TYPE}
              />
            </View>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />

        <View style={[ApplyStyle.cardView, { zIndex: -1 }]}>
          <View style={ApplyStyle.cardMenu}>
            <Image source={mailImages.Leave} style={LeaveFormStyle.imgIcon} />
          </View>
          <View style={ApplyStyle.textContainer}>
            <Text style={ApplyStyle.typeStyle}>
              {leaveType !== '' ? leaveType : 'Select the Type'}
            </Text>
            <View>
              <DropDownPickerComponent
                containerStyle={LeaveFormStyle.ContainerStyle}
                dropDownContainerStyle={LeaveFormStyle.dropDownContainerStyle}
                dropDownListItems={leaveDropDown}
                leaveValue={leaveValue}
                modelHandle={modelHandle}
                placeholderName={placeHolder.SELECT_AN_ITEM}
              />
            </View>
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />

        <View style={ApplyStyle.horizontalLine} />

        <View style={([ApplyStyle.cardView], { zIndex: -5 })}>
          <View style={ApplyStyle.cardMenu}>
            <Image
              source={mailImages.selectDate}
              style={LeaveFormStyle.imgIcon}
            />
          </View>
          <View
            style={
              ([ApplyStyle.textContainer], { marginLeft: 70, marginTop: -50 })
            }
          >
            <Text style={[ApplyStyle.typeStyle, { marginBottom: 20 }]}>
              {staticItems.SELECT_DATE}
            </Text>
            <PeriodCalendar />
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />
        <View style={([ApplyStyle.cardView], { zIndex: -5 })}>
          <View style={ApplyStyle.cardMenu}>
            <Image
              source={mailImages.backToWork}
              style={LeaveFormStyle.imgIcon}
            />
          </View>
          <View
            style={
              ([ApplyStyle.textContainer], { marginLeft: 70, marginTop: -50 })
            }
          >
            <Text style={ApplyStyle.typeStyle}>
              {staticItems.REJOIN_TO_WORK}
            </Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{ flexDirection: 'row' }}
            >
              {joinDate !== '' ? (
                <Text style={ApplyStyle.selectStyle}>
                  {new Date(joinDate).toDateString()}
                </Text>
              ) : (
                <Text style={ApplyStyle.selectStyle}>
                  {'Select Date of Rejoin'}
                </Text>
              )}
              <MaterialCommunityIcons
                color={black}
                name='chevron-down'
                size={29}
                style={{
                  marginLeft: joinDate !== '' ? 125 : 55,
                  marginTop: 10
                }}
              />
            </TouchableOpacity>
            <DatePicker
              date={date}
              format='DD/MM/YYYY'
              modal
              mode='date'
              onCancel={() => {
                setOpen(false);
              }}
              onConfirm={(data) => {
                setOpen(false);
                confirmDate(data);
              }}
              open={open}
            />
          </View>
        </View>
        <View style={ApplyStyle.horizontalLine} />
        <View
          style={([ApplyStyle.textAreaContainer], { margin: 2, zIndex: -5 })}
        >
          <TextInput
            keyboardType='default'
            multiline
            numberOfLines={5}
            onChangeText={setReason}
            placeholder={`Reason for ${leaveType}`}
            placeholderTextColor='grey'
            style={ApplyStyle.textArea}
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={ApplyStyle.horizontalLine} />
      </ScrollView>
      <View style={{ flex: 0.1 }}>
        <TouchableOpacity
          onPress={() => SubmitData()}
          style={[
            LeaveFormStyle.button,
            LeaveFormStyle.buttonClose,
            {
              justifyContent: 'center',
              marginTop: 10
            }
          ]}
        >
          <View>
            <Text style={[LeaveFormStyle.confirmText, { marginTop: 10 }]}>
              Confirm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
