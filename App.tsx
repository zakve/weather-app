import { useState } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text, Button, ListItem } from '@rneui/themed';

import InputUi from './components/InputUi';
import { isLatitude, isLongitude } from './utils/utils';

export default function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [errorText, setErrorText] = useState(' ')
  const [locations, setLocation] = useState<Ilocations[]>([])

  const addLocationHandler = () => {
    // basic validation
    if (!isLatitude(parseInt(latitude)) || !isLongitude(parseInt(longitude))) {
      setErrorText('Please set correct Lat and Long')
      return
    }

    // save validated inputs
    setErrorText(' ')
    setLocation(locations => [...locations, { latitude, longitude, temperature: '' }])
    setLatitude('')
    setLongitude('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text h1>Weather APP</Text>
      <View>
        <InputUi
          placeholder='Latitude'
          keyboardType='numeric'
          value={latitude}
          onChangeText={val => setLatitude(val)}
        />
        <InputUi
          placeholder='Longitude'
          keyboardType='numeric'
          value={longitude}
          onChangeText={val => setLongitude(val)}
        />
        <Text style={styles.errorText}>{errorText}</Text>
        <Button
          title="Add location"
          onPress={addLocationHandler}
        />
      </View>

      <View>
        <FlatList
          data={locations}
          renderItem={({ item }) => <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{`${item.latitude}, ${item.longitude}`}</ListItem.Title>
              {
                item.temperature &&
                <ListItem.Title right>{`${item.temperature} °C`}</ListItem.Title>
              }
            </ListItem.Content>
          </ListItem>}
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
    justifyContent: 'flex-start',
  },
  errorText: {
    color: 'red'
  }
});
