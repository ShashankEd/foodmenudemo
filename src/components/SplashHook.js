import React, {useEffect } from 'react';
import {
    View,
} from 'react-native';
function SplashHook(props) {
    const  {navigation} = props;
    useEffect (async() => {
        setTimeout(() => {
            navigation.navigate('FoodListComponentHook')
        },2000);
    },[])
    return (
        <View style={{ flex: 1, backgroundColor:'yellow'}}></View>
    )
}

export default SplashHook;