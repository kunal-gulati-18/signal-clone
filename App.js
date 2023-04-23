import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoute } from './routes/publicRoutes';
import { privateRoute } from './routes/privateRoutes';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					{publicRoute().map((route) => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							options={{
								headerStyle: {
									backgroundColor: "#2c6bed"
								},
								headerTitleStyle: {
									color: "white"
								},
								headerTintColor: "white"
							}}
						/>
					))}
					{privateRoute().map((route) => (
						<Stack.Screen
							name={route.name}
							component={route.component}
							options={{
								headerShown: false,
							}}
						/>
					))}
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
