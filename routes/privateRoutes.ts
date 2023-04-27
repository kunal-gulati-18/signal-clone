import AddChatScreen from '../screens/AddChatScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export const privateRoute = () => {
	return [
		{
			name: 'Home',
			component: HomeScreen,
		},
		{
			name: 'AddChatScreen',
			component: AddChatScreen,
		},
	];
};
