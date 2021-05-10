import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from "components/Popover";
import defaultImage from 'assets/img/defaultArticle.jpeg';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import { addTag } from 'api/requests';
import { toast } from 'react-toastify';
import update from 'immutability-helper';
import { ArticleContext } from "views/Contents";

const useStyles = makeStyles({
  root: {
    width: "80vw",
  },
  media: {
    height: "50vh",
  },
});

const ArticleCard = props => {
  const { article } = props;
  const classes = useStyles();
  const ArticleCtx = useContext(ArticleContext);

  const [anchor, setAnchor] = useState(null);
  const [tag, setTag] = useState("");

  const displayPopover = (e) => {
    setAnchor(e.currentTarget);
  }

    
  const onClickCreateTag = async (e) => {
    e.preventDefault();
    const newArray = JSON.parse(JSON.stringify(article.tags));
    newArray.push(tag);

    const payload = {
        id: article.id,
        tags: newArray
    }
    try {
      const response = await addTag(payload);
      if(response?.status === 200){
        toast.success("Tag Added");
        setAnchor(null);
        updateTags(newArray);
      }
      else{
          toast.error("Could not add Tag");
      }
    } catch (error) {
      toast.error("Could not add Tag");
    }
  }

  const onClickRemoveTag = async (e, index) => {
    e.preventDefault();
    const newArray = JSON.parse(JSON.stringify(article.tags));
    newArray.splice(index, 1);

    const payload = {
        id: article.id,
        tags: newArray
    }
    try {
      const response = await addTag(payload);
      if(response?.status === 200){
        toast.success("Removed Tag");
        updateTags(newArray);
      }
      else{
          toast.error("Could not remove Tag");
      }
    } catch (error) {
      toast.error("Could not remove Tag");
    }
  }
  
  const updateTags = (incomingTags) => {
    let index = -1;
    ArticleCtx.articleList.forEach((item, idx) => {
      if(item.id === article.id){
        index = idx;
      }
    });

    if(index !== -1) {
      const newTags = update(ArticleCtx.articleList, {
        [index]: {
          tags: { $set: incomingTags}
        }
      })
      ArticleCtx.setArticles(newTags);
      ArticleCtx.setSelectedArticle(newTags[index]);
    }
  }

  return (
    <Card className={classes.root} key={"card"+article.id}>
      <CardActionArea key={"caa" + article.id}>
        <CardMedia
          key={"cm" + article.id}
          className={classes.media}
          image={defaultImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          Category: {article.category}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" color="primary">
          Tags: 
        </Typography>
        {article && article.tags.map((tag, idx) => {
            return (
              <React.Fragment>
                <Button size="small" color="primary" onClick={(e) => onClickRemoveTag(e, idx)}>
                    {tag}
                </Button>
                {idx+1 === article.tags.length &&
                  <IconButton size="small" color="primary" onClick={(e) => displayPopover(e)}>
                      <AddCircleOutlineSharpIcon />
                  </IconButton>
                }
              </React.Fragment>
            )
        })}
        <Popover 
          anchor={anchor} 
          onClose={setAnchor} 
          onClick={onClickCreateTag}
          setTag={setTag}
          tag={tag}  
        />

      </CardActions>
    </Card>
  );
}

export default ArticleCard;