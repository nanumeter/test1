import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
    },
};


function NavBar(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <AppBar postion="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        행동경제학적 프로파일링 실험
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);