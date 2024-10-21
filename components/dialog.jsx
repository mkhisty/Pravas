import {View,TouchableOpacity,Text,TextInput,Modal,Pressable,Alert} from "react-native"
import {dialogStyles, itemStyles} from "../scripts/style"
import { useState } from "react";
import React from "react";
import Button from "./button";
import { scale } from "../scripts/utils";
import DropDown from "react-native-paper-dropdown";
import {Picker} from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";
import { storeTask,deleteTask} from "../scripts/dataManager";
import { FontAwesome } from "@expo/vector-icons";
import ColorPicker from "./colorpicker";
export default function dialog({changeAdd,add,mode,pf}){


    const [text, setText] = useState('');
    const [taskName, setTaskName] = useState(pf.name);
    const [selectedLanguage, setSelectedLanguage] = useState("Checkbox");
    const [fields,setFields]=useState(pf.fields);
    const [color, setColor]=useState(pf.color)

    React.useEffect(() => {
      setFields(pf.fields);
    }, [pf.fields]);
    React.useEffect(() => {
      setTaskName(pf.name);
      setColor(pf.color);
    }, [pf.name,pf.color]);
    console.log("HI1",taskName);
    const [addField,switchView]=useState("f")


function deleteField(name){
  for(let i=0;i<fields.length;i++){
    if(fields[i].label==name){
      setFields(fields.splice(0,i).concat(fields.splice(i+1,fields.length)))
    }
  }
}
console.log("pF:",pf.name)
if(addField=='f'){
  console.log(fields)        
  dis = <View style={dialogStyles.fields}>
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
 
     <TouchableOpacity style={itemStyles.deleteField} onPress={()=>{deleteField(field.label)}}>
     <FontAwesome
             name={"minus"}
             size={15}
         />
 
     </TouchableOpacity>
   </View>
 
   })}


  </View>
  <Button text={"Add Field  "} icon={"plus"} color={"#000000"} func={()=>switchView("a") } width={"55%"} mLeft={'22.5%'}></Button>

</View>
}else if(addField=="a") {
dis = <View style={dialogStyles.fields}>
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
<Button text={"Cancel  "} icon={"times"} color={"#000000"} width={"45%"}func={()=>{switchView("f")}}></Button>    
<Button text={"Confirm  "} icon={"plus"} color={"#147efb"} width={"45%"}func={()=>{setFields([...fields,{type:selectedLanguage,label:text}]);console.log("here",fields,{type:selectedLanguage,label:text});switchView("f")}}></Button>    
</View>     
</View>  }else if(addField=="c"){
dis= <View style={dialogStyles.fields}><ColorPicker switchView={switchView} setColor={setColor} />


</View>

}


return <Modal
        animationType="slide"
        transparent={true}
        visible={add}
        onRequestClose={() => {changeAdd(!add);}}
        style={dialogStyles.container}>

        <View style={dialogStyles.container}>

          <View style={dialogStyles.header}>

            <Text style={dialogStyles.title}>{mode?"New Task":"Edit Task"}</Text> 
            <Button text={""} icon={"times"} color={"#ffffff"} width={"10%"}func={()=>{ changeAdd(!add)}} iconColor={"black"}></Button>    

          </View>
          <View style={dialogStyles.nameBox}>
          <TextInput style={dialogStyles.name} placeholder="Task Name" onChangeText={setTaskName} defaultValue={taskName}></TextInput>
          <TouchableOpacity style={[dialogStyles.colorPicker,{backgroundColor:color}]} onPress={()=>{switchView("c")}}></TouchableOpacity>
          </View>        

            {dis }

            
            
              <Button text={mode?"Add Task ":"Edit Task "} icon={mode?"plus":"edit"} color={"#147efb"} func={()=>{
                changeAdd(!add);
                console.log(task)
                let task = {
                  id: Math. random() * (1000 - 0) + 0,
                  name:taskName,
                  fields:fields,
                  color:color
                }
                console.log("Task:",task)
                if (mode){
                storeTask(task);
                }else{
                  deleteTask(pf.id).then(()=>{storeTask(task)});
                }
                setFields([])
                setSelectedLanguage("Checkbox")
                setText("")
                
                }} width={"100%"} mLeft={'0%'}></Button>

        </View>
        </Modal>


}