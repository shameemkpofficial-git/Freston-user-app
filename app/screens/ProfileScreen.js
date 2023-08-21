// @flow

import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-community/masked-view';
import React, { useContext } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import { AppContext } from 'app/common/constants';

const Profile = ({ navigation }) => {
  const { userDetails } = useContext(AppContext);

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure? You want to logout?',
      [
        {
          onPress: () => null,
          text: 'Cancel'
        },
        {
          onPress: () => {
            clearToken().then(() => {
              navigation.navigate('phoneAuth');
            });
          },
          text: 'Confirm'
        }
      ],
      { cancelable: false }
    );
  };

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
      // saving error
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#764ebf', '#b55ee0']}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.header}
      />
      <Image
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar7.png' }}
        style={styles.avatar}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <View style={styles.buttonContainer2}>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginLeft: 30,
                width: '100%'
              }}
            >
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name}>
                {userDetails.name}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UpdateProfileScreen')}
                style={{ width: 20 }}
              >
                <MaskedView
                  maskElement={
                    <AntDesign
                      color='white'
                      name='edit'
                      size={20}
                      style={{ flex: 1 }}
                    />
                  }
                  style={{ backgroundColor: 'yellow', height: 20 }}
                >
                  <LinearGradient
                    colors={['#764ebf', '#b55ee0']}
                    style={{ flex: 1 }}
                  />
                </MaskedView>
              </TouchableOpacity>
            </View>
            <Text style={styles.info}>
              {userDetails?.department ? userDetails?.department : 'No data'} /{' '}
              {userDetails?.designation ? userDetails?.designation : 'No data'}
            </Text>

            <Text style={styles.description}>
              {userDetails?.name} is a{' '}
              {userDetails?.department ? userDetails?.department : 'No data'}
              {userDetails?.designation
                ? userDetails?.designation
                : 'No data'}{' '}
              in freston joined on{' '}
              {userDetails?.joiningDate ? userDetails?.joiningDate : 'No data'}.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => logout()}
            style={[styles.buttonContainer, { width: 250 }]}
          >
            <LinearGradient
              colors={['#764ebf', '#b55ee0']}
              end={{ x: 1, y: 0.5 }}
              start={{ x: 0, y: 0 }}
              style={{
                alignItems: 'center',
                borderRadius: 30,
                flexDirection: 'row',
                height: 45,
                justifyContent: 'center',
                paddingHorizontal: 20,
                width: 250
              }}
            >
              <Text style={{ color: '#fff' }}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#39FF14',
    borderRadius: 63,
    borderWidth: 2,
    height: 130,
    marginBottom: 10,
    marginTop: 130,
    position: 'absolute',
    width: 130
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    alignItems: 'center',
    flex: 1,
    padding: 30
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    width: 100
  },
  buttonContainer2: {
    alignItems: 'center',
    borderRadius: 30,
    height: 140,
    justifyContent: 'flex-start',
    marginBottom: 0,
    marginTop: 10,
    paddingHorizontal: 20,
    width: 300
  },
  description: {
    color: '#696969',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200
  },
  info: {
    color: '#764ebf',
    fontSize: 16,
    marginTop: 10
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600'
  },
  name: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600'
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  }
});
