import { Database } from "sqlite";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

let db: Database;

const connectToDatabase = async (retries: number = 5): Promise<Database> => {
    try {
        db = await open({
            filename: '../../todos.db',
            driver: sqlite3.Database
        });
        // await db.get('PRAGMA foreign_keys = ON'); // Disable foreign key checks for now
        console.log('Connected to the SQLite database.');

        return db;
    } catch (err: any) {
        console.error(`Failed to connect to the SQLite database: ${err.message}`);
        if (retries > 0) {
            console.log(`Retrying (${retries})...`);
            await new Promise(res => setTimeout(res, 5000)); // wait for 5 seconds before retrying
            return await connectToDatabase(retries - 1);
        } else {
            console.error("Could not connect to the database. Exiting...");
            process.exit(1);
        }
    }
};

const closeDatabase = async () => {
    db.close().then(() => {
        console.log('Closed the database connection.');
        process.exit(0);
    }).catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
}

export {
    connectToDatabase,
    closeDatabase
}
