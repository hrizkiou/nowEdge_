import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/actions';

const  Logout = (props) => {

    useEffect(() => {
        props.logoutUser(props.history);
    }, [props])

    return(<></>)
}

export default withRouter(connect(null, { logoutUser })(Logout));