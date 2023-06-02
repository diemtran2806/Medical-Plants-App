import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef, Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useCameraDevices} from 'react-native-vision-camera';
import DraggbleBottomSheet from '../BottomSheet';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const HomeComponent = () => {
  const navigation = useNavigation();
  const camera = useRef(null);
  const [imageUri, setImageUri] = useState('');
  const devices = useCameraDevices();
  const device = devices.back;
  const [showCamera, setShowCamera] = useState(true);
  const [flashMode, setFlashMode] = useState('off');
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [token, setToken] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [imageUser, setImageUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getPermisstion() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermisstion();
  }, []);

  const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('token');
      setToken(accessToken);
      console.log(token);
      return accessToken;
    } catch (error) {
      console.error('Failed to get access token', error);
    }
  };

  const getImageUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log('user image:', user);
      setImageUser(JSON.parse(user).avatar);
      console.log(imageUser + 'hihi avata nè');
    } catch (error) {
      console.error('Failed to get avatar', error);
    }
  };

  useEffect(() => {
    getImageUser();
  }, []);

  const handleFlashMode = () => {
    if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('off');
    }
    console.log('mode:', flashMode);
  };

  const handleToggleCameraPosition = () => {
    setIsFrontCamera(prevState => !prevState); // Đảo ngược giá trị boolean
  };

  const uploadImage = async (base64Image, token) => {
    setResult(null);
    try {
      // const response = await RNFetchBlob.fetch(
      //   'POST',
      //   'http://10.0.2.2:8000/leaf-detect/detect/',
      //   {
      //     Authorization: 'Bearer ' + token,
      //     'Content-Type': 'multipart/form-data',
      //     Accept: 'application/json',
      //   },
      //   [
      //     {
      //       name: 'image',
      //       filename: 'image.jpg',
      //       type: 'image/jpeg',
      //       data: RNFetchBlob.wrap(base64Image),
      //     },
      //   ],
      // );

      // const response = await fetch('http://10.0.2.2:8000/leaf-detect/detect/', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Accept: 'application/json',
      //     Authorization: 'Bearer ' + token,
      //   },
      // });
      console.log('hehee');

      const response = await RNFetchBlob.fetch(
        'POST',
        'http://172.20.10.3:8000/leaf-detect/detect/',
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
          timeout: '120000',
        },
        JSON.stringify({data: base64Image}),
      );
      // thời gian chờ của yêu cầu là 60 giây (60000ms)

      // console.log('Upload success', JSON.parse(response.data).data.name);
      // setResult({
      //   name: JSON.parse(response.data).data.name,
      //   description: JSON.parse(response.data).data.description,
      // });
      // console.log(result);
      // console.log('xuong day');
      console.log(response);
      const data = JSON.parse(response.data).data.data;
      console.log(data);

      const rs = {
        name: data.name,
        description: data.description,
      };

      setResult(rs);
      console.log('Upload successfully!');
    } catch (error) {
      console.log('Upload error', error);
    }
  };
  ``;

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});

      //sửa ở đây
      const base64Image = await RNFetchBlob.fs
        .readFile(photo.path, 'base64')
        .then(data => `data:image/jpeg;base64,${data}`);
      // Tải ảnh lên server
      await getAccessToken();
      //console.log(token + 'heheeee');
      // console.log(base64Image);
      uploadImage(base64Image, token);

      setImageUri(photo.path);
      setShowCamera(false);
      setShowBottomSheet(true);
      //console.log('photo', photo.path);
    }
    // const reader = new FileReader();
    // reader.readAsDataURL(imageUri);
    // reader.onload = async () => {
    //   const base64Image = reader.result.replace('data:image/jpeg;base64,', '');
    //   try {
    //     const response = await axios.post(
    //       'http://10.0.2.2:8000/leaf-detect/detect/',
    //       {
    //         image: base64Image,
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: 'Bearer ' + (await getAccessToken()),
    //         },
    //       },
    //     );
    //     console.log('Upload successful', response.data);
    //   } catch (error) {
    //     console.error('Upload failed', error);
    //   }
    // };

    // const formData = new FormData();
    // // const newImageUri = 'file:///' + imageUri.split('file:/').join('');
    // // console.log(newImageUri);

    // console.log(imageUri);
    // formData.append('file', {
    //   uri: imageUri,
    //   name: 'image.jpg',
    //   fileName: 'image',
    //   type: 'image/jpeg',
    // });
    // await getAccessToken();
    // //console.log(token + 'hehee');
    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    //   Authorization: 'Bearer ' + token,
    // };
    // axios({
    //   method: 'post',
    //   url: 'http://10.0.2.2:8000/leaf-detect/detect/',
    //   data: formData,
    //   headers: headers,
    // })
    //   .then(function (response) {
    //     console.log('Success:', response.data);
    //   })
    //   .catch(err => {
    //     console.log('Faled:', err);
    //   });
    // try {
    //   const response = await axios.post(
    //     'http://10.0.2.2:8000/leaf-detect/detect/',
    //     formData,
    //     {
    //       headers: headers,
    //     },
    //   );
    //   console.log('Upload successful', response.data);
    // } catch (error) {
    //   console.error('Upload failed', error);
    // }
  };
  // console.log(imageUser);

  if (device == null) {
    return <Text>Can not open the camera!</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('../../asserts/images/logoApp.png')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          {imageUser ? (
            <Image style={styles.avata} source={{uri: imageUser}} />
          ) : (
            <Image
              style={styles.avata}
              source={require('../../asserts/images/avataDefault.png')}
              // source={{
              //   uri: 'https://hoaminhngoc.vn/wp-content/uploads/2023/01/cute-2-297x300.png',
              // }}
            />
          )}
        </TouchableOpacity>
      </View>
      {showCamera ? (
        <View style={styles.cameraArea}>
          <View style={styles.wrapperCamera}>
            <Camera
              ref={camera}
              flash={flashMode} // Cấu hình flash mode
              style={styles.camera}
              isActive={showCamera}
              photo={true}
              device={isFrontCamera ? devices.front : devices.back}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.flash} onPress={handleFlashMode}>
              <Image
                style={styles.flashIcon}
                source={require('../../asserts/images/flashMode.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => capturePhoto()}>
              {/* <Text style={styles.text}>Capture</Text> */}
              <Image
                style={styles.capture}
                source={require('../../asserts/images/capture.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flash}
              onPress={handleToggleCameraPosition}>
              <Image
                style={styles.flashIcon}
                source={require('../../asserts/images/cameraPosition.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraArea}>
          {imageUri && (
            <Image
              source={{uri: `file://'${imageUri}`}}
              style={styles.wrapperCamera}
            />
          )}
          <View>
            <TouchableOpacity
              style={styles.wrapBtnTakePhoto}
              onPress={() => {
                setShowCamera(true);
                setShowBottomSheet(false);
              }}>
              <Text style={styles.textTakePhoto}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showBottomSheet === false ? (
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('History');
            }}>
            <Image
              style={styles.history}
              source={require('../../asserts/images/history.png')}
            />
          </TouchableOpacity>
        </View>
      ) : result ? (
        <DraggbleBottomSheet
          namePlant={result.name}
          description={result.description}
        />
      ) : (
        <View style={styles.loading}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  header: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  cameraArea: {
    flex: 60,
  },
  img: {
    width: 260,
    height: 60,
    //aspectRatio: 1,
    resizeMode: 'cover',
  },
  avata: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  wrapperCamera: {
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 30, // Đặt giá trị borderRadius tùy ý
    overflow: 'hidden',
  },
  camera: {
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // width: 120,
    // height: 42,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(217, 217, 217, 0.5)',
    // borderRadius: 20,
  },
  loading: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  capture: {
    width: 86,
    height: 86,
    marginHorizontal: 40,
  },
  flash: {},
  flashIcon: {
    width: 28,
    height: 44,
  },
  bottom: {
    //flex: 20,
    flexDirection: 'column-reverse',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  history: {
    width: 111,
    height: 68,
  },

  wrapBtnTakePhoto: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20,
  },
  textTakePhoto: {
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
  },
});

export default HomeComponent;
