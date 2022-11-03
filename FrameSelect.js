import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FrameSelect() {
    const navigation = useNavigation();

    return (
    <View style={{flex: 1, justifyContent:'center', alignItem: 'center', paddingTop: 50}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Cam', {
                frame : require('./frame/frame1.png')
            });
            
        }}>
            <Image style={{width: 100, height: 148, marginVertical: 10}} source={require('./frame/frame1.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Cam', {
                frame : require('./frame/frame2.png')
            });
        }}>
            <Image style={{width: 100, height: 150, marginVertical: 10}} source={require('./frame/frame2.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Cam', {
                frame : require('./frame/frame3.png')
            });
        }}>
            <Image style={{width: 100, height: 150, marginVertical: 10}} source={require('./frame/frame3.png')}/>
        </TouchableOpacity>
    </View>
  );
}