import React, {useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Modal, IconButton, Grid} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    modalPaper:{
        position: 'absolute',
        color:'white',
        width: 400,
        backgroundColor: '#404040',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top:'35%',
        left:'39%'
    },
    submitbtn:{
        margin:'20px'
    },
    cancelbtn:{
        margin:'20px'
    }
    }));

    export default function UploadButtons() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState ('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChangeHandler = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setOpen(true);
    }
    const onSubmitHandler = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setOpen(false);

        try{
            const res = await axios.post('http://localhost:8000/api/upload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName, filePath} = res.data;
            setUploadedFile({fileName, filePath});
        }catch(err){
            if (err.response.status === 500){
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }
        }
    }
    
    const uploadClose = () => {
        setOpen(false);
        setFile('');
        setFileName('Choose File')
    };
    
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChangeHandler}
            />
            <label htmlFor="contained-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <AttachFileIcon />
            </IconButton>
            </label>
            <Modal
                open={open}
                onClose={uploadClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <form onSubmit={onSubmitHandler}>
                    <Grid container className={classes.modalPaper} spacing={4}>
                        <Grid item xs={12}>
                            <div>
                            <h2 id="simple-modal-title">{fileName}</h2>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.cancelbtn} onClick={uploadClose} component="span" color="secondary">
                                Cancel
                            </Button>
                            <Button className={classes.submitbtn} type="submit" variant="contained" color="primary">
                                Upload
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Modal> 
        </div>
    );
}