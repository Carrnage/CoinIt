import SQLite from 'react-native-sqlite-storage';
import {Registration} from './Registration'

// Open a SQLite database or create one if it doesn't exist
const db = SQLite.openDatabase({ 
  name: 'CoinIt.db', 
  createFromLocation: '~CoinIt.db' });

// Create a table
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName text, email TEXT, password text, phone text, account text)',
    'CREATE TABLE IF NOT EXISTS Payment (id INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName text, email TEXT, password text, phone text, account text)'
  
    );
});

// Insert data into the table
db.transaction(tx => {
  tx.executeSql('INSERT INTO Users (name, email) VALUES (?, ?)', ['John Doe', 'john@example.com']);
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
