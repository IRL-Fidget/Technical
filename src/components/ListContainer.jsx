import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TextField from "@material-ui/core/TextField";

import { deleteArticle } from "api/requests";
import { toast } from 'react-toastify';
import { ArticleContext } from "views/Contents";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  create: {
    float: "right"
  }
}));

const ListContainer = props => {
  const classes = useStyles();
  const { list = [], setSelectedArticle, openDrawer } = props;
  const ArticleCtx = useContext(ArticleContext);

  const onClickDelete = async (e, item) => {
    e.preventDefault();

    try {
      const response = await deleteArticle(item.id);
      if(response?.status === 200){
        toast.success("Deleted Article " + item.title)
        removeArticle(item);
      }
      else{
          toast.error("Could not delete Article " + item.title);
      }
    } catch (error) {
      toast.error("Could not delete Article " + item.title);
    }
  }

  const removeArticle = (item) => {
    ArticleCtx.setArticles(
        ArticleCtx.articleList.filter(article => article.id !== item.id)
      );
  }

  const handleSearch = (e) => {
    // if search is returned to empty then reset display back
    if(!e.target.value) {
      ArticleCtx.setDisplayArticles(ArticleCtx.articleList)
    }
    else{
      ArticleCtx.setDisplayArticles(
        ArticleCtx.articleList.filter(article => { 
          // move title and tags into lowercase string, easier to search
          let searchItems = article.title.toLowerCase() + " ";
          article.tags.forEach(tag => searchItems += tag.toLowerCase() + " ");
          return searchItems.includes(e.target.value.toLowerCase())
        })
      );
    }
  }

  const cListItem = (item, index) => {
      return (
        <React.Fragment key={index}>
            <ListItem key={index} button onClick={() => setSelectedArticle(item)}>
                <ListItemIcon>
                <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                    <IconButton onClick={(e) => 
                        onClickDelete(e, item)
                    } edge="end">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
      );
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <TextField label="Search" onChange={handleSearch}/>
          <IconButton className={classes.create}
            onClick={() => openDrawer(true)}
          >
            <CreateIcon />
          </IconButton>
        </ListSubheader>
      }
      className={classes.root}
    >

      {list.map((item, idx) => {
          return(
          cListItem(item, idx)
          );
      })}

    </List>
  );
}

export default ListContainer;