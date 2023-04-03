import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import Card from '../components/card';
import firestore from '@react-native-firebase/firestore';

const Payments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDataFromFirebase();
  }, []);
  const applyingFilter = () => {
    const filteredData = data.filter(item => item._data.date == selectedDate);
    setFilteredData(filteredData);
  };
  const getDataFromFirebase = async () => {
    const dataFromDb = await firestore().collection('FinancialDetails').get();
    setData(dataFromDb.docs);
    const dates = dataFromDb.docs.map(item => item._data.date);
    setDates(dates);
    setLoading(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }
  const renderItem = ({item}) => {
    return <Card financeData={item._data} />;
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: 'red',
            paddingHorizontal: '5%',
            paddingVertical: '1%',
            marginTop: '2%',
            borderRadius: 5,
          }}>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
            All Transactions With Details
          </Text>
        </View>
      </View>
      <FlatList
        data={selectedDate == '' ? data : filteredData}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2%',
    paddingBottom: '15%',
  },
});

export default Payments;
