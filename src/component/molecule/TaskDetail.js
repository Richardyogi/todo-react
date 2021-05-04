import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import LinearProgressWithLabel from '../atom/progressBar';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


function TaskDetail({taskName,onChangeName,onClickDelete}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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
    };
    return(
        <Card variant="outlined">
            <CardContent>
                <p>{taskName}</p>
                <LinearProgressWithLabel value={70}  />
            </CardContent>
            <CardActions>
                <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}> <MoreHorizOutlinedIcon fontSize="small" /> 
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}> <ArrowRightAltOutlinedIcon fontSize="small" />Move Right</MenuItem>
                    <MenuItem onClick={handleEditClick} > <EditOutlinedIcon fontSize="small" /> Edit </MenuItem>
                    <MenuItem onClick={onClickDelete}> <DeleteOutlineOutlinedIcon /> Delete </MenuItem>
                </Menu>

            </CardActions>
        </Card>
    );
}

export default TaskDetail;