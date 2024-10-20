import BouncyCheckbox from "react-native-bouncy-checkbox";
import {View, Pressable, Text, TouchableOpacity, TextInput, NativeModules} from "react-native"
import {itemStyles} from "../scripts/style.js"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { scale } from "../scripts/utils.js";
import {deleteTask} from "../scripts/dataManager.js"

  
export default function item({props,addItem,changepf,changeMode}){
    props==undefined?props={name:"",fields:[{label:"",type:"Checkbox"}]}: props=props
    const [isChecked,setChecked]=useState({})
    function changeCheck(n,v){
        c = isChecked
        c[n]=v
        console.log(c)
        setChecked(c)
    }
    function editTask(n){
        changepf(props)
        console.log("P",props)
        changeMode(false)
        addItem(true)
    }
    return     <View style={[itemStyles.container,{borderColor:props.color}]}>
                    <View style={itemStyles.header}>
                        <Text style={[itemStyles.title,{backgroundColor:props.color}]}>{props.name}</Text>
                        <View style={itemStyles.controls}>
                        <TouchableOpacity onPress={()=>{editTask(props.name)}}>
                            <FontAwesome
                                name="edit"
                                color="#fefefe"
                                style={[itemStyles.slider,{backgroundColor:props.color}]}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{deleteTask(props.name)}}>
                            <FontAwesome
                                name="trash"
                                color="#fefefe"
                                style={[itemStyles.slider,{backgroundColor:props.color}]}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                <View style={itemStyles.content}>
                    <View style={itemStyles.stack}>

                    {props.fields.map((f)=>{
                        if(f.type=="Checkbox" ){
                            isChecked[f.name]=false
                        }
                        
                        return f.type=="Checkbox"? <View>
                                                    
                                                        <View style={itemStyles.checkContainer}> 
                                                            <Checkbox style={itemStyles.checkbox} value={isChecked[f.label]} onValueChange={(v)=>{changeCheck(f.label,v)}} color={isChecked ? '#4630EB' : undefined}/> 
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