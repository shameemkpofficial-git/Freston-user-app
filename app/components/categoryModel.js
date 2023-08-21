import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ModelStyle } from '../styles/ModelStyle';
import { categoryList } from 'app/common/constants';

export default function CategoryModel(props) {
  const { visible, modelHandle } = props;
  const [values, setValue] = useState([
    categoryList.LEAVE,
    categoryList.WORK_FROM_HOME,
    categoryList.ASSETS
  ]);
  return (
    <Modal transparent={true} visible={visible}>
      <View style={ModelStyle.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => modelHandle(value)}
            style={[ModelStyle.categoryList]}
          >
            <Text style={[ModelStyle.categoryText]}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}
