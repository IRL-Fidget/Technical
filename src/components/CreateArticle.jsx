import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createArticle } from 'api/requests';
import { toast } from 'react-toastify';
import { ArticleContext } from "views/Contents";

const useStyles = makeStyles((theme) => ({
    root: {
       width: "250px",
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    button: {
        marginLeft: "10px"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
  }));

const CreateArticle = props => {
  const classes = useStyles();
  const ArticleCtx = useContext(ArticleContext);
  const { onClose } = props;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const onClickCreate = async (e) => {
    e.preventDefault();

    if(!title || !desc || !category){ 
        toast.warning("Title, Description, are Category are requied");    
        return false;
    }

    const payload = {
        title: title,
        description: desc,
        category: category,
        tags: tags.split(',')
    }
    try {
      const response = await createArticle(payload);
      if(response?.status === 201){
        toast.success("Article Created");
        ArticleCtx.setArticles(orgArticles => [...orgArticles, response.data]);
        onClose();
      }
      else{
          toast.error("Could not create Article");
      }
    } catch (error) {
      toast.error("Could not create Article");
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
    <Grid container direction="column" spacing={1}>
        <Grid item>
            <TextField
                id="txtTitle"
                label="Ttile"
                required
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </Grid>
        <Grid item>
            <TextField
                id="txtDescription"
                label="Description"
                required 
                variant="outlined"
                onChange={(e) => setDesc(e.target.value)}
            />
        </Grid>
        <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="lblCategory">Category</InputLabel>
                <Select
                    labelId="slcLblCategory"
                    id="slcCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Audio"}>Audio</MenuItem>
                    <MenuItem value={"Video"}>Video</MenuItem>
                    <MenuItem value={"Quiz"}>Quiz</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item>
            <TextField
                id="outlined-password-input"
                label="Tags"
                type="text"  
                variant="outlined"
                onChange={(e) => setTags(e.target.value)}
            />
        </Grid>
        <Grid item>
            <Button 
                className={classes.button} 
                variant="contained" 
                color="primary" 
                onClick={(e) => onClickCreate(e)}>
                Create
            </Button>
        </Grid>

    </Grid>
    </form>
  );
}

export default CreateArticle;