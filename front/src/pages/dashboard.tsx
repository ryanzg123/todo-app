import { useEffect, useState } from 'react';
import Todo from '../components/todo';
import { MultipleTodoResponses, SingleTodoResponse } from '../models/todo';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const [todo, setTodo] = useState<SingleTodoResponse>({
        title: '',
        description: '',
        user_id: 0,
        priority: 'Low',
        is_completed: false,
        is_starred: false,
    });
    const [todos, setTodos] = useState<MultipleTodoResponses>([]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/todos');
            console.log(response.status);
            console.log(response.data);
            setTodos(response.data);
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = async () => {
        console.log('title: ' + todo.title);
        console.log('description: ' + todo.description);

        try {
            const response = await axios.post(
                'http://localhost:3001/api/todos',
                todo,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            setTodo({
                ...todo,
                title: '',
                description: '',
            });
            fetchTodos();
            console.log(response);
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in Node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-center">Dashboard</h1>
            <div className="flex flex-row justify-center items-center space-x-2">
                <input
                    className="border-2 border-gray-500 rounded-md"
                    value={todo.title}
                    onChange={handleOnChange}
                    name="title"
                    placeholder="Title"
                />
                <input
                    className="border-2 border-gray-500 rounded-md"
                    value={todo.description}
                    onChange={handleOnChange}
                    name="description"
                    placeholder="Description"
                />
                <button
                    className="border-2 border-gray-500 rounded-md"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>
            {todos.map((todo, index) => (
                <Todo key={index} todo={todo} index={index + 1} />
            ))}
        </div>
    );
};

export default Dashboard;
