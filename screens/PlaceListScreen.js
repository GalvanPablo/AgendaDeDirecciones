import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import * as addressActions from '../store/places.actions'

import PlaceItem from '../components/PlaceItem'
import { Button } from 'react-native-elements'

const PlaceListScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addressActions.loadPlaces())
    }, [])

    const places = useSelector(state => state.places.places)
    // console.log(places)

    const renderItem = (data) => (
        <PlaceItem
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            onSelect={() => navigation.navigate('Detalle', {placeId: data.item.id})}
        />
    )

    return (
        <View>
            <FlatList
                data={places}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {places.length === 0
                ? <Text style={styles.text}>No hay lugares</Text>
                : <Button title='Eliminar todas las direcciones' buttonStyle={styles.btnDelete} onPress={() => dispatch(addressActions.deleteAllPlaces())} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10,
    },
    btnDelete: {
        marginVertical: 10,
        backgroundColor: '#d00'
    }
})

export default PlaceListScreen
