import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const Stack = createNativeStackNavigator();


export default function RegistrationScreen({ navigation }) {

  const[userID,setUserID]= useState(1);
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[gender,setGender]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[phone,setPhone] = useState('');
  const[account,setAccount]=useState('');



  
    handleRegistration=()=>{

    }

  return (
    <View>
      <Text fontSize='5xl'>Registration</Text>
      <View>
      <TextInput
        placeholder=""
        value={userID}
        onChangeText={setUserID}
      />

       <TextInput
        placeholder="Enter your FirstName"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Enter your LastName"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Enter your Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Enter your Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Enter your Account"
        value={account}
        onChangeText={setAccount}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
    </View>
  )
}
