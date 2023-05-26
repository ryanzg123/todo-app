import { Router } from "express";
import { Database } from "sqlite";
import todosDb from "../db/todosDb.js";
import {
    Todo,
    SingleTodoResponse,
    MultipleTodoResponses
} from "../models/todo.js";

const todosRouter = (db: Database) => {
    const router = Router();

    // GET all todos
    router.get('/', async (req, res) => {
        try {
            const todos: MultipleTodoResponses = await todosDb(db).getAll();
            res.send(todos);
        } catch (err: any) {
            console.log(`Failed to retrieve todos: ${err.message}`);
            res.status(500).send({ error: `Failed to retrieve todos: ${err.message}` });
        }
    });

    // POST todo
    router.post('/', async (req, res) => {
        try {
            // Extract the new todo data from the request body
            const newTodo: Todo = req.body;

            // Add the new todo to the database
            const addedTodo = await todosDb(db).add(newTodo);

            // Send the newly added todo back to the client
            res.status(201).send(addedTodo);
        } catch (err: any) {
            console.log(`Failed to add todo: ${err.message}`);
            res.status(500).send({ error: `Failed to add todo: ${err.message}` });
        }
    });

    return router;
}

export default todosRouter;
