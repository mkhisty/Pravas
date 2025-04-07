import * as SQLite from 'expo-sqlite';
//WTF IS THE DIFFERENCE BETWEEN EXECASYNC AND GETALLASYNC?
//Copilot: execAsync is for executing SQL commands that do not return data, like INSERT or UPDATE
const db = SQLite.openDatabaseSync('myDatabase.db');

export const createTasks = () => {
  try {
    db.getAllAsync('CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY , name TEXT, color TEXT, fields INTEGER, fields_data TEXT)')
    db.getAllAsync('CREATE TABLE IF NOT EXISTS fieldData (id TEXT PRIMARY KEY )')
      .then((r)=>{console.log("tasks made",r)});
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

const fieldData={
  "checkbox":'INTEGER',
  "numerical": 'REAL',
  "text": 'TEXT',
}

export const changeFieldData = async (fieldId, fieldData) => {
  try {
    const currentDate = new Date();
    const dateId = (currentDate.getFullYear() - 2025) * 365 + currentDate.getMonth() * 30 + currentDate.getDate();
    console.log("Date ID:", dateId); // Use consistent type - number not string
    
    // Check if row exists
    let existingDate = await db.getAllAsync('SELECT id FROM fieldData WHERE id = ?', [dateId]);
    console.log("Existing date:", existingDate);
    
    if (existingDate.length === 0) {
      try {
        console.log("Inserting new row with ID:", dateId);
        // Try using executeSql if available instead of execAsync
        await db.getAllAsync('INSERT INTO fieldData (id) VALUES (?)', [dateId]);
        console.log("Insert completed");
      } catch (error) {
        console.error('Database insert error:', error);
      }    
    }
    
    // Verify row exists now
    existingDate = await db.getAllAsync('SELECT * FROM fieldData WHERE id = ?', [dateId]);
    console.log("After insert check:", existingDate);

    // Process field update
    const fieldKey = 'a' + fieldId;
    await db.getAllAsync(
      `UPDATE fieldData SET "${fieldKey}" = ? WHERE id = ?`,
      [fieldData, dateId]
    );

    console.log('Field data updated successfully:', fieldKey, fieldData);
    
    // Final verification
    const finalCheck = await db.getAllAsync('SELECT * FROM fieldData WHERE id = ?', [dateId]);
    console.log("Final check:", finalCheck);
  } catch (error) {
    console.error('Error manipulating field data:', error.message);
  }
};

export const insertData = async(field,val,)=>{
  try {
    await db.execAsync(
      `UPDATE fieldData SET ? = ? WHERE id = ?`,
      [field,val, ]
    );
  } catch (error) {
    console.error('Error adding data:', error.message);
  }

}

export const addField = async (fieldId,fieldType) => {
  try {
    fieldId = 'a'+fieldId;
    // Validate and sanitize the fieldId to ensure it is a valid SQLite column name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(fieldId)) {
      throw new Error('Invalid fieldId. Must be alphanumeric with underscores and start with a letter or underscore.');
    }
    // Use execAsync for schema changes
    await db.execAsync(
      `ALTER TABLE fieldData ADD COLUMN "${fieldId}" ${fieldData[fieldType]};`
    );
    
    console.log('Column added:', fieldId);
  } catch (error) {
    console.error('Error adding field:', error.message);
  }
};

export const deleteField = async (fieldId) => {
  try {

    console.log("Field to delete:", fieldId);

    // Get current table info
    const tableInfo = await db.getAllAsync('PRAGMA table_info(fieldData)');
    const columns = tableInfo.map(column => column.name);
    
    // Filter out the column we want to remove
    const remainingColumns = columns.filter(col => col !== fieldId);
    
    // Begin transaction
    await db.execAsync('BEGIN TRANSACTION;');
    
    // Create new table without the column
    await db.execAsync(`
      CREATE TABLE fieldData_new AS 
      SELECT ${remainingColumns.join(', ')}
      FROM fieldData;
    `);
    
    // Drop old table
    await db.execAsync('DROP TABLE fieldData;');
    
    // Rename new table to original name
    await db.execAsync('ALTER TABLE fieldData_new RENAME TO fieldData;');
    
    // Commit transaction
    await db.execAsync('COMMIT;');

    // Verify the change
    const newColumns = await db.getAllAsync('PRAGMA table_info(fieldData)');
    console.log("Updated column names:", newColumns.map(col => col.name));
    
    console.log('Column deleted successfully:', fieldId);
  } catch (error) {
    // Rollback on error
    await db.execAsync('ROLLBACK;').catch(() => {});
    console.error('Error deleting field:', error.message);
    throw error;
  }
};



 export const insertTask = async (task) => {
  try {
    console.log(task)
    console.log( [task.id,task.name, task.color,1,task.fields_data])
    db.getAllAsync('INSERT INTO tasks (id,name,color,fields,fields_data) VALUES (?, ?, ?, ?, ?)', [task.id,task.name, task.color,1,task.fields_data])
                  .then((r)=>{
                    getAll("tasks").then((r)=>{console.log("please",r)});
                    console.log("task inserted",r);
                  });

    // Await all field additions
    const fields = JSON.parse(task.fields_data);
    for (const field of fields) {
      await addField(field.key,field.type);
    }

  } catch (error) {
    console.error('Error inserting user:', error);
  }
};



export function wipe(){
  db.getAllAsync("DROP TABLE IF EXISTS tasks").then(()=>{"Dropped: ", getAll("tasks").then((r)=>{console.log("please",r)});})
  db.getAllAsync("DROP TABLE IF EXISTS fieldData").then(()=>{"Dropped: ", getAll("tasks").then((r)=>{console.log("please",r)});})

}

export async function getAll(table) {
  try {
    const rows = await db.getAllAsync('SELECT * FROM ' + table);
    console.table(rows); // Print the rows in table format
    return rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};
async function getTask(tid) {
  try {
    const result = await db.getAllAsync('SELECT * FROM tasks WHERE id = ? LIMIT 1', [String(tid)]);
    console.log("R:", result);
    
    // If you need the second query
    const allTasks = await getAll('tasks');
    console.log("after", allTasks);
    
    return result[0]; // Assuming you want the first (and only) task
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

export async function deleteTask(tid) {
  try {
    console.log("Attempting to delete task:", tid);
    await getTask(tid).then((r)=>{console.log(r);JSON.parse(r.fields_data).map((s)=>{deleteField(s.key)})})

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

export async function updateFieldData(tid,label,data){
  try {
    console.log(tid,label,data);
    db.getAllAsync( 'UPDATE tasks SET fieldData = ? WHERE id = ?',[newValue, tid])
                  .then((r)=>{
                    getAll("tasks").then((r)=>{console.log("please",r)});
                    console.log("data inserted",r);
                  });



  } catch (error) {
    console.error('Error inserting data:', error);
  }

}

