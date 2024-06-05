import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, Button, IconButton, Grid, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const categoryColors = {
        과제: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
        일정: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
        수업: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
        친구: { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
        다른것: { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
    };

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const colors = categoryColors[taskObj.Category] || { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" };

    return (
        <MuiCard style={{ marginBottom: '15px' }}>
            <CardContent style={{ backgroundColor: colors.secondaryColor }}>
                <Typography variant="h6" style={{ color: colors.primaryColor, marginBottom: '10px', textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                    {taskObj.Name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>
                    {taskObj.Description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
                    <strong>Category: </strong>{taskObj.Category}
                </Typography>
                <Grid container justifyContent="flex-end" style={{ marginTop: '10px' }}>
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                        check
                    </Typography>
                    <Checkbox
                        checked={taskObj.completed}
                        onChange={() => updateListArray({ ...taskObj, completed: !taskObj.completed }, index)}
                    />
                    <IconButton onClick={toggle} style={{ color: colors.primaryColor }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} style={{ color: colors.primaryColor }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </CardContent>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MuiCard>
    );
};

export default Card;
