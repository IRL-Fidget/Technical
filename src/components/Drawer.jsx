import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CreateArticle from 'components/CreateArticle';

const useStyles = makeStyles({
  drawer:{
      maxWidth: "300px"
  }
});

const CustomDrawer = props => {
  const { open = false, onClose } = props;
  const classes = useStyles();


  return (
    <div>
        <Drawer className={classes.drawer} anchor={"right"} open={open} onClose={onClose}>
            <CreateArticle onClose={onClose} />
        </Drawer>
    </div>
  );
}

export default CustomDrawer;