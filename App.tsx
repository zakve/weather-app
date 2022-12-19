import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text, Button } from '@rneui/themed';

import InputUi from './components/InputUi';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text h1>Weather APP</Text>
      <View>
        <InputUi
          placeholder='Latitude'
          keyboardType='numeric'
        />
        <InputUi
          placeholder='Longitude'
          keyboardType='numeric'
        />
        <Button
          title="Add location"
          onPress={() => { }}
        />
      </View>
    </SafeAreaView>
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
