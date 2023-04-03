import React, {useState, useCallback} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native';
import {FlatList} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import storage from '@react-native-firebase/storage';
import DocumentPicker, {types} from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';

const Loans = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [fileResponse, setFileResponse] = useState([]);
  const [renderData, setRenderData] = useState([1]);
  const [renderDebtsData, setRenderDebtsData] = useState([1]);
  const [fundAccount, setFundAccount] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [fundFile, setFundFile] = useState('');
  const [debtAccount, setDebtAccount] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [funds, setFuds] = useState([]);
  const [debts, setDebts] = useState([]);
  // console.log('d', debts);
  // console.log('d', funds);
  const submitHandler = async () => {
    if (!funds) {
      Alert.alert('Please add data!');
      return;
    }
    setLoading(true);
    let timeStamp = Date.now().toString();
    let fileName = fileResponse[0].name;
    let fileLink = fileResponse[0].fileCopyUri;
    await storage()
      .ref(fileName + '/')
      .putFile(fileLink)
      .then(res => {
        console.log('uploaded');
        storage()
          .ref(fileName + '/')
          .getDownloadURL()
          .then(downloadRes => {
            setFundFile(downloadRes);
            let debtsArr = [...debts];
            debtsArr.push({
              account: debtAccount,
              amount: debtAmount,
              file: downloadRes,
            });
            setDebts(debtsArr);
            // let arr = [...renderDebtsData];
            // arr.push(1);
            // setRenderDebtsData(arr);
            setDebtAccount('');
            setDebtAmount('');
            setFundFile('');
            setFileResponse([]);
            firestore().collection('FinancialDetails').doc(timeStamp).set({
              date: date,
              funds: funds,
              debts: debtsArr,
            });
            setLoading(false);
            Alert.alert('Data Added Successfully');
          })
          .catch(err => {
            console.log('Error', err);
          });
      })
      .catch(err => {
        console.log('er', err);
      });
    setLoading(false);
    setLoading(false);
  };
  const submitFundsHandler = () => {
    setLoading(true);
    let fileName = fileResponse[0].name;
    let fileLink = fileResponse[0].fileCopyUri;
    storage()
      .ref(fileName + '/')
      .putFile(fileLink)
      .then(res => {
        console.log('uploaded');
        storage()
          .ref(fileName + '/')
          .getDownloadURL()
          .then(downloadRes => {
            setFundFile(downloadRes);
            let fundsArr = [...funds];
            fundsArr.push({
              account: fundAccount,
              amount: fundAmount,
              file: downloadRes,
            });
            setFuds(fundsArr);
            // setFundFile('');
            // setFundAccount('');
            // setFundAmount('');
            setFileResponse([]);
            setLoading(false);
            // Alert.alert('Funds Added Successfully');
          })
          .catch(err => {
            console.log('Error', err);
          });
      })
      .catch(err => {
        console.log('er', err);
      });
  };
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

  // console.log('funds', funds);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const addFundsHandler = async () => {
    if (!fundAccount) {
      Alert.alert('Please Enter Your Account!');
      return;
    }
    if (!fundAmount) {
      Alert.alert('Please Enter Amount!');
      return;
    }
    // if (!fundFile) {
    //   Alert.alert('Please Select File');
    //   return;
    // }
    // setLoading(true);
    let arr = [...renderData];
    arr.push(1);
    setRenderData(arr);
    let fileName = fileResponse[0].name;
    let fileLink = fileResponse[0].fileCopyUri;
    storage()
      .ref(fileName + '/')
      .putFile(fileLink)
      .then(res => {
        console.log('uploaded');
        storage()
          .ref(fileName + '/')
          .getDownloadURL()
          .then(downloadRes => {
            setFundFile(downloadRes);
            let fundsArr = [...funds];
            fundsArr.push({
              account: fundAccount,
              amount: fundAmount,
              file: downloadRes,
            });
            setFuds(fundsArr);

            // setFundFile('');
            // setFundAccount('');
            // setFundAmount('');
            setFileResponse([]);
            setLoading(false);
            // Alert.alert('Fund Added Successfully');
          })
          .catch(err => {
            console.log('Error', err);
          });
      })
      .catch(err => {
        console.log('er', err);
      });
  };
  const addDebtsHandler = () => {
    if (!debtAccount) {
      Alert.alert('Please Enter Your Account!');
      return;
    }
    if (!debtAmount) {
      Alert.alert('Please Enter Amount!');
      return;
    }
    // setLoading(true);
    let arr = [...renderDebtsData];
    arr.push(1);
    setRenderDebtsData(arr);
    let fileName = fileResponse[0].name;
    let fileLink = fileResponse[0].fileCopyUri;
    storage()
      .ref(fileName + '/')
      .putFile(fileLink)
      .then(res => {
        console.log('uploaded');
        storage()
          .ref(fileName + '/')
          .getDownloadURL()
          .then(downloadRes => {
            setFundFile(downloadRes);
            let debtsArr = [...debts];
            debtsArr.push({
              account: debtAccount,
              amount: debtAmount,
              file: downloadRes,
            });
            setDebts(debtsArr);

            // setDebtAccount('');
            // setDebtAmount('');
            // setFundFile('');
            setFileResponse([]);
            setLoading(false);
            // Alert.alert('Debt Added Successfully');
          })
          .catch(err => {
            console.log('Error', err);
          });
      })
      .catch(err => {
        console.log('er', err);
      });

    // let debtsArr = [...debts];
    // debtsArr.push({
    //   account: debtAccount,
    //   amount: debtAmount,
    // });
    // setDebts(debtsArr);
    // let arr = [...renderDebtsData];
    // arr.push(1);
    // setRenderDebtsData(arr);
  };
  const renderItem = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '4%',
            paddingVertical: '4%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              Account
            </Text>
            <TextInput
              placeholder="Enter your Account"
              onChangeText={setFundAccount}
              placeholderTextColor={'black'}
              style={{
                paddingHorizontal: '8%',
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: '2%',
                marginTop: '4%',
                borderRadius: 5,
                color: 'black',
              }}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              Amount
            </Text>
            <TextInput
              placeholder="Enter your Fund"
              onChangeText={setFundAmount}
              placeholderTextColor={'black'}
              keyboardType="number-pad"
              style={{
                paddingHorizontal: '8%',
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: '2%',
                marginTop: '4%',
                borderRadius: 5,
                color: 'black',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#8c8474',
            paddingVertical: '2%',
            // marginHorizontal: '4%',
            borderRadius: 5,
            width: '50%',
            alignSelf: 'center',
          }}
          onPress={handleDocumentSelection}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Select File
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderDebtsItem = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '4%',
            paddingVertical: '4%',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              Debt Account
            </Text>
            <TextInput
              placeholder="Enter your Account"
              onChangeText={setDebtAccount}
              placeholderTextColor={'black'}
              style={{
                paddingHorizontal: '8%',
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: '2%',
                marginTop: '4%',
                borderRadius: 5,
                color: 'black',
              }}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              Debt Amount
            </Text>
            <TextInput
              placeholder="Enter your Debt"
              onChangeText={setDebtAmount}
              placeholderTextColor={'black'}
              keyboardType="number-pad"
              style={{
                paddingHorizontal: '8%',
                borderWidth: 1,
                borderColor: 'black',
                paddingVertical: '2%',
                marginTop: '4%',
                borderRadius: 5,
                color: 'black',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#8c8474',
            paddingVertical: '2%',
            // marginHorizontal: '4%',
            borderRadius: 5,
            width: '50%',
            alignSelf: 'center',
          }}
          onPress={handleDocumentSelection}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Select File
          </Text>
        </TouchableOpacity>
      </View>
    );
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
  return (
    <ScrollView>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: 'black',
          marginTop: '2%',
          paddingHorizontal: '4%',
        }}>
        Date
      </Text>
      <View style={{padding: '1%'}}>
        <TextInput
          placeholder="DD-MM-YYYY"
          keyboardType="numeric"
          placeholderTextColor="black"
          maxLength={10}
          value={date}
          onChangeText={handleDateChange}
          style={{
            borderWidth: 1,
            paddingRight: '64%',
            paddingVertical: '2%',
            borderRadius: 5,
            color: 'black',
            borderColor: '#1b2434',
          }}
        />
      </View>
      <View style={{}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            color: 'black',
          }}>
          Enter Funds Below
        </Text>
      </View>
      <FlatList data={renderData} renderItem={renderItem} />
      <TouchableOpacity
        style={{
          backgroundColor: '#d3d2ce',
          paddingVertical: '2%',
          marginHorizontal: '4%',
          borderRadius: 5,
          marginTop: '2%',
        }}
        onPress={addFundsHandler}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          Add more funds
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#1b2434',
          paddingVertical: '3%',
          marginHorizontal: '4%',
          borderRadius: 5,
          marginTop: '2%',
        }}>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}
          onPress={submitFundsHandler}>
          Submit All Funds
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: '2%'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            color: 'black',
          }}>
          Enter Debts Below
        </Text>
      </View>
      <FlatList data={renderDebtsData} renderItem={renderDebtsItem} />
      <TouchableOpacity
        style={{
          backgroundColor: '#d3d2ce',
          paddingVertical: '2%',
          marginHorizontal: '4%',
          borderRadius: 5,
          marginTop: '2%',
        }}
        onPress={addDebtsHandler}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          Add more debts
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#1b2434',
          paddingVertical: '3%',
          marginHorizontal: '4%',
          borderRadius: 5,
          marginTop: '2%',
        }}>
        <Text
          style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}
          onPress={submitHandler}>
          Submit All Debts
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Loans;
