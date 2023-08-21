import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';
import { ModelStyle } from 'app/styles/ModelStyle';
import { primaryColor, secondaryColor } from 'app/theme/Colors';

const AlertModal = (props) => {
  const { show, data, changeModel } = props;

  const updateData = () => {
    changeModel(!show);
    props.navigation.navigate('UpdateProfileScreen');
  };

  return (
    <Modal visible={show} animationType='fade' transparent showMarker>
      <View style={ModelStyle.container}>
        <View style={ModelStyle.modal}>
          <View style={[ModelStyle.modalBody]}>
            {data.map((item, index) => {
              console.log(item);
              return (
                <View style={{ width: 100 }} key={index}>
                  <Text style={[ModelStyle.message]}>{item},</Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text style={{ textAlign: 'center', color: primaryColor }}>
              <Text style={{ color: secondaryColor }}>
                {'The above information are missing  \n'}
              </Text>
              [Click confirm to update missing information]
            </Text>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              width: 300,
              marginBottom: 30,
              justifyContent: 'space-evenly',
              paddingHorizontal: 0,
              marginLeft: 30,
              marginTop: 30
            }}
          >
            <Pressable
              style={[ModelStyle.button, ModelStyle.buttonClose]}
              onPress={() => updateData()}
            >
              <Text style={[ModelStyle.confirmText, { color: '#fff' }]}>
                Continue
              </Text>
            </Pressable>
            <Pressable
              style={[ModelStyle.button, ModelStyle.buttonClose]}
              onPress={() => changeModel(!show)}
            >
              <Text style={[ModelStyle.confirmText, { color: '#fff' }]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
