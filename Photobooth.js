import { StyleSheet, Text, View } from 'react-native';
import Video from './Video';
import SnapshotButton from './SnapshotButton';
import Countdown from './Countdown';
import SnapshotList from './SnapshotList.js';

export default function Photobooth() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Photobooth</Text>
        <View>
          <Video />
          <SnapshotButton />
        </View>
        <Countdown />
        <SnapshotList />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});