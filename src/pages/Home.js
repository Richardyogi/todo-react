import './Home.css';
import GroupTask from '../component/organism/GroupTask';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateAndEditTask from '../component/molecule/CreateAndEditTask';
import DeleteAlert from '../component/molecule/DeleteAlert';

function Home(){
    const [open, setOpen] = React.useState(false);
    const [openDelete,setOpenDelete] = React.useState(false);
    const [modalName, setModalName] = React.useState("CreateTask");
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
    return(
        <div style={{display:"flex"}}>
            <div className ="rectangle">    
            </div>

            <div className ="content">
                <p>Product Roadmap</p>
                  <Grid container spacing = {0}>

                    <Grid style={{paddingLeft:"6px",paddingRight:"8px"}} item xs={3}>
                        <GroupTask nameGroupTask="Task1" month="Jan-Feb" onClickModal={handleOpen} onChangeName={handleChangeModalName} onClickDelete={handleOpenDelete}/> 
                    </Grid>
                    <Grid style={{paddingLeft:"6px",paddingRight:"8px"}} item xs={3}>
                        <GroupTask nameGroupTask="Task1" month="Jan-Feb"/> 
                    </Grid>
                    <Grid style={{paddingLeft:"6px",paddingRight:"8px"}} item xs={3}>
                        <GroupTask nameGroupTask="Task1" month="Jan-Feb"/> 
                    </Grid>
                    <Grid style={{paddingLeft:"6px",paddingRight:"8px"}} item xs={3}>
                        <GroupTask nameGroupTask="Task1" month="Jan-Feb"/> 
                    </Grid>
                  </Grid>
                 
            </div> 
            <CreateAndEditTask nameActivity={modalName} open={open} onClose={handleClose} />
            <DeleteAlert open={openDelete} onClose={handleCloseDelete} />
            {/* <Modal
            open={open}>
                <div> apapun </div>
            </Modal> */}
        </div>
    );
}

export default Home;

