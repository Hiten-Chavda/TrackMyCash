import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native'

const AddExpense = ({ route, navigation }) => {
  const editingExpense = route?.params || null;
  const [title, setTitle] = useState(editingExpense?.title || '');
  const [amount, setAmount] = useState(editingExpense?.amount?.toString() || '');
  const [date, setDate] = useState(editingExpense?.date || '');

  const handleAddExpense = async () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please fill all the fields')
      return
    }

    const expenseDate = date ? date : new Date().toISOString().split('T')[0]

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount,
      date: expenseDate,
    }

    // using local storage
    // try{
    //   const existingData = await AsyncStorage.getItem('expenses')
    //   const expenses = existingData ? JSON.parse(existingData) : []

    //   expenses.push(newExpense)
    //   await AsyncStorage.setItem('expenses', JSON.stringify(expenses))

    //   navigation.goBack('Home') 
    // }
    try {
       if (editingExpense) {
        // UPDATE request
        await axios.put(`http://192.168.201.202:5000/update/${editingExpense.id}`, {
          title,
          amount,
          date: expenseDate,
        });
        Alert.alert('Success', 'Expense updated!');
        navigation.goBack()
        return;
      }
      const response = await axios.post(
        'http://192.168.201.202:5000/add-expenses',
        {
          title, amount, date: expenseDate,
        }
      )
      Alert.alert('Success', 'Expense added!');
      navigation.goBack();
    }
    catch (error) {

      if (error.response) {
        Alert.alert('Error', error.response.data.error || 'Something went wrong');
      } else if (error.request) {
        Alert.alert('Error', 'No response from server');
      } else {
        Alert.alert('Error', 'Request failed');
      }
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#008080" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{editingExpense ? 'Edit Expense' : 'Add Expense'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Expense Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9.]/g, '')
            setAmount(filtered)
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddExpense} >
          <Text style={styles.buttonText}> {editingExpense ? 'Update Expense' : 'Add Expense'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default AddExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
  },
  header: {
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 25,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingTop: 35,
    flexGrow: 1,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
