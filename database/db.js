import * as SQLite from 'expo-sqlite/legacy';

const dbName = 'social_app.db';
let db = null;

export const setupDatabase = async () => {
  try {
    db = SQLite.openDatabase(dbName); // Initialize the database
    
    // Use db.transaction to execute multiple queries within a transaction
    db.transaction(
      tx => {
        // Create the users table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            email TEXT, 
            username TEXT, 
            password TEXT
          );`
        );

        // Create the posts table
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            profession TEXT, 
            phone TEXT, 
            email TEXT
          );`
        );
      },
      (error) => {
        console.error('Database setup failed:', error);
      },
      () => {
        console.log('Database setup successful');
      }
    );
  } catch (error) {
    console.error('Database setup failed:', error);
  }
};

export const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export {db};