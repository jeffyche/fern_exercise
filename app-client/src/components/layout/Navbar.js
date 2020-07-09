import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
//this allows each component to be able to connect to the redux state for the whole app
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import AddPost from '../post/AddPost';

//material ui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


export class Navbar extends Component {
    
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className = "nav-container">
                    {authenticated ? (
                        <Fragment>
                            <AddPost/>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon/>
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications/>
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color = "inherit" component = { Link } to = "/">
                                Home
                            </Button>
                            <Button color = "inherit" component = { Link } to = "/login">
                                Login
                            </Button>
                            <Button color = "inherit" component = { Link } to = "/signup">
                                Signup
                            </Button>
                        </Fragment>
                    )}

                </Toolbar>
            </AppBar>
        )
    }
}

//add authentiticated to navbar prop types
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

//map the redux state to this components properties
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);