import BouncyCheckbox from "react-native-bouncy-checkbox";
import {View, Pressable, Text, TouchableOpacity, TextInput, NativeModules} from "react-native"
import {itemStyles} from "../scripts/style.js"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { scale } from "../scripts/utils.js";
import {deleteTask} from "../scripts/dataManager.js"

  
export default function item({props}){
    props==undefined?props={name:"",fields:[{label:"",type:"Checkbox"}]}: props=props
    const [isChecked,setChecked]=useState(false)
    return     <View style={itemStyles.container}>
                    <View style={itemStyles.header}>
                        <Text style={itemStyles.title}>{props.name}</Text>
                        <TouchableOpacity onPress={()=>{deleteTask(props.name)}}>
                            <FontAwesome
                                name="trash"
                                color="#fefefe"
                                style={itemStyles.slider}/>
                        </TouchableOpacity>
                    </View>
                <View style={itemStyles.content}>
                    <View style={itemStyles.stack}>

                    {props.fields.map((f)=>{
                        return f.type=="Checkbox"? <View>
                                                    
                                                        <View style={itemStyles.checkContainer}> 
                                                            <Checkbox style={itemStyles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4630EB' : undefined}/> 
                                                            <Text style={itemStyles.label}>{f.label}</Text>
                                                        </View>
                                                    </View>:
                                                    
                                                    <View style={itemStyles.checkContainer}> 
                                                        <Text style={itemStyles.label}>{f.label+ ':'}</Text> 
                                                        <TextInput style={itemStyles.textInput}></TextInput>
                                                    </View>
                })}

                </View>

                      





                </View>
            </View>
}


/*
<TouchableOpacity>
<FontAwesome
        name="edit"
        color="#fefefe"
        style={itemStyles.slider}/>
</TouchableOpacity>*/