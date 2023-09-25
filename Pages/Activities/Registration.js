import React from 'react';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Text } from '@chakra-ui/react';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ 
  name:'CoinIt.db', 
  location:'default',
  },
  (sqlTnx, reg)=>{
    console.log("Table has been created successful");
  },
  error=>{
    console.log("Error in creating database"+error.message);
  });

export default function Registration() {

  //const[userID,setUserID]= useState(1);
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[gender,setGender]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[pin,setPin]=useState('');
  const[phone,setPhone] = useState('');
  const[account,setAccount]=useState('');

  useEffect(() => {
    createUserTable();
}, []);

  const createUserTable =async()=> {
   await db.transaction(async (tx) => {
    await tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      +"Users "
      +"(id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName varchar(20), LastName varchar(20), Email varchar(30),"
      +"Password varchar(15), Phone varchar(11), Account varchar(15))",
      [],
      (sqlTnx, reg)=>{
        console.log("Table has been created successful");
      },  
      error=>{
        console.log("Error in creating table"+error.message);
      },);
  })};

const AddUsers=()=>{
  if(firstName.length==0||lastName.length==0||gender.length==0||email.length==0||password.length==0||phone.length==0||account.length==0){
    alert("Please input valid user information!");
    return false;
  }
  db.transaction(tx => {
    tx.executeSql('INSERT INTO Users (FirstName, LastName, Email, Password, Phone, Account) VALUES (?,?,?,?,?,?)', [firstName,lastName,gender,email,password,phone,account]);
  (sqlTnx,reg)=>{
     console.log('${firstName} has been added successful');
     getFirstName();
     setFirstName("");
  },
  error=>{
    console.log("error on adding a user " + error.message);
  }});
}



  return (
    <View>
      <Text fontSize='5xl'>User Information</Text>
      <View>
      {/* <TextInput
        placeholder=""
        value={userID}
        onChangeText={setUserID}
      /> */}

       <TextInput
         style={styles.input}
        placeholder="Enter your FirstName"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your LastName"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       <TextInput
        style={styles.input}
        placeholder="Enter your PIN"
        value={password}
        onChangeText={setPin}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Account"
        value={account}
        onChangeText={setAccount}
      />
      <Button title="Submit" onPress={AddUsers} />
    </View>
    </View>
  )
}
