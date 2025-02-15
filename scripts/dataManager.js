import AsyncStorage from '@react-native-async-storage/async-storage';

async function reset(){
    AsyncStorage.clear()
    AsyncStorage.setItem("t",JSON.stringify([]))
}

async function deleteTask(n){
    tasks = await AsyncStorage.getItem("t").then((t)=>{
        t=JSON.parse(t)
        for(let i=0;i<t.length;i++){
            print(t[i].id,n)
            if (t[i].id==n){
                t = t.slice(0,i).concat(t.slice(i+1,t.length));
                AsyncStorage.setItem("t",JSON.stringify(t))
                break;
            }
        }
    })

}


async function storeTask(task){
  try{
    tasks = await AsyncStorage.getItem("t").then((t)=>{
        AsyncStorage.setItem("t",JSON.stringify([...JSON.parse(t),task]))

    })
  }catch(e){
    console.log("store",e);}

}

async function getTask(){
    try{
        return await AsyncStorage.getItem("t")
    }catch(e){
        console.log("get",e);
    }
}
export {storeTask}
export {getTask}
export {reset}
export {deleteTask}
//
