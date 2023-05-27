import { Database } from 'sqlite';
import { Todo } from '../models/todo.js';

const todoDb = (db: Database) => {
    return {
        getAll: async () => {
            return await db.all('SELECT * FROM todos');
        },
        add: async (todo: Todo) => {
            const statement = await db.prepare('INSERT INTO todos (user_id, title, description, is_completed, priority, is_starred) VALUES (?, ?, ?, ?, ?, ?)');
            const result = await statement.run(todo.user_id, todo.title, todo.description, todo.is_completed, todo.priority, todo.is_starred);

            return { id: result.lastID, ...todo };
        },
        update: async (todo: Todo) => {
        
        },
    }
}

export default todoDb;
