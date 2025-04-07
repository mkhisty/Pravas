import {trackerStyles} from "../../../scripts/style.js"
import {View,Text, TouchableOpacity,ScrollView} from "react-native"
import Item from "./item.jsx"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {scale} from "../../../scripts/utils.js"
import { useContext, useState } from "react"
import { LevelContext } from "../../../scripts/context.js"
import { getAll } from "../../../scripts/database.js"


export default  function tracker(){
    const [mode,setMode] = useContext(LevelContext)["mode"]
    
    const [tasks2,setTasks2]= useState([])

    const [,changepf] = useContext(LevelContext)["task"]

    getAll("tasks").then((r)=>{setTasks2(r)})
  
    

    
    
    return  <View style={trackerStyles.parent}>
                <ScrollView style={trackerStyles.scroll}>
                    <View style ={!mode? trackerStyles.container : trackerStyles.fadeContainer}>
                    {tasks2.map((t)=>{return <Item key={t.id} props={t}/>})}

                      <View>
                        <TouchableOpacity >
                          <Text>Completed </Text>
                        </TouchableOpacity>
                      </View>

                  </View>
                </ScrollView>

                <TouchableOpacity style={trackerStyles.add} onPress={()=>{changepf({"color": "#ffffff", "fields": [], "name": ""});
                                                                          setMode(true)}}>
                  <FontAwesome name="plus" size={scale(30)} color="#25292e" style={trackerStyles.icon}/>
                </TouchableOpacity>
            </View>
}