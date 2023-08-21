import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ImageView from 'react-native-image-viewing';

const IssueDetailScreen = ({ navigation, route }) => {
  const taskname = route?.params?.taskname;

  const [description, setDescription] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleAlign: 'center'
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>{taskname}</Text>
        <TouchableHighlight style={styles.status}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
            To Do
          </Text>
        </TouchableHighlight>
        <Text style={{ fontWeight: '600', color: 'black', marginVertical: 20 }}>
          Description
        </Text>
        <TextInput
          value={description}
          onchange={(text) => setDescription(text)}
          placeholder='Add a description...'
          style={styles.discriptionTextInput}
        />
        <Text style={{ fontWeight: '600', color: 'black', marginVertical: 20 }}>
          Photos
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedImageIndex(0) & setIsVisible(true);
          }}
        >
          {/* <Image
            style={{
              height: 300,
              width: '50%',
              margin: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            resizeMode="contain"
            source={require('../assets/images/screenshot1.png')}
          /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedImageIndex(1) & setIsVisible(true);
          }}
        >
          {/* <Image
            style={{
              height: 300,
              width: '50%',
              margin: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            resizeMode="contain"
            source={require('../assets/images/screenshot2.png')}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedImageIndex(2) & setIsVisible(true);
          }}
        >
          {/* <Image
            style={{
              height: 300,
              width: '50%',
              margin: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
            resizeMode="contain"
            source={require('../assets/images/screenshot3.png')}
          /> */}
        </TouchableOpacity>
      </ScrollView>
      {/* <ImageView
        images={[
          require('../assets/images/screenshot1.png'),
          require('../assets/images/screenshot2.png'),
          require('../assets/images/screenshot3.png'),
        ]}
        imageIndex={selectedImageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15
  },
  header: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  status: {
    backgroundColor: 'black',
    width: 80,
    height: 25,
    borderRadius: 5,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  discriptionTextInput: {
    padding: 0
  }
});

export default IssueDetailScreen;
