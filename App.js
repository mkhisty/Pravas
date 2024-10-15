import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, PixelRatio,TextInput,TouchableOpacity, Modal} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {useFonts} from "expo-font"
import {homeStyles,dialogStyles} from './scripts/style';
import { useState, useEffect, useCallback} from 'react';

import Button from "./components/button"
import Item from "./components/item.jsx"
import Tracker from "./components/tracker.jsx"
import Dialog from './components/dialog.jsx';

export default function App() {


  
  const [add,changeAdd] = useState(false)
  const [text, setText] = useState('');

  const addPressed = useCallback((res)=>{
    changeAdd(res)
  },[])



  return (

    <View style={add? homeStyles.fadeContainer: homeStyles.container}>
    <Text style={homeStyles.welcome}>Welcome, Malhar</Text>
    <Dialog add={add} changeAdd={changeAdd}/>
    <Tracker addItem = {changeAdd} add={add}>

        </Tracker>
            <Button text="Track Progress" icon="caret-right" color={"#ff7000"} width={"65%"}/>


      <Text>Open up App.js to start working on your app!</Text>
      <Pressable
        onPress={() => changeAdd(true)}>
        <Text >Show Modal</Text>
      </Pressable>



      <StatusBar style="auto" />
    </View>
  );
}





