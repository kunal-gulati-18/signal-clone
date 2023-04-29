import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoute } from './routes/publicRoutes';
import { privateRoute } from './routes/privateRoutes';
import { useSelector } from 'react-redux';
import { userSelector } from './reducers/userSlice';

const Stack = createNativeStackNavigator();

const Routes = () => {
	const user = useSelector(userSelector);

	return (
		<NavigationContainer>
			<Stack.Navigator
			initialRouteName='Home'
			>
				{!user &&
					publicRoute().map((route) => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							options={{
								headerStyle: {
									backgroundColor: '#2c6bed',
								},
								headerTitleStyle: {
									color: 'white',
								},
								headerTintColor: 'white',
							}}
						/>
					))}
				{user &&
					privateRoute().map((route) => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							options={{
								headerStyle: {
									backgroundColor: '#2c6bed',
								},
								headerTitleStyle: {
									color: 'white',
								},
								headerTintColor: 'white',
								...route.options
							}}
						/>
					))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
