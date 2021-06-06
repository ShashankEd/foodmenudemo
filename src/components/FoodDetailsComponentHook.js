import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
function FoodDetailsComponentHook({navigation, route}) {
    const [item, setItem] = useState(route.params.item);
    return (
        <ScrollView style={styles.parent}>
            <View style={styles.secondParent}>
                <View style={styles.wrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.strMealThumb }}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>{item.strMeal}</Text>
                        <Text style={styles.subtitle}>{`Category : ${item.strCategory}`}</Text>
                        <Text style={styles.description}>{`Instruction: ${item.strInstructions}`}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    parent: {
        flex: 1, 
        paddingTop:10,
    },
    secondParent: {
        flex:1,
        justifyContent:"flex-start", 
        alignItems:'center', 
        marginHorizontal: 10,
    },
    wrapper: {
        flexDirection: 'column',
        marginBottom: 15,
    },
    imageWrapper: {
        // marginHorizontal: 10,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "Georgia"
    },
    subtitle: {
        fontSize: 16,
        color: '#303540',
        paddingBottom:10,
        fontWeight: 'bold',
        fontFamily: "Georgia"
    },
    description: {
        fontSize: 14,
        color: '#303540',
        textAlign:'justify',
        lineHeight:15,
        letterSpacing:0.5,
        fontFamily: "Georgia"
    }
});

export default FoodDetailsComponentHook;