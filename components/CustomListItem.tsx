import { ListItem, Avatar } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';

const CustomListItem = ({ id, chatName, enterChat }: { chatName: string; id: string; enterChat: (x: any) => void; }) => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: 800 }}>MSD</ListItem.Title>
				<ListItem.Subtitle
					numberOfLines={1}
					ellipsizeMode="tail"
				>
                    Hello this is a beautifuk day please come aloing and enjoy
                </ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;
