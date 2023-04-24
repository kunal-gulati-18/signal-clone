import React, { useState } from 'react';
import {
	Text,
	View,
	KeyboardAvoidingView,
	Image,
	TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { Button, Input } from '@rneui/themed';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { checkDefinedValue } from '../utils';
import { auth } from '../firebase';

const RegistrationScreen = () => {
	const [inputConfig, setInputConfig] = useState({
		name: '',
		email: '',
		password: '',
		profilePicture: '',
	});

	const [errorState, setErrorState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [profilePictureLoader, setProfilePictureLoader] = useState(false);

	const [secureEntry, setSecureEntry] = useState(true);

	const onFieldChange = (key: string, value: string) => {
		setInputConfig({
			...inputConfig,
			[key]: value,
		});
	};
	const validateFields = () => {
		auth.  
	};

	const onRegisterClick = () => {};

	const onImageUpload = (image: {
		uri: string;
		type: string;
		name: string;
	}) => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'signal_clone');
		data.append('cloud_name', 'dqkkq9abg');
		data.append('api_key', '627925767214477');

		setProfilePictureLoader(true);

		fetch('https://api.cloudinary.com/v1_1/dqkkq9abg/upload', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setInputConfig({
					...inputConfig,
					profilePicture: data.secure_url,
				});
			})
			.catch((err) => {}).finally(() => {
				setProfilePictureLoader(false);
			});
	};

	const selectPhotoTapped = async () => {
		if(profilePictureLoader) return;

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setInputConfig({
				...inputConfig,
				profilePicture: '',
			});
			onImageUpload({
				uri: result.assets[0].uri,
				name: result.assets[0]?.fileName || 'test',
				type: result.assets[0].type,
			});
		}
	};

	const onToggleSecureEntry = () => setSecureEntry(!secureEntry);

	return (
		<KeyboardAvoidingView
			className="items-center flex-1 justify-center"
			behavior="padding"
		>
			<Lottie
				source={require('./assets/registration.json')}
				autoPlay
				loop
				className="h-60 w-60"
			/>
			<Input
				autoFocus
				leftIcon={<AntDesign name="user" size={20} color="gray" />}
				value={inputConfig.name}
				errorMessage={errorState?.name ? errorState?.name : null}
				placeholder="Enter name"
				onChangeText={(value: string) => onFieldChange('name', value)}
			/>
			<Input
				leftIcon={<AntDesign name="user" size={20} color="gray" />}
				value={inputConfig.email}
				errorMessage={errorState?.email ? errorState?.email : null}
				placeholder="Enter email"
				onChangeText={(value: string) => onFieldChange('email', value)}
			/>
			<Input
				leftIcon={<AntDesign name="lock" size={20} color="gray" />}
				rightIcon={
					secureEntry ? (
						<Ionicons
							onPress={onToggleSecureEntry}
							name="eye-outline"
							size={20}
							color="gray"
						/>
					) : (
						<Ionicons
							onPress={onToggleSecureEntry}
							name="eye-off-outline"
							size={20}
							color="black"
						/>
					)
				}
				value={inputConfig.password}
				errorMessage={errorState?.password ? errorState?.password : null}
				placeholder="Enter password"
				onChangeText={(value: string) => onFieldChange('password', value)}
			/>

			<View className="w-full flex-col items-start p-2 space-y-2">
				<TouchableOpacity
					className="border-gray-400 border-b-2 w-full py-2"
					disabled={profilePictureLoader}
					onPress={selectPhotoTapped}
				>
					<Text className="text-blue-400 text-lg font-bold">
						Upload Image (Optional)
					</Text>
				</TouchableOpacity>

				{checkDefinedValue(inputConfig.profilePicture) ? (
					<View className="flex-row items-center space-x-1">
						<AntDesign name="checkcircleo" size={20} color="green" />
						<Text className="text-green-900">Profile picture uploaded successfully.</Text>
					</View>
				) : null}
			</View>
			<View className="px-2 mt-4">
				<Button raised title="Register" />
			</View>

			<View className="h-56" />
		</KeyboardAvoidingView>
	);
};

export default RegistrationScreen;
