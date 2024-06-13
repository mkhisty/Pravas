import {trackerStyles} from "../scripts/style.js"
import {View,Text,Pressable, TouchableOpacity} from "react-native"
import Item from "./item.jsx"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {scale} from "../scripts/utils.js"



export default function tracker({addItem,add}){
    console.log(addItem)
    return <View style ={!add? trackerStyles.container : trackerStyles.fadeContainer}>
<Item/>

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