import React from 'react';
import {Alert, Button, TextInput, View, StyleSheet} from 'react-native';
import {styles} from './../../components/Styles';
import {AuthContext} from './AuthContext';

const LoginScreen = ({navigation}) => {
    const {signIn} = React.useContext(AuthContext);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onLogin = () => {
        Alert.alert('Credentials', `${username} + ${password}`);
        signIn({
            id: username
        })
    };

    return <View style={styles.container}>
        <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder={'Username'}
            style={styles.input}
        />
        <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
        />

        <Button
            title={'Login'}
            style={styles.input}
            onPress={onLogin}
        />
    </View>
};

export default LoginScreen;