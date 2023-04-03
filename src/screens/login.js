import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Theme from '../utils/theme';
import Input from '../components/input';
import CustomButton from '../components/customButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const loginHandler = async () => {
    if (!password) {
      Alert.alert('Please enter password!');
      return;
    }
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // console.log('user', user);
        if (user) {
          setLoading(false);
          navigation.navigate('Financial Details');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('Err', err);
        Alert.alert('Error', err.message);
      });
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
    <View style={styles.container}>
      <Text style={styles.headingText}>Login to get started</Text>
      <View style={styles.centerContainer}>
        <Input placeHolder={email} onChangeText={setEmail} editable={false} />
        <Input
          placeHolder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <CustomButton title="Login" onPress={loginHandler} />
      </View>
      {/* <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don't have account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Candidate Register');
          }}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  headingText: {
    textAlign: 'center',
    color: '#1b2434',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: '30%',
    marginBottom: '10%',
  },
  centerContainer: {
    width: '85%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    shadowColor: '#000000',
    elevation: 2,
    borderRadius: 2,
  },
  bottomContainer: {
    marginTop: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 17,
  },
  registerText: {
    color: Theme.primary,
    fontSize: 17,
  },
});
export default Login;
