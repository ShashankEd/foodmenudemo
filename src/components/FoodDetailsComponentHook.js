import React, {useEffect } from 'react';
import {
    View,
} from 'react-native';
function FoodDetailsComponentHook(props) {

    useEffect (async() => {
        // setTimeout(() => {
        //     navigation.navigate('FoodListComponentHook')
        // })
    },[])
    return (
        <View style={{ flex: 1, padding: 24}}>
            <Text>Details Screen</Text>
        </View>
    )
}

export default FoodDetailsComponentHook;