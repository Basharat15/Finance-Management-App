import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Card = ({financeData}) => {
  const navigation = useNavigation();
  const [funds, setFunds] = useState(0);
  const [debts, setDebts] = useState(0);
  const [report, setReport] = useState(0);

  useEffect(() => {
    let totalFunds = 0;
    let totalDebts = 0;
    for (let i = 0; i < financeData.funds.length; i++) {
      let amount = JSON.parse(financeData.funds[i].amount);
      totalFunds = totalFunds + amount;
      setFunds(totalFunds);
    }
    for (let i = 0; i < financeData.debts.length; i++) {
      let amount = JSON.parse(financeData.debts[i].amount);
      totalDebts = totalDebts + amount;
      setDebts(totalDebts);
    }
    let final = funds - debts;
    setReport(final);
  }, [funds]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.accountTextContainer}>
          <Text style={{color: '#8c8474', fontSize: 15}}>{item.account}</Text>
        </View>
        <View style={styles.amountTextContainer}>
          <Text style={{color: 'black', textAlign: 'center'}}>
            {item.amount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {
              fileLink: item.file,
            });
          }}>
          <Text style={{color: '#1b2434'}}>More details</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItemDebt = ({item}) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.accountTextContainer}>
          <Text style={{color: '#8c8474', fontSize: 15}}>{item.account}</Text>
        </View>
        <View style={styles.amountTextContainer}>
          <Text style={{color: 'black', textAlign: 'center'}}>
            {item.amount}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {
              fileLink: item.file,
            });
          }}>
          <Text style={{color: '#1b2434'}}>More details</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // #1b2434
  // #d3d2ce
  // #8c8474
  return (
    <View>
      <Text style={styles.date}>{financeData.date}</Text>
      <View style={{marginLeft: '2%'}}>
        <Text style={{fontWeight: 'bold', color: '#1b2434', fontSize: 17}}>
          Summary
        </Text>
        <Text style={{fontWeight: 'bold', color: '#8c8474', fontSize: 16}}>
          Total Funds : {funds}
        </Text>
        <Text style={{fontWeight: 'bold', color: '#8c8474', fontSize: 16}}>
          Total Debts :{debts}
        </Text>
        <Text style={{fontWeight: 'bold', color: '#8c8474', fontSize: 16}}>
          Finalized Report : {report}
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1b2434',
            marginTop: '1%',
          }}>
          Funds
        </Text>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.accountText}>Account</Text>
            <Text style={styles.amountText}>Amount</Text>
          </View>
          <FlatList data={financeData.funds} renderItem={renderItem} />
          <Text style={styles.sum}>Total : {funds}</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#1b2434',
            marginTop: '1%',
          }}>
          Debts
        </Text>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.accountText}>Account</Text>
            <Text style={styles.amountText}>Amount</Text>
          </View>
          <FlatList data={financeData.debts} renderItem={renderItemDebt} />
          <Text style={styles.sum}>Total : {debts}</Text>
        </View>
      </View>
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
    borderColor: '#1b2434',
    // backgroundColor: '#1b2434',
  },
  date: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
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
    borderBottomColor: '#1b2434',
    borderBottomWidth: 1,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: '2%',
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
    borderTopColor: '#1b2434',
    color: '#1b2434',
  },
});

export default Card;
