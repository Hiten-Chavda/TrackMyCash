import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Components/HomeScreen';
import AddExpense from '../Components/AddExpense';
import ExpenseDetailScreen from '../Components/ExpenseDetailScreen';
import Graph from '../Components/Graph';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpense}/>
        <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} />
        <Stack.Screen name="Graph" component={Graph}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
