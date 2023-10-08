import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../Stylesheets/AppStyleLight";
import { useState } from "react";
import { SQLite } from "react-native-sqlite-storage";

const Stack = createNativeStackNavigator();

const db = SQLite.openDatabase({ 
  name:'CoinIt.db', 
  location:'default',
  },
  // (sqlTnx, reg)=>{
  //   console.log("Database has been created successful");
  // },
  // error=>{
  //   console.log("Error in creating database"+error.message);
  // }
  );

export default function LoginScreen({ navigation }) {
  
  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
  const [isUser,setIsUser]=useState(false);
  const[users,setUsers]= useState();
  const[message,setMessage]=useState("");
  
  const [loginDTO, setLoginDTO] = useState({
    id: "AuthRequest",
   // email: "default",
    email:{setEmail},
    password:{setPassword},
    //password: "default",
  });

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
        console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
        setUsers(row);
        // if(results.rows.item(i).email==setEmail&&results.rows.item(i).password==setPassword){
        //     setIsUser=true;
        //     console.log(isUser);
        //     console.log(setIsUser);
        // }
      }
    });
  });
}

  const handleLogin = async ()=>{
    // console.log(loginDTO);
    // switch(loginDTO.email){
    //   case 'debug':
    //     console.log("debug log in if seen outside test build PANIC");
    //     navigation.navigate("CoinIt - Pin");
    //   default:
    //     console.log("login failed try to debug")
    //     break;
    // }
    const user = users.find((u)=>u.email===email&&u.password===password);
    if(user){
      navigation.navigate("CoinIt-Pin");
    }else{
      setMessage("Invalid username or password. Please logon!");
      navigation.navigate("CoinIt-Registration")
    }
    }




  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinIt</Text>
      <StatusBar style="auto" />
      <View >
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          autoComplete="email"
          textContentType="emailAddress"
          inputMode="email"
          enterKeyHint="next"
          onChangeText={(setEmail) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              email: setEmail,
            }))
          }
        />
        <Text style={styles.spacer}>Password</Text>
        <TextInput
          style={styles.textInput}
          textContentType="password"
          secureTextEntry={true}
          enterKeyHint="enter"
          onChangeText={(setPassword) =>
            setLoginDTO((loginDTO) => ({
              ...loginDTO,
              password: setPassword,
            }))
          }
        />
        <View style={styles.spacer}/>
        <Pressable
          style={styles.button}
          onPress={sendLogin}
        ><Text style={styles.buttonText}>Login</Text></Pressable>
      </View>
    </View>
  );
}
