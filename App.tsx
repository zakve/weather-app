import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Text } from '@rneui/themed';

import ListItemUi from './components/ListItemUi';
import { getMeteo } from './api/ApiService';
import FormCoordinates from './components/FormCoordinates';

export default function App() {
  const [lastId, setLastId] = useState(-1)
  const [locations, setLocation] = useState<Ilocations[]>([])

  useEffect(() => {
    if (lastId < 0)
      return

    const tempIndex = locations.findIndex(location => location.id === lastId);
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


  const addLocationHandler = ({ id, latitude, longitude, temperature }: Ilocations) => {
    // get new location object and last id
    setLocation(locations => [...locations, { id, latitude, longitude, temperature: '' }])
    setLastId(id)
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
      <FormCoordinates addLocationHandler={addLocationHandler} />

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
