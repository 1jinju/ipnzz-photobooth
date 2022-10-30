
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { render } from 'react-dom';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from "expo-media-library";
import * as Permissions from 'expo-permissions'

export default class Video extends React.Component {

  componentDidMount() {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setHasPermission(status === 'granted');
    })();
  }

  setSnap = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      this.setState(
        {
          photo: photo.base64,
          scanning: false,
          uri: photo.uri,
        },
      );
      if (photo.uri) {
        this.savePhoto(photo.uri)
      }
    }
  };

  savePhoto = async uri => {
    const ALBUM_NAME = "Photobooth";

    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(photo.uri)
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
  
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
        }
      } 
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Camera style={{borderRadius: 10, width: 300, height: 400}}
            type = {Camera.Constants.Type.front}
            ref={(ref) => {this.camera = ref;
          }}>
          </Camera>
        </View>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          <TouchableOpacity onPress={this.setSnap}>
              <Text>
                <Ionicons name="camera" size={44} color="black" />
              </Text>
            </TouchableOpacity>
        </View>
    </View>
    );
    };
  }

const styles = StyleSheet.create({
  container: {
    /*flex: 1,*/
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});