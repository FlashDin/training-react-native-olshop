import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext, authReducer} from './screens/login/AuthContext';
import LoginScreen from "./screens/login/LoginScreen";
import * as SecureStore from "expo-secure-store";
import {styles} from "./components/Styles";
import HomeScreen from "./screens/home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [state, dispatch] = authReducer();

    React.useEffect(() => {
        let userToken;
        try {
            userToken = SecureStore.getItemAsync('userToken');
        } catch (e) {
            // Restoring token failed
        }
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                dispatch({type: 'SIGN_IN', token: data.id});
                console.log(data);
            },
            signOut: () => {
                dispatch({type: 'SIGN_OUT'});
                SecureStore.deleteItemAsync('userToken');
            },
            signUp: async (data) => {
                dispatch({type: 'SIGN_IN', token: data.id});
            },
        }), []);

    return <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome"
                             screenOptions={{
                                 headerShown: false
                             }}
            >
                {state.userToken == null ? (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                    </>
                ) : (
                    <Stack.Screen name="Home" component={HomeScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>;
}
