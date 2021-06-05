// import { isError } from 'lodash';
import React from 'react';
import {useState,useEffect,useCallback} from 'react';
import {
    FlatList,
    View,
    Text,
    ScrollView,
    Dimensions,
    TextInput
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import  {getFoodList} from '../store/reducers/foodList';

const ENDPOINT = "https://jsonplaceholder.typicode.com/todos/";

function FoodListComponentHook() {
    const [items,setItems] = useState([]);
    const [isloading,setIsLoading] = useState(true);
    const [errorAPI, setError] = useState(false);
    const getFoodListResponse = useSelector(state=> state.getFoodList.response);
    const dispatch = useDispatch();

    useEffect(() => {
        //here we'll make the api call
        console.log("use effect");
        if(!items.length) {
            fetch(ENDPOINT)
            .then(response => response.json())
            .then(data => {
                filterItems(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log("Error => ", error)
                setError(true);  
                setIsLoading(false);
            })
        }
        const loadFoodList = async () => {
            await dispatch(getFoodList.fetchCall({f:"a"},{f:"a"}));
            console.log("getFoodListResponse ", getFoodListResponse);
            setIsLoading(false);
        };
        loadFoodList();
    },[]);

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

    renderItems = ({item}) => {
        return(
            <View style={{
                flexDirection:'row',
                marginTop: 10,
                padding: 10,
                alignItems: 'center',
                backgroundColor: '#fff',
                borderColor:'black',
                width: '50%'
              }}>
                <Text style={{fontSize : 15, fontWeight: 'bold'}}>{item['title']}</Text>
            </View>
        )
    };

    const renderMemoItems = useCallback((item) => renderItems(item),[]);

    return(
      <View style={{flex:1,padding: 24}}>
          {
              isloading 
              ? <Text>Loading data ......</Text>
              : errorAPI ? <Text>Some network error</Text> 
                        : <FlatList 
                            ListHeaderComponent={renderHeader}
                            keyExtractor={item => item.id}
                            data={items}
                            renderItem={renderMemoItems}
                            numColumns={2}
                        />
          }
      </View>
    )
}

export default React.memo(FoodListComponentHook);