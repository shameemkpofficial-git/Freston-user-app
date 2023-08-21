import { View, Text } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { black, secondaryColor, white } from '../theme/Colors';
import { DropDownStyle } from '../styles/DropDownStyle';
import { leaveItems } from 'app/common/constants';

export default function DropDownPickerComponent(props) {
  const { modelHandle, leaveValue, dropDownListItems, placeholderName } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: leaveItems.CASUAL, value: leaveItems.CASUAL },
    { label: leaveItems.EARNED, value: leaveItems.EARNED },
    { label: leaveItems.EMERGENCY, value: leaveItems.EMERGENCY }
  ]);
  return (
    <DropDownPicker
      open={open}
      value={leaveValue}
      items={dropDownListItems}
      setOpen={setOpen}
      setValue={modelHandle}
      setItems={setItems}
      style={DropDownStyle.DropDownContainer}
      placeholderStyle={DropDownStyle.PlaceholderStyle}
      labelStyle={DropDownStyle.LabelStyle}
      listItemContainerStyle={DropDownStyle.listItemContainer}
      arrowIconStyle={DropDownStyle.arrowIcon}
      listItemLabelStyle={DropDownStyle.ListItemlabel}
      listMode='SCROLLVIEW'
      placeholder={placeholderName}
    />
  );
}
