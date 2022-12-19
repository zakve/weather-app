import { StyleSheet } from 'react-native';
import { ListItem, ListItemProps } from '@rneui/themed';

const ListItemUi = (props: (ListItemProps & Ilocations)) => {
    const { id, latitude, longitude, temperature, onPress } = props;

    return (
        <ListItem
            key={id}
            style={styles.listContainer}
            onPress={onPress}
        >
            <ListItem.Content>
                <ListItem.Title>{`${latitude}, ${longitude}`}</ListItem.Title>
                {
                    temperature &&
                    <ListItem.Title right>{`${temperature} °C`}</ListItem.Title>
                }
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        minWidth: 300,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ListItemUi