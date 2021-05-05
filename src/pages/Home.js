import './Home.css';
import GroupTask from '../component/organism/GroupTask';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CreateAndEditTask from '../component/molecule/CreateAndEditTask';
import DeleteAlert from '../component/molecule/DeleteAlert';
import axios from 'axios';

function Home() {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [modalName, setModalName] = useState("New Task");
    const [idGroupTask, setIdGroupTask] = useState();
    const [toDoGroup, setToDoGroup] = useState([]);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const getLogin = async () => {
            const resultLogin = {
                email: "richardwilliam02@gmail.com",
                password: "12345"
            }

            const res = await axios.post("https://todos-project-api.herokuapp.com/auth/login", resultLogin);
            const token = res.data.auth_token;
            sessionStorage.setItem("tokenLogin", token);

            getTodoGroup();
        }

        const getTodoGroup = async () => {
            const token = sessionStorage.getItem("tokenLogin");
            const config = {
                headers: { Authorization: "Bearer " + token }
            }

            const result = await axios(
                "https://todos-project-api.herokuapp.com/todos", config
            );
            setToDoGroup(result.data);
        }

        getLogin();
    }, []);

    const createTask = (taskName, taskPercentage) => {
        const token = sessionStorage.getItem("tokenLogin");
        const config = {
            headers: { Authorization: "Bearer " + token }
        }
        const msg = {
            name: taskName,
            progress_percentage: taskPercentage
        }
        // console.log(idGroupTask);
        axios.post(`https://todos-project-api.herokuapp.com/todos/${idGroupTask}/items`, msg, config)
            .then(() => {
                setTrigger(!trigger);
            });
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleClose = () => {
        setOpen(false);
    };
    console.log(modalName);

    const handleChangeModalName = (name) => {
        setModalName(name);
        setOpen(true);
    };

    const handleChangeId = (res) => {
        setIdGroupTask(res);
    }

    const groupTaskComponent = toDoGroup.map((res) => {
        return (
            <Grid style={{ paddingLeft: "6px", paddingRight: "8px" }} item xs={3}>
                <GroupTask idGroupTask={res.id} nameGroupTask={res.title} month={res.description} onClickModal={handleOpen} onChangeName={handleChangeModalName} onClickDelete={handleOpenDelete} handleOnCreate={handleChangeId} trigger={trigger} />
            </Grid>
        );

    });
    return (
        <div style={{ display: "flex" }}>
            <div className="rectangle">
            </div>

            <div className="content">
                <p>Product Roadmap</p>
                <Grid container spacing={0}>
                    {toDoGroup.length != 0 ? groupTaskComponent : <></>}
                </Grid>

            </div>
            <CreateAndEditTask nameActivity={modalName} open={open} onClose={handleClose} idGroupTask={idGroupTask} createTask={createTask} />
            <DeleteAlert open={openDelete} onClose={handleCloseDelete} />
            {/* <Modal
            open={open}>
                <div> apapun </div>
            </Modal> */}
        </div>
    );
}

export default Home;

