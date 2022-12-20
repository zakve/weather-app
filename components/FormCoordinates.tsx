import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from '@rneui/themed';

import InputUi from './InputUi';
import { isLatitude, isLongitude } from '../utils/utils';

type Props = {
    addLocationHandler: ({ id, latitude, longitude, temperature }: Ilocations) => void
}

const FormCoordinates = ({ addLocationHandler }: Props) => {
    const [lastId, setLastId] = useState(0)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [errorText, setErrorText] = useState(' ')

    const onSubmit = () => {
        // basic validation
        if (!isLatitude(parseInt(latitude)) || !isLongitude(parseInt(longitude))) {
            setErrorText('Please set correct Lat and Long')
            return
        }

        // save validated inputs
        setErrorText(' ')
        addLocationHandler({ id: lastId, latitude, longitude, temperature: '' })
        // temporary ID - replace with DB ID
        setLastId(lastId => lastId + 1)
        setLatitude('')
        setLongitude('')
    }

    return (
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
                onPress={onSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
});

export default FormCoordinates