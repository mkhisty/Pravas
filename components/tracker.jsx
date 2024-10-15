import {trackerStyles} from "../scripts/style.js"
import {View,Text,Pressable, TouchableOpacity} from "react-native"
import Item from "./item.jsx"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {scale} from "../scripts/utils.js"
import { getTask, reset} from "../scripts/dataManager.js"
import { useState } from "react"


export default  function tracker({addItem,add}){
    //reset()
    last=""
    const [tasks,setTasks]= useState([])
    getTask("1").then(function(r){
        setTasks(JSON.parse(r))})
    //console.log("t",tasks)

    return <View style ={!add? trackerStyles.container : trackerStyles.fadeContainer}>

{tasks.map((t)=>{return <Item props={t}/>})}


<TouchableOpacity style={trackerStyles.add} onPress={()=>addItem(true)}>

<FontAwesome
                        name="plus"
                        size={scale(30)}
                        color="#25292e"
                        style={trackerStyles.icon}
                    />


</TouchableOpacity>
    </View>
}