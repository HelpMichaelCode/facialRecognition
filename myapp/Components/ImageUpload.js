import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
function ImageUpload() {
  const [filePath, setPath] = useState('');
  const [fileData, setD] = useState('');
  const [fileUri, setUri] = useState('');

  // Function component
  function launchImageLibrary() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: './../Images/',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));

        setPath(response);
        setD(response.assets[0].uri);
        console.log('RESPONSE DATA: ', response.assets[0].uri);
        setUri(response.uri);
      }
    });
  }
  function renderFileData() {
    if (fileData) {
      // If there is image data to be displayed
      // Display it
      return (
        <Image
          source={{uri: fileData}}
          style={styles.validImage}
          resizeMode="contain"
        />
      );
    } else {
      // Default image is displayed when no image is chosen
      return (
        <Image
          source={require('./../Images/istockphoto-1145585734-612x612.jpeg')}
          style={styles.noImage}
          resizeMode="contain"
        />
      );
    }
  }
  return (
    <>
      <View style={styles.imageBody}>
        {/* This View component is where the image is being displayed */}
        <View style={styles.ImageSections}>
          <View>{renderFileData()}</View>
        </View>

        {/* This View component is where the buttons are being displayed */}
        <View style={styles.btnParentSection}>
          <TouchableOpacity
            onPress={launchImageLibrary}
            style={styles.btnSection}>
            <Text style={styles.imgBtn2}>Image Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageBody: {
    paddingBottom: 25,
  },
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  imgBtn1: {
    backgroundColor: '#1E2425',
    fontFamily: 'sans-serif-thin',
    alignItems: 'center',
    width: 105,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    marginLeft: 50,
    borderRadius: 3,
    color: 'white',
  },
  imgBtn2: {
    backgroundColor: '#1E2425',
    fontFamily: 'sans-serif-thin',
    alignItems: 'center',
    width: 105,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 16,
    marginLeft: 50,
    borderRadius: 3,
    color: 'white',
  },
  validImage: {
    width: 350,
    height: 300,
    borderRadius: 5,
  },
});

export default ImageUpload;
