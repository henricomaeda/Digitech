import React, {useState} from 'react';
import {
	Text,
	View,
	Image,
	Alert,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Acesso=({navigation}) => {
	const [username, setUsername]=useState("");
	const [password, setPassword]=useState("");
	
	async function getToken() {
		SecureStore.setItemAsync("carrinhoProdutos", "");
		
		var i = null;
		var tempToken = "";
		var caracters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for (i = 0; i != 27; i++) tempToken += caracters.charAt(Math.floor(Math.random() * caracters.length));
		return tempToken;
	}
	
	async function acesso() {
		const resp = await fetch('https://demo6799411.mockable.io/acesso', {method: 'POST'});
		const data = await resp.json();
		if (username == data.username) {
			if (password == data.password) {
				console.log("TOKEN: " + getToken());
				navigation.dispatch(StackActions.replace('Menu', {carrinhoParam: false}));
			} else Alert.alert('Acesso negado', "A senha está incorreta!");
		} else Alert.alert('Acesso negado', "O usuário está incorreto!");
	}
	
	return (
		<View style={{backgroundColor: global.BGCOLOR, flex: 1}}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<View
					style={{
						flex: 1.5,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Image
						style={{height: 200, width: 200, borderRadius: 100}} 
						source={require("../assets/digitech.png")}
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<TextInput
						style={styles.entrada}
						placeholder = "Nome de usuário"
						onChangeText={text => setUsername(text)}
						value={username}
					/>
					
					<TextInput
						style={styles.entrada}
						placeholder = "Senha"
						onChangeText={text => setPassword(text)}
						value={password}
						secureTextEntry={true}
					/>
					
					<TouchableOpacity
						style={{
							alignItems: 'center',
							backgroundColor: '#1f3447',
							borderRadius: 10,
							marginTop: 10,
							padding: 10,
							width: 280,
						}}
						onPress={() => acesso()}>
						<Text style={{color: "white", fontWeight: "bold"}}>
							Conectar
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

export default Acesso;
const styles=StyleSheet.create({
	entrada: {
		color: 'gray',
		borderWidth: 2,
		borderColor: '#1f3447',
		borderRadius: 10,
		padding: 6,
		width: 280,
		marginTop: 10,
		backgroundColor: 'white',
	}
});