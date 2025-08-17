
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';

const Graph = ({ route }) => {
  const expenses = route.params;
  const { width: screenWidth } = useWindowDimensions();

  // Prepare data for PieChart
  const pieData = expenses.map((expense, index) => ({
    name: expense.title,
    amount: Number(expense.amount),
    color: getColor(index), // Assign a color for each slice
    legendFontColor: '#000',
    legendFontSize: 14
  }));

  return (
    <ScrollView>
      <View>
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // shows actual numbers instead of percentages
        />
      </View>
    </ScrollView>
  );
};

// Helper function to generate different colors
const getColor = (index) => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56',
    '#4BC0C0', '#9966FF', '#FF9F40'
  ];
  return colors[index % colors.length];
};

export default Graph;

const styles = StyleSheet.create({});

// import { ScrollView, StyleSheet, useWindowDimensions, View  } from 'react-native'
// import React from 'react'
// import { LineChart } from 'react-native-chart-kit';

// const Graph = ({route}) => {
//   const expenses = route.params
//   console.log(expenses)
//   const { width: screenWidth } = useWindowDimensions(); 

  
//   return (
//     <ScrollView> 
//     <View>
//       <LineChart
//         data={{
//           labels: expenses.map(expense => expense.title),
//           datasets: [{ data: expenses.map(expense => Number(expense.amount)) }]
//         }}
//         width={screenWidth - 20}
//         height={220}
//         yAxisSuffix=""
//         chartConfig={{
//           backgroundColor: "#f0f0f0",
//           backgroundGradientFrom: "#f0f0f0",
//           backgroundGradientTo: "#e0e0e0",
//           color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: { borderRadius: 16 },
//           propsForDots: {
//             r: "4",
//             strokeWidth: "2",
//             stroke: "#1e90ff"
//           }
//         }}
//         bezier
//         style={{ marginVertical: 10, borderRadius: 16 }}
//       />
//     </View>
   
//     </ScrollView>
//   )
// }

// export default Graph

// const styles = StyleSheet.create({})
