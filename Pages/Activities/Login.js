import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabase({ 
  name:'CoinIt.db', 
  location:'default',
  },
  (sqlTnx, reg)=>{
    console.log("Database has been created successful");
  },
  error=>{
    console.log("Error in creating database"+error.message);
  });

export default function LoginScreen({ navigation }) {
  const [loginDTO, setLoginDTO] = useState({
    id: "AuthRequest",
    email: "default",
    password: "default",
  });

  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');
  const [isUser,setIsUser]=useState(false);

  useEffect(() => {
    getUserData();
}, []);

const getUserData=()=>{
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Users', [], 
    (tx, results) => {
      const len = results.rows.length;
      for (let i = 0; i < len; i++) {
        const row = results.rows.item(i);
        //console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
        if(results.rows.item(i).email==email&&results.rows.item(i).password==password){
            isUser=true;
        }
      }
    });
  });
}

  function handleLogin() {
    // console.log(loginDTO);
    // switch(loginDTO.email){
    //   case 'debug':
    //     console.log("debug log in if seen outside test build PANIC");
    //     navigation.navigate("CoinIt - Pin");
    //   default:
    //     console.log("login failed try to debug")
    //     break;
    // }
    if(!isUser){
      navigation.navigate("CoinIt-Registration");
    }
    navigation.navigate("CoinIt-Pin");
  }




  return (
    <View style={[{flexDirection:'column'},styles.container]}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View>
        <Text>Email</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          // onChangeText={(setEmail) =>
          //   setLoginDTO((loginDTO) => ({
          //     ...loginDTO,
          //     email: setEmail,
          //  }))}
          onChangeText={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          enterKeyHint="enter"
          // onChangeText={(setPassword) =>
          //   setLoginDTO((loginDTO) => ({
          //     ...loginDTO,
          //     password: setPassword,
          //   }))}
          onChangeText={setPassword}
        />
        <Button
          title="Login"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}
