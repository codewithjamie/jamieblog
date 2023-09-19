import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './style.js'
import { createPost, updatePost } from '../../actions/posts.js';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: '', title: '', content: '', tags: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
            clear();
        } else {
            dispatch(createPost(postData));
            clear(); 
        }
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', content   : '', tags: '' })
    }

    return (
        <Paper className={classes.paper}>
            <form 
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
                >
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Post</Typography>
                <TextField 
                    name='creator' 
                    variant='outlined' 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ... postData, creator: e.target.value })}
                />
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label="Title" 
                    fullWidth 
                    value={postData.title}
                    onChange={(e) => setPostData({ ... postData, title: e.target.value })}
                />
                <TextField 
                    name='content' 
                    variant='outlined' 
                    label="Content" 
                    multiline
                    fullWidth 
                    value={postData.content}
                    onChange={(e) => setPostData({ ... postData, content: e.target.value })}
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label="Tags" 
                    fullWidth 
                    value={postData.tags}
                    onChange={(e) => setPostData({ ... postData, tags: e.target.value.split(',') })}
                />                
                
                <Button className={classes.buttonSubmit} variant='contained' style={{ backgroundColor: '#000', color: '#fff'}} size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;