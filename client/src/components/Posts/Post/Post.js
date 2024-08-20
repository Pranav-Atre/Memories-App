import React, { useState } from 'react'
import useStyles from "./styles"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import moment from "moment"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete"
import ThumbsUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from "react-redux"
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = (user?.result?.sub || user?.result?._id)
  const hasLiked = post.likes.find((like) => like === userId)
  const [likes, setLikes] = useState(post.likes); 

  const handleLike = () => {
     dispatch(likePost(post._id))
     if (hasLiked) {
        setLikes(post.likes.filter((like)=> like !== userId))
     } else {
        setLikes([...post.likes, userId])
     }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbsUpAltIcon fontSize="small" />&nbsp;{likes.length > 1 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  }
  const openPost = () => history.push(`posts/${post._id}`)
  return (
    <Card className={classes.card} raised elevation={6}>
      <div onClick={openPost} className={classes.cardAction} role="button" tabIndex={0} onKeyDown={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
        <CardContent
          style={{ paddingTop: '5px', paddingBottom: '5px' }}
        >
          <Typography className={classes.textTruncate} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>

    </Card>
  )
}

export default Post
