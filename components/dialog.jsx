import {View,TouchableOpacity,Text,TextInput,Modal,Pressable,Alert} from "react-native"
import {dialogStyles, itemStyles} from "../scripts/style"
import { useState,React } from "react";
import Button from "./button";
import { scale } from "../scripts/utils";
import DropDown from "react-native-paper-dropdown";
import {Picker} from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";
import { storeTask } from "../scripts/dataManager";
export default function dialog({changeAdd,add}){


    const [text, setText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [fields,setFields]=useState([])
    const [addField,switchView]=useState(false)
    





return <Modal
        animationType="slide"
        transparent={true}
        visible={add}
        onRequestClose={() => {changeAdd(!add);}}
        style={dialogStyles.container}>

        <View style={dialogStyles.container}>

          <View style={dialogStyles.header}>

            <Text style={dialogStyles.title}>New Task</Text> 
            <Button text={""} icon={"times"} color={"#ffffff"} width={"10%"}func={()=>{ changeAdd(!add)}} iconColor={"black"}></Button>    

          </View>

          <TextInput style={dialogStyles.name} placeholder="Task Name"></TextInput>


            {   !addField     ?            
            
            <View style={dialogStyles.fields}>
              <Text style={dialogStyles.fieldTitle}>Fields</Text>
              <View style={dialogStyles.list}>


              {fields.map((field)=>{
               return <View style={itemStyles.checkContainer}>

               {field.type=="Checkbox"? <Checkbox
                style={itemStyles.checkbox}
                value={false}
                onValueChange={null}
                color={"#000"}/> : null} 

                <Text style={itemStyles.label}>{field.label + ((field.type=="Text" || field.type=="Numerical") ? " :":"")}</Text>


                {(field.type=="Text" || field.type=="Numerical")?<TextInput style={itemStyles.textInput}></TextInput>: null} 

              </View>

              })}


              </View>
              <Button text={"Add Field  "} icon={"plus"} color={"#000000"} func={()=>switchView(true) } width={"55%"} mLeft={'22.5%'}></Button>

            </View>
            :
            <View style={dialogStyles.fields}>
            <Text style={dialogStyles.fieldTitle}>New Field</Text>
            <View style={dialogStyles.list}>
              <TextInput  placeholder="Label" style={dialogStyles.fieldName} value={text} onChangeText={setText}></TextInput>
              <Text style={{marginTop:"5%",fontSize:scale(17),marginBottom:"5%"}}>Type</Text>
              <View style={dialogStyles.dropdown}>
              <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }
  color="#000000">
  <Picker.Item label="Checkbox" value="Checkbox" />
  <Picker.Item label="Text" value="Text" />
  <Picker.Item label="Numerical" value="Numerical" />
</Picker>
</View>



            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between", padding:"3%"}}>
            <Button text={"Cancel  "} icon={"times"} color={"#000000"} width={"45%"}func={()=>{switchView(false)}}></Button>    
            <Button text={"Confirm  "} icon={"plus"} color={"#147efb"} width={"45%"}func={()=>{setFields([...fields,{type:selectedLanguage,label:text}]);console.log(fields);switchView(false)}}></Button>    
            </View>     
          </View>  

            }
            
              <Button text={"Add Task  "} icon={"plus"} color={"#147efb"} func={()=>{
                changeAdd(!add);

                console.log("erjgberkgb");
                let task = {
                  names:[fields.map(field=>{return field.name})]
                }
                console.log(task)
                //storeTask(task);
                
                
                }} width={"100%"} mLeft={'0%'}></Button>

        </View>
        </Modal>


}