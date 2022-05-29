import React, {Component, useState, useEffect} from 'react';
import {
	Alert,
	FlatList,
	StyleSheet,
	View,
	Text,
	Image,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import {StackActions} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Produtos=({navigation, route}) => {
	const [produtos, setProdutos]=useState([]);
	const [clear, setClear]=useState(route.params.clearParam);
	const [update, setUpdate]=useState(route.params.updateParam);
	const [selecionados, setSelecionados]=useState([]);
	
	useEffect(() => {!clear ? (!update ? fetchProdutos() : (fetchProdutos(), setSelecionados(update), setUpdate(false))) : limpar()}, []);

	const fetchProdutos = async () => {
		const resp = await fetch("https://demo6799411.mockable.io/produtos");
		const data = await resp.json();
		setProdutos(data);
	};
	
	async function limpar() {
		setSelecionados([]);
		SecureStore.setItemAsync("carrinhoProdutos", "");
		fetchProdutos();
		setClear(false);
		Alert.alert('Carrinho vazio', "O carrinho foi esvaziado.");
	}
	
	async function selecionarProduto(itemSel) {
		let exist = false;
		for (var i=0; i < selecionados.length; i++) {
			if (itemSel.idProduto === selecionados[i].idProduto) {
				exist = true;
				break;
			}
		}
		
		if (!exist) {
			selecionados.push({
				idProduto: itemSel.idProduto,
				nome: itemSel.nome,
				valor: itemSel.valor,
				quantidade: 0,
			});
		
			let selecionados_temp=selecionados.map(itens => (
				itens.idProduto === (itemSel.idProduto)
				? {...itens, quantidade: itens.quantidade + 1}
				: itens
			))
			
			setSelecionados(selecionados_temp);
			SecureStore.setItemAsync("carrinhoProdutos", JSON.stringify(selecionados_temp));
			Alert.alert(itemSel.nome, "O produto adicionado no carrinho.");
		} else Alert.alert(itemSel.nome, "O produto já foi adicionado no carrinho!");
	}
	
	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={{flex: 1}}>
				<ScrollView contentContainerStyle={{flexGrow: 1, padding: 12}}>
					<View>
						<FlatList
							data={produtos.produtos}
							renderItem={({item}) => (
								<TouchableOpacity onPress={() => selecionarProduto(item)}>
									<View style={{
										marginBottom: 10,
										borderLeftWidth: 1,
										borderRightWidth: 1,
										borderTopWidth: 1,
										borderBottomWidth: 1,
										borderRadius: 20,
										paddingHorizontal: 5,
										backgroundColor: item.idProduto % 2 === 0 ? '#1f3447' : 'white'}}>
										<View style={{
											paddingVertical: 12,
											flexDirection: 'row'}}>
											<View style={{
												borderRightWidth: 1,
												borderBottomWidth: 1,
												borderRadius: 10,
												marginRight: 6,
												backgroundColor: 'white',
												borderColor: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
												<View style={{
													marginLeft: 9,
													marginRight: 7,
													marginTop: 6,
													marginBottom: 6}}>
													{item.idProduto == 1 ? (
														<Image
															style={{height: 80, width: 80}}
															source={require('../assets/products/1.png')}
														/>
													) : item.idProduto == 2 ? (
														<Image
															style={{height: 80, width: 80}}
															source={require('../assets/products/2.png')}
														/>
													) : item.idProduto == 3 ? (
														<Image
															style={{height: 80, width: 80}}
															source={require('../assets/products/3.png')}
														/>
													) : item.idProduto == 4 ? (
														<Image
															style={{height: 80, width: 80}}
															source={require('../assets/products/4.png')}
														/>
													) : item.idProduto == 5 ? (
														<Image
															style={{height: 80, width: 80}}
															source={require('../assets/products/5.png')}
														/>
													) : null}
												</View>
											</View>
											<View style={{
												marginTop: 6,
												borderBottomWidth: 1,
												borderRadius: 10,
												borderColor: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
												<Text style={{
													marginLeft: 6,
													marginRight: 16,
													fontWeight: 'bold',
													color: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
													DADOS DO PRODUTO
												</Text>
												<Text style={{
													marginLeft: 6,
													color: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
													Código: 00{item.idProduto}
												</Text>
												<Text style={{
													marginLeft: 6,
													color: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
													Nome:   {item.nome}
												</Text>
												<Text style={{
													marginLeft: 6,
													marginBottom: 10,
													color: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
													Valor:     R${item.valor}
												</Text>
											</View>
										</View>
										<Text style={{
											marginBottom: 16,
											color: item.idProduto % 2 === 0 ? 'white' : '#1f3447'}}>
											Descrição: {item.descricao}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
						
						{selecionados.length > 0 ? (
							<TouchableOpacity
								style={{
									alignItems: 'center',
									alignSelf: 'center',
									backgroundColor: '#1f3447',
									borderRadius: 10,
									padding: 10,
									width: 280,
									marginTop: 6,
								}}
								onPress={() => navigation.dispatch(StackActions.replace('Carrinho', {carrinhoParam : false}))}>
								<Text style={{color: 'white', fontWeight: 'bold'}}>
									Meu carrinho
								</Text>
							</TouchableOpacity>
						) : null}

						<TouchableOpacity
							style={{
								alignItems: 'center',
								alignSelf: 'center',
								backgroundColor: '#1f3447',
								borderRadius: 10,
								padding: 10,
								width: 280,
								marginTop: 6,
							}}
							onPress={() => navigation.dispatch(StackActions.replace('Menu'))}>
							<Text style={{color: 'white', fontWeight: 'bold'}}>
								Retornar
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Produtos;