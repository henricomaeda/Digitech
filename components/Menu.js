import React, {useState} from 'react';
import {
	Text,
	View,
	Alert,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Menu=({navigation, route}) => {
	const [certain, setCertain]=useState(false);
	
	async function verificarCarrinho(tipoVerificacao) {
		let result = await SecureStore.getItemAsync("carrinhoProdutos");
		if (tipoVerificacao == "Carrinho") {
			if (result) navigation.dispatch(StackActions.replace('Carrinho', {carrinhoParam : false}));
			else Alert.alert('', 'Não há produtos no carrinho!');
		} else {
			if (result) setCertain(true);
			else navigation.dispatch(StackActions.replace('Acesso'));
		}
	}
	
	return (
		<View style={{backgroundColor: global.BGCOLOR, flex: 1}}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				{certain ? (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Text style={{fontWeight: 'bold', color: 'white'}}>
							Você tem certeza que deseja se desconectar?
						</Text>
						<Text style={{marginBottom: 30, color: 'white'}}>
							Ainda há produtos no seu carrinho.
						</Text>
						<View style={{
							flexDirection: 'row',
							alignSelf: 'center',
							alignItems: 'center'}}>
							<TouchableOpacity
								style={{
									alignItems: 'center',
									alignSelf: 'center',
									backgroundColor: '#1f3447',
									padding: 10,
									width: 142,
									borderRadius: 10,
									marginRight: 10,
								}}
								onPress={() => setCertain(false)}>
								<Text style={{color: "white", fontWeight: 'bold'}}>
									Retornar
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									alignItems: 'center',
									alignSelf: 'center',
									backgroundColor: '#1f3447',
									padding: 10,
									width: 142,
									borderRadius: 10,
								}}
								onPress={() => navigation.dispatch(StackActions.replace('Acesso'))}>
								<Text style={{color: "white", fontWeight: 'bold'}}>
									Tenho certeza
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View style={{flex: 1}}>
						<View
							style={{
								flex: 1.5,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Image
								style={{height: 240, width: 240, borderRadius: 160}} 
								source={require("../assets/digitech.png")}
							/>
						</View>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<TouchableOpacity
								style={{
									alignItems: 'center',
									backgroundColor: '#1f3447',
									borderRadius: 10,
									marginTop: 10,
									padding: 10,
									width: 280,
								}}
								onPress={() => navigation.dispatch(StackActions.replace('Produtos', {clearParam: false, updateParam: null}))}>
								<Text style={{color: 'white', fontWeight: "bold"}}>
									Produtos
								</Text>
							</TouchableOpacity>
							
							<TouchableOpacity
								style={{
									alignItems: 'center',
									backgroundColor: '#1f3447',
									borderRadius: 10,
									marginTop: 10,
									padding: 10,
									width: 280,
								}}
								onPress={() => verificarCarrinho("Desconectar")}>
								<Text style={{color: 'white', fontWeight: "bold"}}>
									Desconectar
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

export default Menu;