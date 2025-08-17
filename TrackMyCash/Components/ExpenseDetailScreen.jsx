import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ScrollView } from 'react-native'
import { Alert } from 'react-native';

const ExpenseDetailScreen = ({route,navigation}) => {
  const {id, title, amount, date} = route.params
  const [data, setData] = useState([])
  const [expenses, setExpenses] = useState()

    const handleDelete = async () => {
  try {
    await axios.delete(`http://192.168.201.202:5000/delete/${id}`);
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    Alert.alert('Deleted', 'Expense deleted successfully');
    navigation.goBack();
  } catch (e) {
    console.warn(e);
    Alert.alert('Error', 'Failed to delete expense');
  }
};
    const handleEdit = () =>{
        navigation.navigate('AddExpense', route.params)
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Title: {title}</Text>
            <Text style={styles.label}>Amount: ₹{amount}</Text>
            <Text style={styles.label}>Date: {date || "Not available"}</Text>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={{color:'#fff',fontSize:16}}>Delete</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button2} onPress={handleEdit}>
                <Text style={{color:'#fff',fontSize:16}}>Edit</Text>
            </TouchableOpacity> 
           
        </ScrollView>
    )
}

export default ExpenseDetailScreen

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    label: {
      fontSize: 18,
      marginVertical: 5,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 15,
        width:'20%',
        borderRadius: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
      },
    button2: {
        backgroundColor: 'green',
        paddingVertical: 15,
        width:'20%',
        borderRadius: 1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
      },
      map:{
        backgroundColor:'gray',
        margin:3,
        
      }
  })