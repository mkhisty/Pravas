import BouncyCheckbox from "react-native-bouncy-checkbox";
import {View, Pressable, Text, TouchableOpacity, TextInput} from "react-native"
import {itemStyles} from "../scripts/style.js"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { scale } from "../scripts/utils.js";

  
export default function item(){

    const [isChecked,setChecked]=useState(false)

    return     <View style={itemStyles.container}>
                <View style={itemStyles.header}>
                    <Text style={itemStyles.title}>Example Task</Text>
                    <TouchableOpacity>
                        <FontAwesome
                        name="sliders"
                        color="#fefefe"
                        style={itemStyles.slider}
                        />
                    </TouchableOpacity>

                </View>
                <View style={itemStyles.content}>
                    <View style={itemStyles.stack}>

                        <View style={itemStyles.checkContainer}>
                            <Checkbox
                            style={itemStyles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#4630EB' : undefined}/>
                            <Text style={itemStyles.label}>Workout Done</Text>
                        </View>

                        <View style={itemStyles.checkContainer}>
                            <Text style={itemStyles.label}>Calories :</Text>
                            <TextInput style={itemStyles.textInput}></TextInput>
                        </View>

                      


                    </View>

                    <TouchableOpacity>
                        <FontAwesome
                                name="edit"
                                color="#fefefe"
                                style={itemStyles.slider}/>
                    </TouchableOpacity>


                </View>
            </View>
}