import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button, Input } from '@rneui/themed';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { checkDefinedValue } from '../utils';

const AddChatScreen = () => {
	const navigation = useNavigation();
	const [chatName, setChatName] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const onChangeChatName = (value: string) => setChatName(value);

	const onAddChatName = () => {
		if (!checkDefinedValue(chatName)) return alert('Please add a chat name.');
		setLoading(true);
		setDoc(doc(collection(db, 'chats')), {
			chatName,
		})
			.then(() => {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Home' }],
				});
			})
			.catch((err) => {
				alert(err);
				setLoading(false);
			});
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add a new chat',
			headerBackTitle: 'Chats',
		});

		return () => {
			
		}
	}, [navigation]);

	return (
		<View className="p-4">
			<Input
				leftIcon={<AntDesign name="wechat" size={24} color="gray" />}
				value={chatName}
				placeholder="Enter chat name"
				onChangeText={onChangeChatName}
				disabled={loading}
			/>
			<Button
				loading={loading}
				title="Create new chat"
				onPress={onAddChatName}
			/>
		</View>
	);
};

export default AddChatScreen;
