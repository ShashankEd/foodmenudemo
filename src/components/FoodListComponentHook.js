// import { isError } from 'lodash';
import React from 'react';
import {useState,useEffect,useCallback} from 'react';
import {
    FlatList,
    View,
    Text,
    ScrollView,
    Dimensions,
    TextInput,
    BackHandler,
    Alert
} from 'react-native';
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import  {getFoodList} from '../store/reducers/foodList';
import FoodListItem from './FoodListItem';

function FoodListComponentHook(props) {
    const [isloading,setIsLoading] = useState(true);
    const [errorAPI, setError] = useState(false);
    const getFoodListResponse = useSelector(state=> state.getFoodList.response);
    const dispatch = useDispatch();
    const [items,setItems] = useState(getFoodListResponse?.getFoodListResponse);

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want Exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    useEffect(() => {
      //here we'll make the api call
      const callAPI = async() => {
        await dispatch(getFoodList.fetchCall({f:"a"},{f:"c"}));
        setIsLoading(false);
      };
      if(getFoodListResponse) {
        setItems(getFoodListResponse?.getFoodListResponse);
        setIsLoading(false);
      } else {
        callAPI();
        setItems(getFoodListResponse?.getFoodListResponse);
      }
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
       return () => backHandler.remove();
    },[dispatch]);

    const renderHeader = () => {
          return (
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                marginVertical: 10,
                borderRadius: 20
              }}
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
              //   value={query}
              //   onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search"
                style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
              />
            </View>
          );
    }
  
    filterItems = (items) => {
        const filtered = items.filter((item) => item['completed'])
        setItems(filtered);
    }

    viewItemDetails =(item) => {
      const  {navigation} = props;
      navigation.navigate('FoodDetailsComponentHook',{item:item});
    }

    renderItems = ({item}) => {
        return(
            // <View style={{
            //     flexDirection:'row',
            //     marginTop: 10,
            //     padding: 10,
            //     alignItems: 'center',
            //     backgroundColor: '#fff',
            //     borderColor:'black',
            //     width: '50%'
            //   }}>
            //     <Text style={{fontSize : 15, fontWeight: 'bold'}}>{item['strMeal']}</Text>
            // </View>
            <FoodListItem item ={item} viewItemDetails={viewItemDetails}/> 
        )
    };

    const renderMemoItems = useCallback((item) => renderItems(item),[]);

    return(
      <View style={{flex:1,paddingHorizontal: 10}}>
          {
              isloading 
              ? <Text>Loading data ......</Text>
              : errorAPI ? <Text>Some network error</Text> 
                        : <FlatList 
                            ListHeaderComponent={renderHeader}
                            keyExtractor={item => item.idMeal}
                            data={getFoodListResponse.meals}
                            renderItem={renderMemoItems}
                        />
          }
      </View>
    )
}

export default React.memo(FoodListComponentHook);