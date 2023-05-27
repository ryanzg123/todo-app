import React, { useState } from 'react';

type Todo = {
    id: number;
    task: string;
    completed: boolean;
};

function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState<string>('');

    const handleAddTask = () => {
        setTodos([
            ...todos,
            {
                id: Math.random(), // Not the best way to create unique ids but ok for this simple app
                task,
                completed: false,
            },
        ]);
        setTask('');
    };

    const handleCompleteTask = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    const handleDeleteTask = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="New task"
            />
            <button onClick={handleAddTask}>Add task</button>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <p
                        style={{
                            textDecoration: todo.completed
                                ? 'line-through'
                                : '',
                        }}
                    >
                        {todo.task}
                    </p>
                    <button onClick={() => handleCompleteTask(todo.id)}>
                        {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => handleDeleteTask(todo.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TodoApp;
