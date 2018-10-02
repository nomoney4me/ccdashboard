import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Promise from 'bluebird';

import './App.css';
// // Styles
// // CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// // Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// // Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// // Import Main styles for this application
import './scss/style.css'

// // Containers
import DefaultLayout from './Pages/DefaultLayout';
// // Pages
// import { Login, Page404, Page500 } from './views/Pages';
import Login from './Pages/Login';


const Page404 = () => {
  return <p>404 page</p>
}
const Page500 = () => {
  return <p>500 page</p>
}

// // import { renderRoutes } from 'react-router-config';

import moment from 'moment';
import { detect } from 'detect-browser';

import { connect } from 'react-redux';
import { actionCreators } from './redux/store';
const mapStateToProps = (state) => ({ state: state });

class App extends Component {
  componentWillMount() {
    const browser = detect();
    if(browser) {
      switch (browser.name) {
        case 'ie': 
          window.alert('IE is not fully supported, use it at your own risk. If you have issues, please switch browser to Chrome/Firefox/Safari/Edge.')
          break;
        default:
      }
    }
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />

          { !this.props.state.role 
            ? <Route path="/" name="Home" component={DefaultLayout} />
            : <Redirect to="/login" />
          }

        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
