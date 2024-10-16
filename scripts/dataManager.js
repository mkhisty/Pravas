import AsyncStorage from '@react-native-async-storage/async-storage';
function getKey(){
    return "t"
}

async function reset(){
    AsyncStorage.setItem(getKey(),JSON.stringify([]))
}

async function deleteTask(n){
    tasks = await AsyncStorage.getItem("t").then((t)=>{
        t=JSON.parse(t)
        for(let i=0;i<t.length;i++){
            if (t[i].name==n){
                t = t.slice(0,i).concat(t.slice(i+1,t.length));
                console.log(t)
                AsyncStorage.setItem(getKey(),JSON.stringify(t))
                break;
            }
        }
    })

}


async function storeTask(task){
  try{
    tasks = await AsyncStorage.getItem("t").then((t)=>{
        console.log("PLEASE",JSON.stringify(t))
        console.log(JSON.stringify(task))
        console.log(JSON.stringify([...JSON.parse(t),task]))
        AsyncStorage.setItem(getKey(),JSON.stringify([...JSON.parse(t),task]))

    })
  }catch(e){
    console.log("store",e);}

}

async function getTask(id){
    try{
        print( (AsyncStorage.getItem(id)))
        return await AsyncStorage.getItem(id)
    }catch(e){
        console.log("get",e);
    }
}
export {storeTask}
export {getTask}
export {reset}
export {deleteTask}
//
