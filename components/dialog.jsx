import {View,TouchableOpacity,Text,TextInput,Modal,Pressable,Alert} from "react-native"
import {dialogStyles, itemStyles} from "../scripts/style"
import { useContext, useState } from "react";
import React from "react";
import Button from "./button";
import { scale } from "../scripts/utils";
import {Picker} from '@react-native-picker/picker';
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";
import ColorPicker from "./colorpicker";
import { LevelContext } from "./context";
import {insertTask,deleteTask} from "../scripts/database";


export default function dialog(){


    const [pf, ] = useContext(LevelContext)["task"]
    const [add,changeAdd] = useContext(LevelContext)["add"]
    mode = pf['name']==""
    const [text, setText] = useState('');
    const [taskName, setTaskName] = useState(pf.name);
    const [taskid, settaskid] = useState(pf.id)
    const [selectedField, setSelectedField] = useState("checkbox");
    const [fields,setFields]=useState(pf.fields);
    const [color, setColor]=useState(pf.color)

    React.useEffect(() => {
      setFields(pf.fields);
    }, [pf.fields]);
    React.useEffect(() => {
      setTaskName(pf.name);
      setColor(pf.color);
    }, [pf.name,pf.color]);
    const [addField,switchView]=useState("f")


function deleteField(name){
  for(let i=0;i<fields.length;i++){
    if(fields[i].label==name){
      setFields(fields.splice(0,i).concat(fields.splice(i+1,fields.length)))

    }
  }
}
if(addField=='f'){
  dis = <View style={dialogStyles.fields}>
  <Text style={dialogStyles.fieldTitle}>Fields</Text>
  <View style={dialogStyles.list}>


  {fields.map((field)=>{
    
    return <View key={field.key} style={itemStyles.checkContainer}>
 
    {field.type=="checkbox"? <Checkbox
     style={itemStyles.checkbox}
     value={false}
     onValueChange={null}
     color={"#000"}/> : null} 
 
     <Text style={itemStyles.label}>{field.label + ((field.type=="Text" || field.type=="Numerical") ? " :":"")}</Text>
 
 
     {(field.type=="text" || field.type=="numerical")?<TextInput style={itemStyles.textInput}></TextInput>: null} 
 
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
selectedValue={selectedField}
onValueChange={(itemValue, itemIndex) =>
setSelectedField(itemValue)
}
color="#000000">
<Picker.Item label="Checkbox" value="checkbox" />
<Picker.Item label="Text" value="text" />
<Picker.Item label="Numerical" value="numerical" />
</Picker>
</View>



</View>

<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between", padding:"3%"}}>
<Button text={"Cancel  "} icon={"times"} color={"#000000"} width={"45%"}func={()=>{switchView("f")}}></Button>    
<Button text={"Confirm  "} icon={"plus"} color={"#147efb"} width={"45%"}func={()=>{setFields([...fields,{type:selectedField,label:text,data:"",key: Math.round(Math.random() * (1000 - 0) + 0),}]);switchView("f")}}></Button>    
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
                let task = {
                  id: Math.round(Math.random() * (1000 - 0) + 0),
                  name: taskName,
                  fields: fields.length,
                  color: color,
                  fields_data: JSON.stringify(fields)

                }
                if (mode){
                insertTask(task);
                console.log(task.id)

//                task.fields.map((m,i)=>{console.log(parseInt(task.id.toString(),i.toString(),)),insertField(task.id.toString()+i.toString(),m.label,m.type,"d",[])})
                }else{
                  task.id = pf.id;
                  deleteTask(pf.id).then(()=>{insertTask(task)});
                }
                setFields([])
                setSelectedField("checkbox")
                setText("")
                
                }} width={"100%"} mLeft={'0%'}></Button>

        </View>
        </Modal>


}