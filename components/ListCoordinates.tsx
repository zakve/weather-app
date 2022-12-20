import { FlatList } from 'react-native'

import ListItemUi from './ListItemUi';

type Props = {
    locationsProps: Ilocations[]
    setLocationsProps: ([{ id, latitude, longitude, temperature }]: Ilocations[]) => void
}

const ListCoordinates = ({ locationsProps, setLocationsProps }: Props) => {

    const removeLocationHandler = (id: number) => {
        const removeIndex = locationsProps.findIndex(location => location.id === id)

        if (removeIndex > -1) {
            const newArray = [...locationsProps];
            newArray.splice(removeIndex, 1)
            //locationsProps = newArray
            setLocationsProps(newArray)
        }

    }
    return (
        <FlatList
            data={locationsProps}
            renderItem={({ item }) => <ListItemUi
                id={item.id}
                latitude={item.latitude}
                longitude={item.longitude}
                temperature={item.temperature}
                onPress={() => removeLocationHandler(item.id)}
            />}
        />
    )
}


export default ListCoordinates