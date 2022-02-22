import React, { useEffect, useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Camera } from 'expo-camera';

const TakePicture: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [source, setSource] = useState();
  
  let camera= useRef<Camera | null>(null);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true, skipProcessing: true};
      let picture = await camera.takePictureAsync(options);


      if (Platform.OS === 'android') {
        console.log(camera.getSupportedRatiosAsync());
      }
      setSource(picture.uri);

      console.log('source ==>', picture.uri);
    } else {
      console.log('camera:', camera)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {source ?
        <Image
          style={{ width: 390, height: 675 }}
          source={{ uri: source }}
        />
        :
        <Camera
          ref={ref => {
            camera = ref;
          }}
          type={type}
          style={styles.camera} >
          <View style={styles.buttonContainer}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { takePicture() }}
              >
                <Icon name="radio-button-on" color="#FFFFFF" size={60} />
              </TouchableOpacity>

            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Icon name="camera-reverse-sharp" color="#FFFFFF" size={30} />
            </TouchableOpacity>
          </View>
        </Camera>
      }
    </View>
  );
}
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default TakePicture;