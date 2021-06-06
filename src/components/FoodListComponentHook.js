// import { isError } from 'lodash';
import React from 'react';
import {useState,useEffect,useCallback,useMemo} from 'react';
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
import filter from 'lodash.filter';
function FoodListComponentHook(props) {
    const getFoodListResponse = useSelector(state=> state.getFoodList.response);
    const dispatch = useDispatch();
    const [isloading,setIsLoading] = useState(true);
    const [errorAPI, setError] = useState(false);
    const [items,setItems] = useState([]);
    const [query, setQuery] = useState('');
    
    //method to handle hardware back button
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
    //call the api 
    const callAPI = async() => {
      await dispatch(getFoodList.fetchCall({},{f:"c"}));
      if(getFoodListResponse) {
        setItems(getFoodListResponse.meals);
      }
      setIsLoading(false);
    };

    //use effect for API call
    useEffect(async() => {
      //here we'll make the api call
      if(getFoodListResponse) {
        setItems(getFoodListResponse.meals);
        setIsLoading(false);
      } else {
        await callAPI();
      }
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
       return () => backHandler.remove();
    },[]);
    //method to handle search on flatlist
    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(getFoodListResponse.meals, item => {
          return contains(item.strMeal.toLowerCase(), formattedQuery);
        });
        if (filteredData.length>0) {
          setItems(filteredData);
        }
        setQuery(text);
    };
    //method to check if substring is there in the string 
    const contains = (title, query) => {
      if (title.includes(query)) {
        return true;
      }
      return false;
    };
    //method to render the search header of flatlist
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
                value={query}
                status='info'
                onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search your favorite food"
                style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
              />
            </View>
          );
    }
    //method to handle click or tap on the flat list items
    viewItemDetails =(item) => {
      const  {navigation} = props;
      navigation.navigate('FoodDetailsComponentHook',{item:item});
    }
    //method to handle render flatlist item
    renderItems = ({item}) => {
        return(
            <FoodListItem 
              item ={item} 
              viewItemDetails={viewItemDetails}
            /> 
        )
    };
    //useCallback to get memoized version of renderItems 
    const renderMemoItems = useCallback((item) => renderItems(item),[]);

    return(
      <View style={{flex:1,paddingHorizontal: 10}}>
          {
              isloading 
              ? <Text>Loading data ......</Text>
              : errorAPI ? <Text>Some network error</Text> 
                        : items && <FlatList 
                            ListHeaderComponent={renderHeader}
                            keyExtractor={item => item.idMeal}
                            data={items}
                            renderItem={renderMemoItems}
                            initialNumToRender={5}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                        />
          }
      </View>
    )
}

export default React.memo(FoodListComponentHook);