import {trackerStyles} from "../scripts/style.js"
import {View,Text,Pressable, TouchableOpacity,ScrollView} from "react-native"
import Item from "./item.jsx"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {scale} from "../scripts/utils.js"
import { getTask, reset,deleteTask} from "../scripts/dataManager.js"
import { useState } from "react"
import ColorPicker from "./colorpicker.jsx"

export default  function tracker({addItem,add}){
    //reset()
    //deleteTask("Cjxxjxj")
    last=""
    const [tasks,setTasks]= useState([])
    getTask("t").then(function(r){
        setTasks(JSON.parse(r))})
    //console.log("t",tasks)

    return <View style={trackerStyles.parent}>
    <ScrollView style={trackerStyles.scroll}>
    <View style ={!add? trackerStyles.container : trackerStyles.fadeContainer}>

        {tasks.map((t)=>{return <Item props={t}/>})}



    </View>

    </ScrollView>

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