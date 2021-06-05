
 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
 } from 'react-native';
 import 'react-native-gesture-handler';
 import {Provider} from 'react-redux';
 import {PersistGate} from 'redux-persist/integration/react';
 import {get as _get} from 'lodash';
 import {store, persistor} from './src/store/configStore';
 import { LogBox } from 'react-native';
 LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
 LogBox.ignoreAllLogs(); //Ignore all log notifications
 
import SplashHook from './src/components/SplashHook';
import FoodListComponentHook from './src/components/FoodListComponentHook';
import FoodDetailsComponentHook from './src/components/FoodDetailsComponentHook';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
  function App() {
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.mainContainer}>
           <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashHook'>
              <Stack.Screen name="SplashHook" component={SplashHook} options={{header:  ()=> null}}/>
              <Stack.Screen name="FoodListComponentHook" component={FoodListComponentHook} options={{ header: ()=> null }}/>
              <Stack.Screen name="FoodDetailsComponentHook" component={FoodDetailsComponentHook}  options={{header:  ()=> null}}/>
            </Stack.Navigator>
           </NavigationContainer>
           </SafeAreaView>
       </PersistGate>
     </Provider>
   );
 };
 
 const styles = StyleSheet.create({
   mainContainer: {
    flex: 1,
    justifyContent: 'center',
   }
 });
 
 export default App;
 