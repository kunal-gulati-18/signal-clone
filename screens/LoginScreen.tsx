import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Input } from '@rneui/themed';
import Lottie from 'lottie-react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureEntry, setSecureEntry] = useState(true);
	const [errorState, setErrorState] = useState({
		email: null,
		password: null,
	});

	const onEmailChange = (value: string) => {
		setEmail(value);
	};

	const onPasswordChange = (value: string) => {
		setPassword(value);
	};

	const onToggleSecureEntry = () => setSecureEntry(!secureEntry);

	const validateFields = () => {
		let validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		let isValidated = true;
		let errorObj = {};

		if (!email.match(validRegex)) {
			errorObj = {
				email: 'Please enter a valid email',
			};
		}

		if (!password) {
			errorObj = {
				...errorObj,
				password: 'Please enter a valid password.',
			};
		}

		if (Object.keys(errorObj)) {
			setErrorState({ ...errorObj });
			return false;
		}

		setErrorState({
			email: '',
			password: '',
		});

		return isValidated;
	};

	const onLogin = () => {
		if (!validateFields()) return;
	};

	const onRegister = () => {
		navigation.navigate('Register');
	};
	return (
		<KeyboardAvoidingView
			behavior="padding"
			className="bg-white flex-1 items-center justify-center w-full"
		>
			<Lottie
				source={require('./assets/chatAnimation.json')}
				// className="h-20 w-20"
				autoPlay
				loop
				className="h-60 w-60"
			/>
			<View className="w-60">
				<Input
					autoFocus
					leftIcon={<AntDesign name="user" size={20} color="gray" />}
					value={email}
					errorMessage={errorState?.email ? errorState?.email : null}
					placeholder="Enter email"
					onChangeText={onEmailChange}
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
					value={password}
					secureTextEntry={secureEntry}
					errorMessage={errorState?.password ? errorState?.password : null}
					placeholder="Enter password"
					onChangeText={onPasswordChange}
				/>
			</View>

			<View className="flex-col space-y-2">
				<Button onPress={onLogin} className="rounded-md" title="Login" />
				<Button
					type="outline"
					onPress={onRegister}
					className="rounded-md"
					title="Register"
				/>
			</View>
			<View className="h-40" />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;
