import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
const loading = () => <div className="text-center"></div>;

class StrategicGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCondensed: false,
    };
  }

  componentWillMount() {
    document.body.style.paddingBottom = '0px';
  }

  componentWillUnmount() {
    document.body.style.height = '100%';
    document.body.style.margin = '0px';
    document.body.style.padding = '0px';
  }

  render() {
    // get the child view which we would like to render
    const children = this.props.children || null;
    return (
      <div>
        <Suspense fallback={loading()}>{children}</Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};
export default connect(mapStateToProps, null)(StrategicGame);
