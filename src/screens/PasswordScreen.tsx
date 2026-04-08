import { useState, useEffect } from "react"
import { TextInput, View, Button } from "react-native"
import { savePassword } from "../utils/secureStorage"

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";

type PasswordScreenProps = NativeStackScreenProps<StackParamList, "Home">;

// Ecran qui permet à l'utilisateur de définir son mot de passe 
// à la première connection

export default function PasswordScreen({navigation, route}: PasswordScreenProps) {
    const [password, setPassword] = useState<string>('')
    const [passwordValidate, setPasswordValidate] = useState<string>('') 
    const [arePasswordsValid, setArePasswordsValid] = useState<boolean>(true)

    useEffect(()=>{
        setArePasswordsValid(
            password===passwordValidate && password.length>0
        )
    }, [password, passwordValidate])

    const submitPassword = async () => {
        await savePassword(password)
        navigation.navigate('ListScreen')
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <TextInput 
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />
            <TextInput 
            placeholder="Confirm password"
            value={passwordValidate}
            onChangeText={setPasswordValidate}
            secureTextEntry={true}
            />
            <Button 
                title='Set password'
                onPress={submitPassword}
                disabled={!arePasswordsValid}
            />

        </View>
    )

}