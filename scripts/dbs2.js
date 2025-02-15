import * as SQLite from 'expo-sqlite';

// Get a connection to the SQLite database
const db = SQLite.openDatabaseSync('myDatabase.db');

// Function to create the database table
export const createTable = () => {
  try {
    db.getAllAsync('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)').then((r)=>{console.log("Result1",r)});;
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Function to insert a new user
export const insertUser = (name, email) => {
  try {
    db.getAllAsync('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]).then((r)=>{console.log("Result2",r)});
    console.log(result);
  } catch (error) {
    console.error('Error inserting user:', error);
  }
};

// Function to update an existing user
export const updateUser = (id, name, email) => {
  try {
    db.getAllAsync('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]).then((r)=>{console.log("Result3",r)});
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export function wipe(table){
  console.log("h")
  db.getAllAsync("DROP TABLE users").then(()=>{console.log("wfrfr"),getAllUsers()})
}

export const getAllUsers = () => {
    try {
      db.getAllAsync('SELECT * FROM users').then((r)=>{console.log("Result",r)});
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  };
  
  
