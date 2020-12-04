import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function DetailView() {
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                <p>Detail</p>
            </Typography>
        </Container>
        </React.Fragment>
    );
    }