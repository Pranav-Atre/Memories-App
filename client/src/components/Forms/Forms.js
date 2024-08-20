import React, { useEffect, useState } from 'react'
import useStyles from "./styles"
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64"; 
import { useDispatch, useSelector } from 'react-redux';  
import { createPosts, updatePost } from '../../actions/posts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Forms = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: ""})
  const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=> p._id === currentId): null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(()=>{
    if(post) {setPostData(post)};
  },[currentId, post]) 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updatePost(currentId, {...postData, name : user?.result.name}));
    } else {
      dispatch(createPosts({...postData, name : user?.result.name},history));
    }
    clear();
  }
  const clear = ()=>{
    setCurrentId(null);
    setPostData({
      title: "", message: "", tags: "", selectedFile: ""
    });
  }

  if (!user?.result?.name){
    return (
      <Paper>
        <Typography variant="h6" align="center">Please Sign In to create your own memories</Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a Memory</Typography>
        <TextField name='title' label='Title' variant='outlined' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name='message' label='Message' variant='outlined' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name='tags' label='Tags' variant='outlined' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
        <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form> 
    </Paper>
  )
}

export default Forms
