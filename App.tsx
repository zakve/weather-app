import { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text, Button, ListItem } from '@rneui/themed';

import InputUi from './components/InputUi';
import ListItemUi from './components/ListItemUi';
import { isLatitude, isLongitude } from './utils/utils';

export default function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [errorText, setErrorText] = useState(' ')
  const [lastId, setLastId] = useState(0)
  const [locations, setLocation] = useState<Ilocations[]>([{ id: 1, latitude: '5', longitude: '10', temperature: '' }, { id: 2, latitude: '5', longitude: '10', temperature: '' }])

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // fetch

    return () => {
      controller.abort()
    }
  }, [locations])


  const addLocationHandler = () => {
    // basic validation
    if (!isLatitude(parseInt(latitude)) || !isLongitude(parseInt(longitude))) {
      setErrorText('Please set correct Lat and Long')
      return
    }

    // save validated inputs
    setErrorText(' ')
    setLocation(locations => [...locations, { id: lastId, latitude, longitude, temperature: '' }])
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

      <FlatList
        data={locations}
        renderItem={({ item }) => <ListItemUi
          id={item.id}
          latitude={item.latitude}
          longitude={item.longitude}
          temperature={item.temperature}
          onPress={() => { console.log('press') }}
        />}
      />
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
