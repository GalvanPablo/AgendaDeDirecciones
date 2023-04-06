import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import { useSelector } from 'react-redux'

import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = ({ navigation }) => {
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
        <FlatList
            data={places}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
