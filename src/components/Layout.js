import React, { Component, Suspense } from "react";
import { connect } from 'react-redux';
const loading = () => <div className="text-center"></div>;


class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCondensed: false
        }
    }

    componentWillMount(){
        document.body.style.paddingBottom = "0px";
    }
    
    componentWillUnmount(){
        document.body.style.paddingBottom = "60px";
    }

    render() {
        // get the child view which we would like to render
        const children = this.props.children || null;
        return (
            <div className="">
               <Suspense fallback={loading()}>
                    {children}
               </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user
    }
}
export default connect(mapStateToProps, null)(Layout);
