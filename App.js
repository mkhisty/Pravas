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
  const [mode,changeMode] = useState(true)
  const [pf,changepf] = useState({"color": "#ffffff", "fields": [], "name": ""})

  const addPressed = useCallback((res)=>{
    changeAdd(res)
  },[])



  return (

    <View style={add? homeStyles.fadeContainer: homeStyles.container}>
    <Text style={homeStyles.welcome}>Welcome, Malhar</Text>
    <Dialog add={add} changeAdd={changeAdd} mode={mode} pf={pf}/>
    <Tracker addItem = {changeAdd} add={add} changepf={changepf} changeMode={changeMode}>

        </Tracker>
            <Button text="Track Progress " icon="caret-right" color={"#ff7000"} width={"65%"}/>






      <StatusBar style="auto" />
    </View>
  );
}





