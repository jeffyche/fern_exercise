import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//redux
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const style = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class PostDialog extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
        this.props.getPost(this.props.postId);
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const { classes, 
            post: { postId, body, createdAt, numLikes, numComments, imageUrl, username }, 
            UI: { loading } 
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={imageUrl} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={6}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${username}`}
                        >
                        @{username}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>

                    <LikeButton postId={postId}/>
                    <span>{numLikes} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{numComments} Comments</span>

                </Grid>
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(PostDialog));