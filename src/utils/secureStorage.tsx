import AsyncStorage from "@react-native-async-storage/async-storage";

// ATTENTION : JAMAIS DANS UN VRAI PROJET 
// on passerait par une variable d'environnement (par exemple avec react-native-dotenv)

export function hashPassword(password: string) {
  const salted = 'SN_SALT_2024::' + password;
  let hash = 5381;
  for (let i = 0; i < salted.length; i++) {
    hash = (hash * 33) ^ salted.charCodeAt(i);
    hash |= 0; 
  }
  return (hash >>> 0).toString(16); 
}

const PASSWORD_KEY: string = 'app_password_hash'; 

export async function savePassword(password: string) {
    await AsyncStorage.setItem(PASSWORD_KEY, hashPassword(password))
}

export async function isPasswordSet() {
    const stored = await AsyncStorage.getItem(PASSWORD_KEY)
    return stored!==null; 
}

export async function checkPassword(password: string) {
    const stored = await AsyncStorage.getItem(PASSWORD_KEY)
    if (!stored) return false; 
    return stored == hashPassword(password); 
}

