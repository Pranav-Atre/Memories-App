import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Posts from "../Posts/Posts"
import Form from "../Forms/Forms"
import { useDispatch } from "react-redux"
import { getPosts } from "../../actions/posts"
import Pagination from "../Pagination"
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import useStyles from './styles'
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts'


const Home = () => {
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search);
    }
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag)=>tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} >
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField 
                            name='search' 
                            label='Search Memories' 
                            variant='outlined'
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            />
                            <ChipInput
                            style={{margin: '10px 0'}}
                            variant='outlined'
                            label='Search Tags'
                            value={tags}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {!searchQuery && !tags.length && (
                        <Paper elevation={6} className={classes.pagination }>
                            <Pagination page={page}/>
                        </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
