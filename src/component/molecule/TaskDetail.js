import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import LinearProgressWithLabel from "../atom/progressBar";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
});

function TaskDetail({
  taskName,
  onChangeName,
  onClickDelete,
  percentageTask,
  idGroupTask,
  handleOnEdit,
  idTask,
  handleChangeIdTask,
  handleSelectName,
  handleSelectPercentage,
  indexGroupTask,
  moveTaskMethod,
  toDoGroupLength,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleClose();
    console.log(onChangeName);
    onChangeName("Edit Task");
    handleChangeIdTask(idTask);
    handleOnEdit(idGroupTask);
    handleSelectName(taskName);
    handleSelectPercentage(percentageTask);
  };
  const handleDeleteClick = () => {
    handleChangeIdTask(idTask);
    handleOnEdit(idGroupTask);
    handleClose();
    onClickDelete();
  };

  const handleMoveRightTask = () => {
    let targetIndex = indexGroupTask + 1;
    // handleChangeIdTask(idTask);
    // handleOnEdit(idGroupTask);
    // console.log(idTask);
    // console.log(idGroupTask);
    moveTaskMethod(targetIndex, idGroupTask, idTask);
  };

  const handleMoveLeftTask = () => {
    let targetIndex = indexGroupTask - 1;
    // handleChangeIdTask(idTask);
    // handleOnEdit(idGroupTask);
    moveTaskMethod(targetIndex, idGroupTask, idTask);
  };

  const checkGroupTaskView = () => {
    if (indexGroupTask == 0) {
      return (
        <MenuItem onClick={handleMoveRightTask}>
          {" "}
          <ArrowRightAltOutlinedIcon fontSize="small" />
          Move Right
        </MenuItem>
      );
    } else if (indexGroupTask == toDoGroupLength - 1) {
      return (
        <MenuItem onClick={handleMoveLeftTask}>
          {" "}
          <ArrowBackIcon fontSize="small" />
          Move Left
        </MenuItem>
      );
    } else {
      return (
        <div>
          <MenuItem onClick={handleMoveLeftTask}>
            {" "}
            <ArrowBackIcon fontSize="small" />
            Move Left
          </MenuItem>
          <MenuItem onClick={handleMoveRightTask}>
            {" "}
            <ArrowRightAltOutlinedIcon fontSize="small" />
            Move Right
          </MenuItem>
        </div>
      );
    }
  };
  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <p>{taskName}</p>
        <LinearProgressWithLabel value={percentageTask} />
      </CardContent>
      <CardActions>
        <IconButton
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {" "}
          <MoreHorizOutlinedIcon fontSize="small" />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {checkGroupTaskView()}
          <MenuItem onClick={handleEditClick}>
            {" "}
            <EditOutlinedIcon fontSize="small" /> Edit{" "}
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            {" "}
            <DeleteOutlineOutlinedIcon /> Delete{" "}
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

export default TaskDetail;
