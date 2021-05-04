import React from 'react';
import Button from '@material-ui/core/Button';


function Tombol({color,text}){
    return(
        <div style={{marginLeft:'15px'}}>
            <Button variant="outlined" color={color}>{text}</Button>
        </div>

    );

}

export default Tombol;