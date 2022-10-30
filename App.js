import { StyleSheet, Text, View } from 'react-native';
import Photobooth from './Photobooth.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Photobooth/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
