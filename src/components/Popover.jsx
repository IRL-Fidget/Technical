import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    addButton: {
        position: "relative",
        top: "7px"
    }
}));

const CustomPopover = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(props.anchor);
  }, [props.anchor])

  const handleClose = () => {
    setAnchorEl(null);
    props.onClose(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <TextField label="New Tag" value={props.tag} onChange={(e) => props.setTag(e.target.value)}/>
        <Button className={classes.addButton} variant="contained" color="primary" onClick={props.onClick}> Add Tag </Button>
      </Popover>
    </div>
  );
}

export default CustomPopover;