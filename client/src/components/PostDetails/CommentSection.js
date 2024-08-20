import React, { useEffect, useRef, useState } from 'react'
import useStyles from './styles'
import { Button, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        commentsRef.current.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' });
    }, [comments]);

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const updatedComments = await dispatch(commentPost(finalComment, post._id));
        setComments(updatedComments);
        setComment("")
    };
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer} ref={commentsRef}>
                    <Typography gutterBottom variant='h6' >Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1' >
                            <strong>{c?.split(': ')[0]}</strong>:
                            {c?.split(':')[1]}
                        </Typography>
                    ))
                    }
                </div>
                {user ? (
                    <div style={{ width: isSmallScreen ? '100%' : '70%' }}>
                        <Typography gutterBottom variant='h6' >Write a comment</Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            variant='outlined'
                            value={comment}
                            label='Comment'
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick} >Submit</Button>
                    </div>
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary" style={{ margin: '20px' }}>
                        Please log in to write comments.
                    </Typography>
                )}

            </div>
        </div>
    )
}

export default CommentSection
