let priority = ["Low", "Medium", "High", "Urgent"] as const;
type priority = typeof priority[number];

interface Todo {
    id?: number;
    user_id: number;
    title: string;
    description?: string;
    priority: priority;
    is_completed: boolean;
    is_starred: boolean;
}

type SingleTodoResponse = Todo;
type MultipleTodoResponses = Todo[];

export {
    Todo,
    SingleTodoResponse,
    MultipleTodoResponses
}
