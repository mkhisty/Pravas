import AsyncStorage from '@react-native-async-storage/async-storage';

function getKey(){
    return "1"
}


async function  storeTask(task){
    try{
        await AsyncStorage.setItem(getKey(),JSON.stringify(task));
    }catch(e){
        console.log(e)
            }
}

export {storeTask}