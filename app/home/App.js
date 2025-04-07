import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View} from 'react-native';
import {homeStyles} from '../../scripts/style.js';
import { useContext } from 'react';
import { LevelProvider, LevelContext } from "../../scripts/context.js";
import { FontAwesome } from '@expo/vector-icons';
import {createTasks,wipe,getAll} from "../../scripts/database.js"
import Tracker from "./components/tracker.jsx"
import Dialog from './components/dialog.jsx';
import { Link } from 'expo-router';

function AppContent() {
  const [mode] = useContext(LevelContext)['mode'];
  createTasks();
  //wipe()

  getAll("tasks").then((r)=>{console.log("please",r)});
  return (
    <View style={mode ? homeStyles.fadeContainer : homeStyles.container}>
      <Text style={homeStyles.welcome}>Welcome, Malhar</Text>
      <Dialog />
      <Tracker/>
      <Link href="/progress/progress" asChild>
        <TouchableOpacity style={{ marginTop:'3%',height:'5%', backgroundColor:'#ff7000',width:'100%',justifyContent:'center',borderRadius:'5%' }}>
          <Text style={{fontSize:20, fontWeight:'bold',width:'100%',textAlign:'center',color:'white'}}>
            TRACK <FontAwesome name={'caret-right'} size={25} />
          </Text>
        </TouchableOpacity>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <LevelProvider>
      <AppContent />
    </LevelProvider>
  );
}





