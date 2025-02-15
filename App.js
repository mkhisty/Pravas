import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import {homeStyles} from './scripts/style';
import { useEffect, useState} from 'react';
import { LevelContext } from "./components/context";


import {wipe,createTasks,insertTask,getAll} from "./scripts/database"
import Button from "./components/button"
import Tracker from "./components/tracker.jsx"
import Dialog from './components/dialog.jsx';


export default function App() {
  const [add,changeAdd] = useState(false)
  const [pf,changepf] = useState({"color": "#ffffff", "fields": [], "name": ""})
  createTasks()

  return (
    <LevelContext.Provider value={{'task':[pf,changepf],'add':[add,changeAdd]}}>
      <View style={add? homeStyles.fadeContainer: homeStyles.container}>
        <Text style={homeStyles.welcome}>Welcome, Malhar</Text>
        <Dialog />
        <Tracker/>
        <Button text="Track Progress " icon="caret-right" color={"#ff7000"} width={"65%"}/>
        <StatusBar style="auto" />
      </View>
    </LevelContext.Provider>
  );
}





