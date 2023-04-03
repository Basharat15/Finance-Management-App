import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Card from '../components/card';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState([[]]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState({error: false, msg: ''});
  const [dataNotFound, setDataNotFound] = useState(false);
  console.log('data', data);
  // console.log('length', data);
  const handleDateChange = text => {
    // Remove any non-numeric characters
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Format the date string
    let formattedDate = '';
    if (cleanedText.length > 2) {
      formattedDate += cleanedText.substr(0, 2) + '-';
      formattedDate += cleanedText.substr(2, 2) + '-';
      formattedDate += cleanedText.substr(4, 4);
    } else if (cleanedText.length > 0) {
      formattedDate += cleanedText.substr(0, 2) + '-';
      formattedDate += cleanedText.substr(2, cleanedText.length - 2);
    }

    setDate(formattedDate);
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);
  const applyingFilter = () => {
    if (date.length < 10) {
      setError({error: true, msg: 'Please enter a valid date'});
    } else {
      setDataNotFound(false);
      setError({error: false, msg: ''});
      setLoading(true);
      const filteredData = data.filter(item => item._data.date == date);
      setFilteredData(filteredData);
      setLoading(false);
      if (filteredData.length == 0) {
        setDataNotFound(true);
      }
      setDate('');
    }
  };
  const getDataFromFirebase = async () => {
    setLoading(true);
    setDataNotFound(false);
    const dataFromDb = await firestore().collection('FinancialDetails').get();
    setData(dataFromDb.docs);
    let newArray = [];
    const lastItem = dataFromDb.docs[dataFromDb.docs.length - 1];
    const secondLastItem = dataFromDb.docs[dataFromDb.docs.length - 2];
    const thirdLastItem = dataFromDb.docs[dataFromDb.docs.length - 3];
    if (lastItem.data().date === secondLastItem.data().date) {
      newArray.push(lastItem);
      newArray.push(secondLastItem);
      setLatestData(newArray);
      setLoading(false);
    } else if (secondLastItem.data().date === thirdLastItem.data().date) {
      newArray.push(secondLastItem);
      newArray.push(thirdLastItem);
      setLatestData(newArray);
      setLoading(false);
    } else {
      newArray.push(lastItem);
      setLatestData(newArray);
      setLoading(false);
    }
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
  if (dataNotFound) {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: '1%'}}>
            <TextInput
              placeholder="DD-MM-YYYY"
              keyboardType="numeric"
              placeholderTextColor="#d3d2ce"
              maxLength={10}
              value={date}
              onChangeText={handleDateChange}
              style={{
                borderWidth: 1,
                paddingRight: '64%',
                paddingVertical: '2%',
                borderRadius: 5,
                color: '#d3d2ce',
                borderColor: '#1b2434',
              }}
            />
          </View>
          <TouchableOpacity
            style={{marginTop: '2.5%'}}
            onPress={applyingFilter}>
            <Image source={require('../assets/search.png')} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            justifyContent: 'center',
            marginTop: '40%',
            alignSelf: 'center',
          }}>
          Data Not Found
        </Text>
        <View style={{paddingHorizontal: '20%'}}>
          <Button
            title="Click Here To Go Back"
            onPress={getDataFromFirebase}
            style={{alignSelf: 'center', width: '10%'}}
          />
        </View>
      </View>
    );
  }
  const renderItem = ({item}) => {
    return <Card financeData={item._data} />;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getDataFromFirebase}>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', color: '#1b2434'}}>
          Click to Refresh
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: '1%'}}>
          <TextInput
            placeholder="DD-MM-YYYY"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={10}
            value={date}
            onChangeText={handleDateChange}
            style={{
              borderWidth: 1,
              paddingRight: '64%',
              paddingVertical: '2%',
              borderRadius: 5,
              borderColor: '#1b2434',
              color: 'black',
            }}
          />
        </View>
        <TouchableOpacity style={{marginTop: '2.5%'}} onPress={applyingFilter}>
          <Image source={require('../assets/search.png')} />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={{color: '#d3d2ce', marginLeft: '2%', fontSize: 8}}>
          {error.msg}
        </Text>
      ) : null}

      {date == '' && filteredData.length == 0 ? (
        <FlatList data={latestData} renderItem={renderItem} />
      ) : (
        <FlatList data={filteredData} renderItem={renderItem} />
      )}
    </View>
  );
};
export const screenOptions = navData => {
  return {
    headerTintColor: '#d3d2ce',
    headerStyle: {backgroundColor: '#1b2434'},
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        {/* <TouchableOpacity
          onPress={() => {
            navData.navigation.navigate('Financial Details');
          }}>
          <Text style={{color: '#d3d2ce', fontWeight: 'bold'}}>Refresh</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            navData.navigation.navigate('Add Data');
          }}>
          <Text
            style={{
              color: '#d3d2ce',
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            Add Data
          </Text>
        </TouchableOpacity>
      </View>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2%',
    backgroundColor: 'white',
    paddingBottom: '30%',
  },
});

export default Dashboard;
