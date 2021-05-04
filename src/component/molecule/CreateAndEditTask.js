import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Tombol from '../atom/Tombol';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: '70%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

function CreateAndEditTask({ nameActivity, open, onClose }) {

    const classes = useStyles();
    // console.log(open, onClose);
    return (

        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{nameActivity}</h2>
                        <TextField
                            id="outlined-full-width"
                            label="TaskName"
                            style={{ margin: 8 }}
                            placeholder="Example: Build Rocket To Mars"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-full-width"
                            label="Progress"
                            style={{ margin: 8 }}
                            placeholder="0%"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <Tombol color="default" text="Cancel"/> <Tombol color="primary" text="Save"/>
                        </div>
                         
                    </div>
                </div>


            </Fade>

            {/* <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{nameActivity}</h2>
            <TextField
                id="outlined-full-width"
                label="TaskName"
                style={{ margin: 8 }}
                placeholder="Example: Build Rocket To Mars"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined"
            />
            <TextField
                label="Progress"
                id="outlined-margin-dense"
                placeholder="0%"
                className={classes.textField}
                margin="dense"
                variant="outlined"
            />

            <Tombol color="default" text="Cancel"/> <Tombol color="primary" text="Save"/>       
          </div>
        </Fade> */}

        </Modal>
    );
}

export default CreateAndEditTask;