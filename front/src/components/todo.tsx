import { useState } from 'react';
import axios from 'axios';
import { SingleTodoResponse } from '../models/todo';
import { Card, Text, Input, Dropdown } from '@nextui-org/react';

interface TodoProps {
    todo: SingleTodoResponse;
    index: number;
}

const Todo: React.FC<TodoProps> = (props: TodoProps) => {
    return (
        <div>
            <Card css={{ width: '400px' }}>
                <Card.Body>
                    <Text h6>
                        {props.index}. {props.todo.title}
                    </Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Todo;
