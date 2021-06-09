import React, {Component, Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Loadable from 'react-loadable';

import {routes} from './routes';

// setup fake backend
import {isUserAuthenticated} from './helpers/authUtils';

// Themes
import './assets/scss/DefaultTheme.scss';

import detectBrowserLanguage from 'detect-browser-language';
import {useTranslation} from 'react-i18next';
import Layout from './components/Layout';
import BusinessGameLayout from './components/BusinessGameLayout';
import strategicGameLayout from './components/strategicGameLayout';
import FinEdgeLayout from './components/FinEdgeLayout';

// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>;

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const AuthLayout = Loadable({
  loader: () => import('./components/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const QuizLayout = Loadable({
  loader: () => import('./components/QuizLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

// configure fake backend
// configureFakeBackend();

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect()(HOC);
};

/**
 * Main app component
 */
const App = () => {
  /**
   * Returns the layout component based on different properties
   * @param {*} props
   */
  const getLayout = (route) => {
    if (isUserAuthenticated()) {
      switch (route.layout) {
        case 'QuizLayout':
          return QuizLayout;
        case 'Layout':
          return Layout;
        case 'BusinessGameLayout':
          return BusinessGameLayout;
        case 'strategicGameLayout':
            return strategicGameLayout;
        case 'FinEdgeLayout':
            return FinEdgeLayout; 
        default:
          return AuthLayout;
      }
    }
    return NonAuthLayout;
  };

  /** change language to french */
  const {i18n} = useTranslation();
  const userLanguage = detectBrowserLanguage().split('-')[0];
  if (['fr', 'en'].includes(userLanguage)) {
    i18n.changeLanguage(userLanguage);
  } else {
    i18n.changeLanguage('fr');
  }

  /** end */

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
        {routes.map((route, index) => {
          return (
            <route.route
              key={index}
              path={route.path}
              exact
              roles={route.roles}
              component={withLayout((props) => {
                const Layout = getLayout(route);
                return (
                  <Suspense fallback={loading()}>
                    <Layout {...props} title={route.title} name={route.name}>
                      <route.component {...props} />
                    </Layout>
                  </Suspense>
                );
              })}
            />
          );
        })}
      </React.Fragment>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(App);
