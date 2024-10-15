import { StyleSheet, Text, View, Pressable, PixelRatio,TouchableOpacity} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome"


function scale(size){return size/fontScale}




export default function button({text,icon,color,func,width,iconColor,mLeft}){

    iconColor==undefined?iconColor="white":null
    const buttonStyles = StyleSheet.create({

        buttonIcon: {
          color:iconColor
      
        },
        button:{
          padding: scale(1),
          backgroundColor:color,
          alignItems: "center",
          justifyContent:"center",
          width:width,
          marginLeft:mLeft,
          borderRadius: scale(RADIUS),
          display:"flex",
          flexDirection:"row",
          borderColor: color,
          borderWidth:scale(3),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
    
          shadowOpacity: 1,
          shadowRadius: 20.00,
          
                
        },
    
    
        text:{
          color:"#fff",
          fontWeight:"bold",
          fontSize:scale(20),
          textAlign: "center",
        },
      }); 
    


    return       <TouchableOpacity  style={buttonStyles.button} onPress={func}>

                    {text!=""? <Text style={buttonStyles.text}> {text}</Text>:null}
                    <FontAwesome
                        name={icon}
                        size={20}
                        style={buttonStyles.buttonIcon}
                    />
                </TouchableOpacity>
}


const RADIUS = 5;
const fontScale = PixelRatio.getFontScale();

