import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Input } from '@rneui/themed';
import Lottie from 'lottie-react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userSlice';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureEntry, setSecureEntry] = useState(true);
	const [loading, setLoading] = useState(false);
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

		if (password.length < 6) {
			errorObj = {
				...errorObj,
				password: 'Password needs to be greater than 6 characters.',
			};
		}

		if (Object.keys(errorObj)?.length) {
			setErrorState({ ...errorObj });
			return false;
		}

		setErrorState({});

		return isValidated;
	};

	const onLogin = () => {
		if (!validateFields()) return;

		setLoading(true);

		signInWithEmailAndPassword(auth, email, password)
			.then((response) => {
				console.log('response', response.user);
				dispatch(setUser(response.user));
				
				navigation.navigate("Home");
			})
			.catch((err) => {
				alert(err);
				setLoading(false);
			});
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
					disabled={loading}
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
					disabled={loading}
				/>
			</View>

			<View className="flex-col space-y-2">
				<Button loading={loading} onPress={onLogin} className="rounded-md" title="Login" />
				<Button
					type="outline"
					onPress={onRegister}
					className="rounded-md"
					title="Register"
					disabled={loading}
				/>
			</View>
			<View className="h-40" />
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;
