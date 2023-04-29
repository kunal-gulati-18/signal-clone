import AddChatScreen from '../screens/AddChatScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export const privateRoute = () => {
	return [
		{
			name: 'Home',
			component: HomeScreen,
			options: {}
		},
		{
			name: 'AddChatScreen',
			component: AddChatScreen,
			options: {}
		},
		{
			name: "Chat", 
			component: ChatScreen,
			options: {
				headerBackTitleVisible: false
			}
		}
	];
};
