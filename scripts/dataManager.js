import AsyncStorage from '@react-native-async-storage/async-storage';
function getKey(){
    return "1"
}

async function reset(){
    AsyncStorage.setItem(getKey(),JSON.stringify([]))
}

async function  storeTaskf(task){
    try{
        await AsyncStorage.setItem(getKey(),JSON.stringify(task));
    }catch(e){
        console.log("store",e)
            }
}


async function storeTask(task){
  try{
    tasks = await AsyncStorage.getItem("1").then((t)=>{
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

//
