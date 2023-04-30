import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar, Input } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { userSelector } from '../reducers/userSlice';
import { checkDefinedValue } from '../utils';
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const ChatScreen = () => {
	const user = useSelector(userSelector);
	const navigation = useNavigation();
	const { params } = useRoute();
	const chatsRef = doc(db, 'chats', params.id);
	const messagesRef = collection(chatsRef, 'messages');

	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	const onSendMessage = () => {
		if (!checkDefinedValue(input)) return;

		Keyboard.dismiss();

		addDoc(messagesRef, {
			message: input,
			timestamp: Timestamp.now(),
			displayName: user.displayName,
			email: user.email,
			photoUrl: user.photoUrl || '',
		}).then((response) => {});
		setInput('');
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: params.chatName,
			headerBackTitleVisible: false,
			headerAlign: 'left',
			headerTitle: () => (
				<View className="flex-row items-center space-x-4">
					<View>
						<TouchableOpacity activeOpacity={0.5}>
							<Avatar
								rounded
								source={{
									uri: user.photoURL,
								}}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<Text className="text-white font-bold">{params.chatName}</Text>
					</View>
				</View>
			),
			headerRight: () => (
				<View className="flex-row space-x-4">
					<TouchableOpacity>
						<FontAwesome name="video-camera" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	useEffect(() => {
		const unSubscribe = onSnapshot(messagesRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			data.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
			setMessages(
				data
			);
		});

		return unSubscribe;
	}, []);

	console.log('messges', messages)

	return (
		<SafeAreaView className="h-full w-full">
			<KeyboardAvoidingView
				className="flex-1"
				keyboardVerticalOffset={90}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<>
							<ScrollView showsVerticalScrollIndicator={false}>
								{messages.map((message) =>
									message.email === user.email ? (
										<View
											key={message.id}
											className="w-full mt-2 mb-4 flex-row justify-end"
										>
											<View className="p-3 bg-[#ececec] rounded-full flex-row items-center space-x-2 relative mr-2">
												<Avatar
													source={{
														uri:
															message.photoUrl ||
															'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
													}}
													rounded
													size={22}
													containerStyle={{
														position: 'absolute',
														right: 0,
														bottom: -15,
													}}
												/>
												<Text className="font-semibold text-left">
													{message.message}
												</Text>
											</View>
										</View>
									) : (
										<View
											key={message.id}
											className="w-full mt-2 mb-4 flex-row justify-start"
										>
											<View className="p-3 bg-[#2b68e6] items-center flex-row space-x-2 ml-2">
												<Avatar
													source={{
														uri:
															message.photoUrl ||
															'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg',
													}}
													rounded
													containerStyle={{
														position: 'absolute',
														left: 0,
														bottom: -15,
													}}
												/>
												<Text className="font-semibold">{message.message}</Text>
											</View>
										</View>
									)
								)}
							</ScrollView>
							<View className="flex-row w-full justify-between px-2 items-start">
								<View className="w-11/12">
									<Input
										className="rounded-full"
										inputContainerStyle={{
											borderBottomWidth: 0,
											padding: 0,
											margin: 0,
										}}
										underlineColorAndroid="transparent"
										style={{
											borderColor: 'transparent',
											borderWidth: 1,
											backgroundColor: '#ececec',
											borderRadius: 30,
											padding: 10,
											color: 'gray',
											height: 40,
											bottom: 0,
											flex: 1,
											position: 'relative',
											margin: 0,
										}}
										placeholder="Enter message"
										value={input}
										onChangeText={(text: string) => setInput(text)}
									/>
								</View>
								<View className="flex-row items-center top-2">
									<TouchableOpacity activeOpacity={0.5} onPress={onSendMessage}>
										<Ionicons name="send-sharp" size={24} color="#2b68e6" />
									</TouchableOpacity>
								</View>
							</View>
						</>
					</TouchableWithoutFeedback>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
