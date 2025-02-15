import {trackerStyles} from "../scripts/style.js"
import {View,Text,Pressable, TouchableOpacity,ScrollView,LayoutAnimation} from "react-native"
import Item from "./item.jsx"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import {scale} from "../scripts/utils.js"
import { useContext, useEffect, useState } from "react"
import { LevelContext } from "./context.js"
import { getAll } from "../scripts/database.js"


export default  function tracker(){
    const [add,changeAdd] = useContext(LevelContext)["add"]
    const [tasks,setTasks]= useState([])
    const [tasks2,setTasks2]= useState([])

    const [,changepf] = useContext(LevelContext)["task"]
    const [collapsed, setCollapsed] = useState(true)
    let fields=[]
    function toggleCollapse(){
        LayoutAnimation.configureNext(LayouwtAnimation.Presets.easeInEaseOut);
        setCollapsed(!collapsed)
    }
    
    getAll('tasks').then((r)=>{setTasks2(r); })
        // Fetch tasks only once on component mount

    
      useEffect(() => {
        // If tasks are fetched, fetch fields for each task
        if (tasks.length > 0) {
          const fetchFields = async () => {
            const updatedTasks = await Promise.all(
              tasks.map(async (e) => {
                const fields = [];
                // Fetch fields for each task asynchronously
                for (let i = 0; i < e.fields; i++) {
                  //const field = await getField(String(e.id) + String(i));
                  fields.push(field); // Append the field
                }
                // Return the task with its fields added
                return {
                  id: e.id,
                  name: e.name,
                  fields: [...fields], // Directly use the fetched fields
                  color: e.color,
                };
              })
            );
    
            setTasks2(updatedTasks); // Update the state with the completed tasks
          };
    
          fetchFields(); // Call the async function to fetch fields
        }
      }, [tasks]); // This effect runs when tasks are loaded or updated
    
    
    return  <View style={trackerStyles.parent}>
                <ScrollView style={trackerStyles.scroll}>
                <View style ={!add? trackerStyles.container : trackerStyles.fadeContainer}>
                {tasks2.map((t)=>{return <Item key={t.id} props={t}/>})}
                  <View>
                    <TouchableOpacity onPress={toggleCollapse}>
                        <Text>Completed </Text>

                    {!collapsed &&  <View>

                                        
                        
                        
                        
                        
                                    </View>}
                    </TouchableOpacity>
                    <View></View>    
                    </View>
                </View>
                </ScrollView>

                <TouchableOpacity style={trackerStyles.add} onPress={()=>{  
                                                                            changepf({"color": "#ffffff", "fields": [], "name": ""});
                                                                            changeAdd(true)}}>
                    <FontAwesome
                    name="plus"
                    size={scale(30)}
                    color="#25292e"
                    style={trackerStyles.icon}
                    />
                </TouchableOpacity>

            </View>
}