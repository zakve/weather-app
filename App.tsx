import { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import { Text, Button } from '@rneui/themed';

import InputUi from './components/InputUi';
import ListItemUi from './components/ListItemUi';
import { isLatitude, isLongitude } from './utils/utils';
import { getMeteo } from './api/ApiService';

export default function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [errorText, setErrorText] = useState(' ')
  const [lastId, setLastId] = useState(0)
  const [locations, setLocation] = useState<Ilocations[]>([])

  useEffect(() => {
    if (lastId < 0)
      return

    const tempIndex = locations.findIndex(location => location.id === lastId - 1);
    if (tempIndex < 0)
      return

    const controller = new AbortController();
    const { signal } = controller;

    const { latitude, longitude } = locations[tempIndex]

    const fetchTemperature = async () => {
      const newArray = [...locations];
      try {
        const res = await getMeteo({ params: { latitude, longitude }, signal })
        newArray[tempIndex].temperature = res?.current_weather?.temperature;
        setLocation(newArray)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTemperature();

    return () => {
      controller.abort()
    }
  }, [lastId])


  const addLocationHandler = () => {
    // basic validation
    if (!isLatitude(parseInt(latitude)) || !isLongitude(parseInt(longitude))) {
      setErrorText('Please set correct Lat and Long')
      return
    }

    // save validated inputs
    setErrorText(' ')
    setLocation(locations => [...locations, { id: lastId, latitude, longitude, temperature: '' }])
    // temporary ID - replace with DB ID
    setLastId(lastId => lastId + 1)
    setLatitude('')
    setLongitude('')
  }

  const removeLocationHandler = (id: number) => {
    const removeIndex = locations.findIndex(location => location.id === id)

    if (removeIndex > -1) {
      const newArray = [...locations];
      newArray.splice(removeIndex, 1)
      setLocation(newArray)
    }
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
          onPress={() => removeLocationHandler(item.id)}
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
