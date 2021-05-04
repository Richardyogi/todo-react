import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import TaskDetail from '../molecule/TaskDetail';



import './GroupTask.css';

const useStyles = makeStyles( (theme) => ({
    Button: {
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
    },
}));

function GroupTask({ nameGroupTask, month, taskName , onClickModal, onChangeName, onClickDelete }) {
    const classes = useStyles();
    const handleChangeModalName = () => {
        onClickModal();
        onChangeName("New Task")
    };
    
    console.log(onChangeName);
    
    return (

        <div className="rectangleGroupTask">
            <div className="titleTask">
                <p>{nameGroupTask}</p>
            </div>
            <div className="month">
                <p>{month}</p>
            </div>

            <TaskDetail taskName="balalalalala" onChangeName={onChangeName} onClickDelete={onClickDelete} />
            <Button variant="contained"
                color="default" className={classes.Button}
                startIcon={<AddCircleIcon />} onClick={handleChangeModalName} >New Task
            </Button>
           
        </div>

    );
}

export default GroupTask;