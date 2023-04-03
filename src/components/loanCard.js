import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoanCard = ({financeData}) => {
  const navigation = useNavigation();
  const [sum, setSum] = useState(0);
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < financeData.loanData.length; i++) {
      let amount = JSON.parse(financeData.loanData[i].loanAmount);
      total = total + amount;
      setSum(total);
    }
  }, [financeData]);
  const renderItem = ({item}) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.accountTextContainer}>
          <Text style={styles.account}>{item.loanAccount}</Text>
        </View>
        <View style={styles.amountTextContainer}>
          <Text styles={styles.amount}>{item.loanAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {
              fileLink: item.file,
            });
          }}>
          <Text style={{color: 'blue'}}>More details</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{financeData.date}</Text>
      <View style={styles.headingContainer}>
        <Text style={styles.accountText}>Account</Text>
        <Text style={styles.amountText}>Amount</Text>
      </View>
      <FlatList data={financeData.loanData} renderItem={renderItem} />
      <Text style={styles.sum}>Total Amount : {sum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: '2.5%',
    paddingVertical: '2%',
    paddingHorizontal: '0.1%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
  },
  date: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  accountText: {
    marginLeft: '7%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  amountText: {
    marginLeft: '28%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  headingContainer: {
    flexDirection: 'row',
    paddingVertical: '1%',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  amountTextContainer: {
    width: '15%',
    marginVertical: '1%',
  },
  accountTextContainer: {
    width: '50%',
    marginVertical: '1%',
  },
  amount: {
    textAlign: 'center',
  },
  sum: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: '1%',
    fontSize: 16,
    borderTopWidth: 1,
    borderTopColor: 'red',
    color: 'blue',
  },
});

export default LoanCard;
