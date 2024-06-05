import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Checkbox } from '@mui/material';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const handleCheckboxChange = (index) => {
        const updatedTaskList = taskList.map((task, i) => {
            if (index === i) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        setTaskList(updatedTaskList);
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>Todo List</Typography>
            <Button variant="contained" color="primary" onClick={toggle}>Create Task</Button>
            <Grid container spacing={2} className="task-container">
                {taskList.map((obj, index) =>
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                    </Grid>
                )}
            </Grid>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </Container>
    );
};

export default TodoList;
