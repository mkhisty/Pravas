import * as SQLite from 'expo-sqlite';

// Get a connection to the SQLite database
const db = SQLite.openDatabaseSync('myDatabase.db');

// Function to create the database table
export const createTasks = () => {
  try {
    db.getAllAsync('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY , name TEXT, color TEXT, fields INTEGER, fields_data TEXT)')
      .then((r)=>{console.log("tasks made",r)});
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

export const insertTask = (task) => {
  try {
    console.log(task)
    console.log( [task.id,task.name, task.color,1,task.fields_data])
    db.getAllAsync('INSERT INTO tasks (id,name,color,fields,fields_data) VALUES (?,?, ?,?,?)', [task.id,task.name, task.color,1,task.fields_data])
                  .then((r)=>{
                    getAll("tasks").then((r)=>{console.log("please",r)});
                    console.log("task inserted",r);
                  });



  } catch (error) {
    console.error('Error inserting user:', error);
  }
};

export function wipe(){
  console.log("triggered")
  db.getAllAsync("DROP TABLE IF EXISTS tasks").then(()=>{"Dropped: ", getAll("tasks").then((r)=>{console.log("please",r)});})
}

export async function getAll(table){
    try {
      x = await db.getAllAsync('SELECT * FROM tasks').then((r)=>{return r});
      return x;
    } catch (error) {
      console.error('Error retrieving shit:', error);
    }
  };

export async function getTask(tid){
  try {
    x =  await db.getAllAsync('SELECT * FROM tasks WHERE id = ? LIMIT 1',[String(tid)]).then((r)=>{ console.log("R:",r);getAll('tasks').then((r)=>{console.log("after",r)})});
    return x;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
  }
};
export async function deleteTask(tid) {
  try {
    console.log("Attempting to delete task:", tid);
    
    const deleteResult = await db.getAllAsync(
      'DELETE FROM tasks WHERE id = ?',
      [String(tid)]
    );
    console.log("Delete result:", deleteResult);
    
    // Check if any rows were affected
    if (deleteResult && deleteResult.changes === 0) {
      console.log("No rows were deleted");
    }
    
    const updatedTasks = await getAll('deleted');
    console.log("Tasks after deletion:", updatedTasks);
    
  } catch(e) {
    console.error("Delete error:", e);
  }
}



/*
export const createFields = () => {
  try {
    db.getAllAsync('CREATE TABLE IF NOT EXISTS fields (id INTEGER PRIMARY KEY , name TEXT, type INTEGER, schedule TEXT, data BLOB )').then((r)=>{console.log("fields made",r)});
  } catch (error) {
    console.error('Error creating table:', error);
  }
};
export async function getField(fid){
  try {
    x =  await db.getAllAsync('SELECT * FROM fields WHERE id = ? LIMIT 1',[String(fid)]).then((r)=>{ return r});
    return x;
  } catch (error) {
    console.error('Error retrieving fields:', error);
  }
};

export const insertField = (id,name,type,schedule,data ) => {
  try {
    db.getAllAsync('INSERT INTO fields (id,name,type,schedule,data) VALUES (?,?, ?,?,?)', [String(id),name, type,schedule,data])
    .then((r)=>{console.log("field inserted",r)
                getAll("fields")
    });
  } catch (error) {
    console.error('Error inserting user:', error);
  }
};

*/