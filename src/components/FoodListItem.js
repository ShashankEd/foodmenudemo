import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
const FoodListItem = ({item,viewItemDetails}) => {
   return (
    <TouchableOpacity
    onPress={() => {
        viewItemDetails(item);
    }}>
    <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={{uri: item.strMealThumb}}
            />
        </View>
        <View>
            <Text style={styles.title}>{item.strMeal}</Text>
            <Text style={styles.subtitle}>{item.strCategory}</Text>
        </View>
    </View>
</TouchableOpacity>
   )
}
const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    imageWrapper: {
      marginRight: 10,
    },
    image: {
      width: 100,
      height: 100,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: "Georgia"
    },
    subtitle: {
      fontSize: 16,
      color: '#303540',
      fontFamily: "Georgia"
    },
  });

  export default FoodListItem;