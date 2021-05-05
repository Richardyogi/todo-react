import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tombol from "../atom/Tombol";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: "70%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function DeleteAlert({ open, onClose, deleteTask }) {
  const classes = useStyles();
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
            <h2 id="transition-modal-title">
              {" "}
              <InfoOutlinedIcon fontSize="small" />
              Delete Task
            </h2>
            <p>Are you sure want to delete this task</p>
            <p>your action can't be reverted</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Tombol method={onClose} color="default" text="Cancel" />{" "}
              <Tombol
                method={() => {
                  deleteTask();
                  onClose();
                }}
                color="secondary"
                text="Delete"
              />
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default DeleteAlert;
