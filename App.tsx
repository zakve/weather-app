import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@rneui/themed';

import { getMeteo } from './api/ApiService';
import FormCoordinates from './components/FormCoordinates';
import ListCoordinates from './components/ListCoordinates';

export default function App() {
  const [temperatureIds, setTemperatureIds] = useState<number[]>([])
  const [locations, setLocation] = useState<Ilocations[]>([])

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (temperatureIds?.length < 1)
      return

    for (let id of temperatureIds) {
      const tempIndex = locations.findIndex(location => location.id === id);
      if (tempIndex < 0)
        return

      const { latitude, longitude } = locations[tempIndex]

      const fetchTemperature = async () => {
        const newArray = [...locations];
        try {
          const res = await getMeteo({ params: { latitude, longitude }, signal })
          newArray[tempIndex].temperature = res?.current_weather?.temperature;
          setLocation(newArray)
          temperatureIds.shift()
        } catch (error) {
          console.error(error)
        }
      }

      fetchTemperature();
    }

    return () => {
      controller.abort()
    }
  }, [temperatureIds])

  const addLocationHandler = ({ id, latitude, longitude, temperature }: Ilocations) => {
    setLocation(locations => [...locations, { id, latitude, longitude, temperature: '' }])
    // push array of IDs
    setTemperatureIds(oldArray => [...oldArray, id])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text h1>Weather APP</Text>
      <FormCoordinates addLocationHandler={addLocationHandler} />
      <ListCoordinates locationsProps={locations} setLocationsProps={setLocation} />
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
