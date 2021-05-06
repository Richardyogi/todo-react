import "./Home.css";
import GroupTask from "../component/organism/GroupTask";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CreateAndEditTask from "../component/molecule/CreateAndEditTask";
import DeleteAlert from "../component/molecule/DeleteAlert";
import axios from "axios";

function Home() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [modalName, setModalName] = useState("New Task");
  const [idGroupTask, setIdGroupTask] = useState();
  const [idTask, setIdTask] = useState();
  const [selectName, setSelectName] = useState("");
  const [selectPercentage, setSelectPercentage] = useState(0);
  const [toDoGroup, setToDoGroup] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getLogin = async () => {
      const resultLogin = {
        email: "richardwilliam02@gmail.com",
        password: "12345",
      };

      const res = await axios.post(
        "https://todos-project-api.herokuapp.com/auth/login",
        resultLogin
      );
      const token = res.data.auth_token;
      sessionStorage.setItem("tokenLogin", token);

      getTodoGroup();
    };

    const getTodoGroup = async () => {
      const token = sessionStorage.getItem("tokenLogin");
      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      const result = await axios(
        "https://todos-project-api.herokuapp.com/todos",
        config
      );
      setToDoGroup(result.data);
    };

    getLogin();
  }, []);

  const createTask = (taskName, taskPercentage) => {
    const token = sessionStorage.getItem("tokenLogin");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const msg = {
      name: taskName,
      progress_percentage: taskPercentage,
    };
    // console.log(idGroupTask);
    axios
      .post(
        `https://todos-project-api.herokuapp.com/todos/${idGroupTask}/items`,
        msg,
        config
      )
      .then(() => {
        setTrigger(!trigger);
      });
  };

  const editTask = (taskName, taskPercentage) => {
    const token = sessionStorage.getItem("tokenLogin");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const msg = {
      target_todo_id: idGroupTask,
      name: taskName,
      progress_percentage: taskPercentage,
    };
    console.log(msg);
    axios
      .patch(
        `https://todos-project-api.herokuapp.com/todos/${idGroupTask}/items/${idTask}`,
        msg,
        config
      )
      .then(() => {
        setTrigger(!trigger);
      });
  };

  const deleteTask = () => {
    const token = sessionStorage.getItem("tokenLogin");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    axios
      .delete(
        `https://todos-project-api.herokuapp.com/todos/${idGroupTask}/items/${idTask}`,
        config
      )
      .then(() => {
        setTrigger(!trigger);
      });
  };

  const moveTask = (index, idGroup, idTask) => {
    const token = sessionStorage.getItem("tokenLogin");
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    console.log(toDoGroup[index]);
    const msg = {
      target_todo_id: toDoGroup[index].id,
    };
    axios
      .patch(
        `https://todos-project-api.herokuapp.com/todos/${idGroup}/items/${idTask}`,
        msg,
        config
      )
      .then(() => {
        setTrigger(!trigger);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(modalName);

  const handleChangeModalName = (name) => {
    setModalName(name);
    setOpen(true);
  };

  const handleChangeIdGroupTask = (res) => {
    setIdGroupTask(res);
  };

  const handleChangeIdTask = (res) => {
    setIdTask(res);
  };

  const handleSelectPercentage = (res) => {
    setSelectPercentage(res);
  };

  const handleSelectName = (res) => {
    console.log(res);
    setSelectName(res);
    console.log(selectName);
  };

  const groupTaskComponent = toDoGroup.map((res, index) => {
    console.log(index);
    return (
      <Grid style={{ paddingLeft: "6px", paddingRight: "8px" }} item xs={3}>
        <GroupTask
          idGroupTask={res.id}
          nameGroupTask={res.title}
          month={res.description}
          onClickModal={handleOpen}
          onChangeName={handleChangeModalName}
          onClickDelete={handleOpenDelete}
          handleOnCreate={handleChangeIdGroupTask}
          handleChangeIdTask={handleChangeIdTask}
          trigger={trigger}
          handleSelectName={handleSelectName}
          handleSelectPercentage={handleSelectPercentage}
          indexGroupTask={index}
          moveTaskMethod={moveTask}
          toDoGroupLength={toDoGroup.length}
        />
      </Grid>
    );
  });
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="rectangle"></div>

      <div className="content">
        <p>Product Roadmap</p>
        <Grid container spacing={0}>
          {toDoGroup.length !== 0 ? groupTaskComponent : <></>}
        </Grid>
      </div>
      <CreateAndEditTask
        nameActivity={modalName}
        open={open}
        onClose={handleClose}
        idGroupTask={idGroupTask}
        createTask={createTask}
        editTask={editTask}
        selectName={selectName}
        selectPercentage={selectPercentage}
      />
      <DeleteAlert
        open={openDelete}
        onClose={handleCloseDelete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default Home;
