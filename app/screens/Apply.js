import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ApplyStyle } from 'app/styles/ApplyStyle';
import LeaveForm from 'app/components/LeaveForm';
import { ScrollView } from 'react-native-virtualized-view';
import {
  AppContext,
  categoryList,
  leaveItems,
  wfh,
  assetsItems
} from 'app/common/constants';
import { white } from 'app/theme/Colors';
import { LeaveFormStyle } from 'app/styles/LeaveFormStyle';

const Apply = () => {
  const [selectedValue, setSelectedValue] = useState(categoryList.LEAVE);
  const [loading, setloading] = useState(false);

  const values = [
    categoryList.LEAVE,
    categoryList.WORK_FROM_HOME,
    categoryList.ASSETS
  ];
  const leaveDropDown = [
    { label: leaveItems.CASUAL, value: leaveItems.CASUAL },
    { label: leaveItems.EARNED, value: leaveItems.EARNED },
    { label: leaveItems.EMERGENCY, value: leaveItems.EMERGENCY }
  ];
  const wfhDropDown = [
    { label: wfh.CASUAL, value: wfh.CASUAL },
    { label: wfh.EARNED, value: wfh.EARNED },
    { label: wfh.EMERGENCY, value: wfh.EMERGENCY }
  ];
  const assets = [
    { label: assetsItems.LAPTOP, value: assetsItems.LAPTOP },
    { label: assetsItems.CHARGER, value: assetsItems.CHARGER },
    { label: assetsItems.HEADPHONE, value: assetsItems.HEADPHONE }
  ];

  return (
    <>
      {selectedValue !== '' && selectedValue === categoryList.LEAVE && (
        <LeaveForm
          leaveType={selectedValue}
          dropDownListItems={leaveDropDown}
          multiSelect={false}
        />
      )}
      {selectedValue !== '' &&
        selectedValue === categoryList.WORK_FROM_HOME && (
          <LeaveForm
            leaveType={selectedValue}
            dropDownListItems={wfhDropDown}
            multiSelect={false}
          />
        )}
      {selectedValue !== '' && selectedValue === categoryList.ASSETS && (
        <LeaveForm
          leaveType={selectedValue}
          dropDownListItems={assets}
          multiSelect={false}
        />
      )}
    </>
  );
};

export default Apply;
