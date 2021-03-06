import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import TaskDetail from "../molecule/TaskDetail";
import axios from "axios";

import "./GroupTask.css";

const useStyles = makeStyles((theme) => ({
  Button: {
    backgroundColor: "Transparent",
    backgroundRepeat: "no-repeat",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline: "none",
    marginTop: "20px",
  },
}));

function GroupTask({
  nameGroupTask,
  month,
  onClickModal,
  onChangeName,
  onClickDelete,
  idGroupTask,
  handleOnCreate,
  trigger,
  handleChangeIdTask,
  handleSelectName,
  handleSelectPercentage,
  indexGroupTask,
  moveTaskMethod,
  toDoGroupLength,
}) {
  const classes = useStyles();
  const handleChangeModalName = () => {
    handleOnCreate(idGroupTask);
    onClickModal();
    onChangeName("New Task");
    handleSelectName("");
    handleSelectPercentage(0);
  };

  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const getTodoList = async () => {
      const token = sessionStorage.getItem("tokenLogin");
      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      const result = await axios(
        `https://todos-project-api.herokuapp.com/todos/${idGroupTask}/items`,
        config
      );
      setToDoList(result.data);
      console.log(toDoList);
    };
    getTodoList();
  }, [trigger]);

  const taskDetailComponent = toDoList.map((res) => {
    return (
      <TaskDetail
        idGroupTask={idGroupTask}
        handleOnEdit={handleOnCreate}
        percentageTask={res.progress_percentage}
        taskName={res.name}
        onChangeName={onChangeName}
        onClickDelete={onClickDelete}
        idTask={res.id}
        handleChangeIdTask={handleChangeIdTask}
        handleSelectName={handleSelectName}
        handleSelectPercentage={handleSelectPercentage}
        indexGroupTask={indexGroupTask}
        moveTaskMethod={moveTaskMethod}
        toDoGroupLength={toDoGroupLength}
      />
    );
  });
  // console.log(onChangeName);

  return (
    <div className="rectangleGroupTask">
      <div className="titleTask">
        <p>{nameGroupTask}</p>
      </div>
      <div className="month">
        <p>{month}</p>
      </div>

      {toDoList.length !== 0 ? taskDetailComponent : <></>}
      <Button
        variant="contained"
        color="default"
        className={classes.Button}
        startIcon={<AddCircleIcon />}
        onClick={handleChangeModalName}
      >
        New Task
      </Button>
    </div>
  );
}

export default GroupTask;
