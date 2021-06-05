import React, {useEffect } from 'react';
import {
    View,
} from 'react-native';
function SplashHook(props) {
    const  {navigation} = props;
    useEffect (async() => {
        setTimeout(() => {
            navigation.navigate('FoodListComponentHook')
        })
    },[])
    return (
        <View style={{ flex: 1, padding: 24}}></View>
    )
}

export default SplashHook;