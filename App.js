import React, {useState} from 'react';
import {View, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Acesso from './components/Acesso';
import Menu from './components/Menu';
import Produtos from './components/Produtos';
import Carrinho from './components/Carrinho';

import {StackActions} from '@react-navigation/native';
const Stack=createStackNavigator();
global.BGCOLOR = '#6D8EAD';

const App=() => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Acesso"
				screenOptions={({navigation}) => ({
					headerStyle: {backgroundColor: '#1f3447'},
					headerTintColor: 'white',
					headerTitleStyle: {fontWeight: 'bold'},
					headerLeft: () => (
						<TouchableOpacity
							style={{marginLeft: 10}}
							onPress={() => navigation.dispatch(StackActions.replace('Menu'))}>
							<Icon name='home' color='white' />
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity
							style={{marginRight: 20}}
							onPress={() => navigation.dispatch(StackActions.replace('Carrinho', {carrinhoParam: false}))}>
							<Icon name='shopping-cart' color='white' />
						</TouchableOpacity>
					)
				})}>
				<Stack.Screen
					name="Acesso"
					component={Acesso}
					options={{
						title: 'DIGITECH ©',
						headerLeft: null,
						headerRight: null
					}}
				/>
				
				<Stack.Screen
					name="Menu"
					component={Menu}
					options={{
						title: 'Menu Principal',
						headerLeft: null
					}}
				/>
				
				<Stack.Screen
					name="Produtos"
					component={Produtos}
					options={{title: 'Produtos'}}
				/>
				
				<Stack.Screen
					name="Carrinho"
					component={Carrinho}
					options={({navigation}) => ({
						title: 'Meu carrinho',
						headerLeft: () => (
							<TouchableOpacity
								style={{marginLeft: 10}}
								onPress={() => navigation.dispatch(StackActions.replace('Produtos', {clearParam: false, updateParam: null}))}>
								<Icon name='arrow-back' color='white' />
							</TouchableOpacity>
						),
						headerRight: null
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;