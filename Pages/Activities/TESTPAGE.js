import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, TextInput, View, Text, TouchableOpacity, ScollView, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { render } from 'react-dom';


const Stack = createNativeStackNavigator();
/*const db = SQLite.openDatabase('db.testDb')
class tester extends React.Component {
    constructor(props) {
        this.state = {
            data: null
        }
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
            )
        })
        this.fetchData() //
    }
    
}
fetchData = () => {
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM items', null, // passing sql query and paramaters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, {rows: {_array} }) => this.setState({data: _array})
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) //end executeSQL
    }) // end transaction
}

export default function TESTPAGE1({ navigation }) {
    
    return (
        <View>
            <Text>Add Random Name with Counts</Text>
            <TouchableOpacity onPress={this.newItem}>
                <Text >Add New Item</Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    this.state.data && this.state.data.map(data =>
                    (
                        <View key={data.id}>
                            <Text>{data.text} - {data.count}</Text>
                            <TouchableOpacity onPress={() => this.increment(data.id)}>
                                <Text> + </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onpress={() => this.delete(data.id)}>
                                <Text> DEL </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}
*/
export default function TESTPAGE1({ navigation }) {
    return (
        <View>
            <Text>Hello world</Text>
        </View>
    )
}