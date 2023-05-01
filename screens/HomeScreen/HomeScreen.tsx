import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
	SafeAreaView,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	AntDesign,
	Ionicons,
	Feather,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { userSelector } from '../../reducers/userSlice';
import CustomListItem from '../../components/CustomListItem';
import { Avatar } from '@rneui/themed';
import { signOut } from 'firebase/auth';
import { auth, collection, db } from '../../firebase';
import { setUser } from '../../reducers/userSlice';
import { getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
// import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const [chats, setChats] = useState<{ chatName: string }[]>([]);
	const navigation = useNavigation();
	const chatsRef = query(
		collection(db, 'chats'),
		orderBy('created_at', 'asc'),
		where('user_id', '==', `${user.uid}`)
	);

	console.log('user', user);

	const onSignOut = () => {
		signOut(auth).then(() => {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Login' }],
			});
			dispatch(setUser(null));
		});
	};

	const onAddChat = () => {
		navigation.navigate('AddChatScreen');
	};

	const onEnterChat = (id: string, chatName: string) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		});
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Signal',
			headerStyle: {
				backgroundColor: 'white',
			},
			headerTitleStyle: {
				color: 'black',
			},
			headerLeft: () => (
				<TouchableOpacity activeOpacity={0.5} onPress={onSignOut}>
					<Avatar
						rounded
						source={{
							uri:
								user?.photoURL ||
								'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
						}}
					/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View className="flex-row space-x-4">
					<TouchableOpacity>
						<Feather name="camera" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={onAddChat}>
						<MaterialCommunityIcons
							name="pencil-outline"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(chatsRef, (responseSnapshot) => {
			setChats(
				responseSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});

		return unsubscribe;
	}, []);

	console.log('chats', chats);

	return (
		<SafeAreaView className="h-full">
			<ScrollView showsVerticalScrollIndicator={false}>
				{chats?.length
					? chats.map((chat: { chatName: string; id: string }) => (
							<CustomListItem
								key={chat.id}
								id={chat.id}
								chatName={chat.chatName}
								enterChat={onEnterChat}
							/>
					  ))
					: null}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
