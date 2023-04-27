import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button, Input } from '@rneui/themed';

const AddChatScreen = () => {
	const navigation = useNavigation();
	const [chatName, setChatName] = useState<string>('');

    const onChangeChatName = (value: string) => setChatName(value);

    const onAddChatName = () => {
        collection
    }

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add a new chat',
			headerBackTitle: 'Chats',
		});
	}, [navigation]);

	return (
		<View className="p-4">
			<Input
				leftIcon={<AntDesign name="wechat" size={24} color="gray" />}
				value={chatName}
				placeholder="Enter chat name"
                onChangeText={onChangeChatName}
			/>
            <Button title="Create new chat" />
		</View>
	);
};

export default AddChatScreen;
