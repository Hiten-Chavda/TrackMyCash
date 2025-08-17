import { StyleSheet, Text, TouchableOpacity, View, FlatList, StatusBar, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const HomeScreen = ({navigation}) => {
  const [expenses, setExpenses] = useState([])

  const getData = async () => {
    // try {
    //   const data = await AsyncStorage.getItem('expenses')
    //   const parsedData = JSON.parse(data)
    //   setExpenses(parsedData || [])
    // } 

    try{
      const data = await axios.get('http://192.168.201.202:5000/expenses')
      console.log(data.data);
      
      setExpenses(data.data || [])
    }
    catch (e) {
      console.log(e)
      Alert.alert(e)
    }
  }

  const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getData)
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#008080" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Expenses</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddExpense')}>
          <Text style={styles.buttonText}>+ Add Expense</Text>
        </TouchableOpacity>

        {expenses.length === 0 ? (
          <Text style={styles.noExpenseText}>No expenses added yet.</Text>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => navigation.navigate('ExpenseDetail', item)}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          
        )}
        <View style={styles.bottomView}>
        <Text style={styles.totalText}>Total: ₹ {total.toFixed(2)}</Text>
        {expenses.length === 0 ?(''):(
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('Graph', expenses)}>
          <Text style={styles.buttonText}>View Graph</Text>
        </TouchableOpacity> 
)}
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

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
    flex: 1,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
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
  item: {
    backgroundColor: '#e0f7fa',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  itemAmount: {
    fontSize: 16,
    color: '#004d40',
  },
  itemDate: {
    fontSize: 14,
    color: '#555',
  },
  noExpenseText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  bottomView:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:100
  },
  bottomButton:{
    backgroundColor:'#008080',
    paddingVertical:15,
    borderRadius:12,
    alignItems:'center',
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowOffset:{width:0,height:3},
    shadowRadius:5,
    elevation:3,
    paddingHorizontal:20
  },
  totalText:{
    fontSize:18,
    fontWeight:'bold',
    color:'#000'
  }
})
