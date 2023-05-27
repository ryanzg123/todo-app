import express from 'express';
import todosRouter from './todos.js';
import {
    connectToDatabase,
    closeDatabase
} from '../db/connectDb.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000'}))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const setup = async () => {
    try {
        const db = await connectToDatabase();
        app.use('/api/todos', todosRouter(db));

        // Start the server
        const port = 3001;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start the application:', err);
        process.exit(1);
    }
}

setup();

// Close the database connection on process exit
process.on('SIGINT', () => {
    closeDatabase();
});
