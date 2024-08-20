import React from 'react'
import Post from "./Post/Post"
import useStyles from "./styles"
import { useSelector } from 'react-redux'
import {Grid, CircularProgress} from "@material-ui/core"

const Posts = ({setCurrentId}) => {
  const {posts, isLoading} = useSelector((state)=> state.posts);
  const classes = useStyles();
  if(!posts.length && !isLoading) return 'No posts yet'
  return (
    isLoading ? <CircularProgress/> : (
      <Grid container className={classes.mainContainer} alignItems='stretch' spacing={3} >
          {posts.map((post)=>(
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
      </Grid>
    )
  )
}

export default Posts
