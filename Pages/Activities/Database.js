import SQLite from 'react-native-sqlite-storage';
import {Registration} from './Registration'

// Open a SQLite database or create one if it doesn't exist
const db = SQLite.openDatabase({ 
  name: 'CoinIt.db', 
  createFromLocation: '~CoinIt.db' });

// Create a table
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName varchar(20), LastName varchar(20), email varchar(30), password varchar(15), phone varchar(11), account varchar(15))',
  //  'CREATE TABLE IF NOT EXISTS Payment (id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName text, email TEXT, password text, phone text, account text)',
    [],
    (sqlTnx, reg)=>{
      console.log("Table has been created successful");
    },
    
    error=>{
      console.log("Error in creating table"+error.message);
    },);
});

// Insert data into the table
const addUsers=()=>{
  if(!userID||!firstName||!lastName||!gender||!email||!password||!phone||!account){
    alert("Enter user's information");
    return false;
  }


}

db.transaction(tx => {
  tx.executeSql('INSERT INTO Users (name, email) VALUES (?,?,?,?,?,?,?,?)', [userID, firstName,lastName,gender,email,password,phone,account]);
(sqlTnx,reg)=>{
   console.log('${firstName} has been added successful');
   getFirstName();
   setFirstName("");
},
error=>{
  console.log("error on adding a user " + error.message);
}

});

// Fetch data from the table
db.transaction(tx => {
  tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
    const len = results.rows.length;
    for (let i = 0; i < len; i++) {
      const row = results.rows.item(i);
      console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
    }
  });
});
