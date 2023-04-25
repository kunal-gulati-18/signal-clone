import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../reducers/userSlice';

const HomeScreen = () => {
  const user = useSelector(userSelector);
  const navigation = useNavigation();
  
  console.log('userr', user)
  return (
    <Text>HomeScreen</Text>
  )
}

export default HomeScreen