import { Camera } from "expo-camera";
import { Image, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef, useEffect } from "react";
import usePermission from "./src/usePermisson";
import Button from "./src/components/Button";

export default function Cam({navigation, route}) {
  const hasCameraPermissions = usePermission(Camera);
  const type = Camera.Constants.Type.front;
  const cameraRef = useRef(null);
  const timer = 3;
  const [timerOn, setTimerOn] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(timer);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  useEffect(() => {
    if (!timerOn) {
      return;
    }
    setDisplayTimer(timer);

    const interval = setInterval(() => {
      setDisplayTimer((prevTimer) =>
        prevTimer > 1 ? prevTimer - 1 : clearInterval(interval)
      );
    }, 1000);
  }, [timerOn, setTimerOn, timer]);

  const takePicture = async () => {
    setTimerOn(true);
    setTimeout(async function () {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
      setTimerOn(false);
      setTimerOn(true);
    }, 3000);
    setTimeout(async function () {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage2(data.uri);
      setTimerOn(false);
      setTimerOn(true);
    }, 6100);
    setTimeout(async function () {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage3(data.uri);
      setTimerOn(false);
      setTimerOn(true);
    }, 9200);
    setTimeout(async function () {
      const options = { quality: 0.5, base64: true, skipProcessing: false };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage4(data.uri);
      setTimerOn(false);
    }, 12300);
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Image saved!");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermissions === false) {
    return <Text>No permission to access camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 300,
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 30 }}>PHOTO BOOTH</Text>
        {timerOn && <Text style={styles.displayTimerText}>{displayTimer}</Text>}
      </View>
      {!image4 ? (
        <Camera style={styles.camera} type={type} ref={cameraRef} />
      ) : (
        <View>
          <Image style={{width: 100, height: 148, marginVertical: 10}} source={route.params.frame}/>
          <Image
            style={{ width: 150, height: 200, transform: [{ scaleX: -1 }] }}
            source={{ uri: image }}
          />
          <Image
            style={{ width: 150, height: 200, transform: [{ scaleX: -1 }] }}
            source={{ uri: image2 }}
          />
          <Image
            style={{ width: 150, height: 200, transform: [{ scaleX: -1 }] }}
            source={{ uri: image3 }}
          />
          <Image
            style={{ width: 150, height: 200, transform: [{ scaleX: -1 }] }}
            source={{ uri: image4 }}
          />
        </View>
      )}

      <View>
        {image4 ? (
          <View style={styles.takenImage}>
            <Button
              icon="retweet"
              color="#000"
              onPress={() => setImage4(null)}
            />
            <Button icon="check" color="#000" onPress={savePicture} />
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <Button icon={"camera"} color="#000" onPress={takePicture} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 300,
    height: 400,
    position: "relative",
  },
  takenImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  displayTimerText: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});