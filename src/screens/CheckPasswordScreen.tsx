import { View,TextInput,Button } from "react-native"
import { useState } from "react"
import { checkPassword } from "../utils/secureStorage";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";

type CheckPasswordScreenProps = NativeStackScreenProps<StackParamList, "Home">;

export default function CheckPasswordScreen({navigation, route}: CheckPasswordScreenProps) {
    const [password,setPassword] = useState(""); 
    const [isError,setIsError] = useState<boolean>(false)
    const handleSubmit =  async ()=>{
        const isPasswordValid = await checkPassword(password);
        setIsError(!isPasswordValid)
        if(isPasswordValid) {
            navigation.navigate("ListScreen")
        }
    }
    return (<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TextInput 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true}
            placeholder={isError? "Incorrect password, please enter your password again": "Enter your password"}
        />
        <Button title="Submit" onPress={handleSubmit}/>
    </View>) 

}