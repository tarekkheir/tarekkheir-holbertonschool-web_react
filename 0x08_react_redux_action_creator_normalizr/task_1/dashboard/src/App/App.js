import React from 'react';
import Notifications from "../Notifications/Notifications";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CourseList from "../CourseList/CourseList";
import propTypes from "prop-types";
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { StyleSheet, css } from "aphrodite";
import AppContext, { user, logOut } from "./AppContext";


const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

const listNotifications = [
  { id: 1, value: 'New course available', type: 'default' },
  { id: 2, value: 'New resume available', type: 'urgent' },
  { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user,
      logOut: this.logOut,
      listNotifications: listNotifications
    };
    this.listener = this.listener.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listener);
  }

  listener = (event) => {
    if (event.key === 'h' && event.ctrlkey === true) {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  handleDisplayDrawer = () => { this.setState({ displayDrawer: true }); }
  handleHideDrawer = () => { this.setState({ displayDrawer: false }); }

  logOut = () => { this.setState({ user }); }

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      }
    });
  }

  markNotificationAsRead = (id) => {
    this.setState({
      listNotifications: this.state.listNotifications.filter((item) => {
        return item.id !== id;
      }),
    });
  }


  render() {
    const { user: { isLoggedIn } } = this.state;

    return (
      <AppContext.Provider value={{ user: this.state.user, logOut: this.state.logOut }} >
        <Notifications
          listNotifications={this.state.listNotifications}
          displayDrawer={this.state.displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
          markNotificationAsRead={this.markNotificationAsRead} />
        <div className="App">
          <Header />
        </div>
        <div className={('App-body', css(styles.AppBody))}>
          {isLoggedIn ?
            <BodySectionWithMarginBottom title="Course List">
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom> :
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={this.logIn} />
            </BodySectionWithMarginBottom>}
          <BodySection title="News from the School">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </BodySection>
          <div className={css(styles.footer)}>
            <Footer />
          </div>
        </div>
      </AppContext.Provider >
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

const styles = StyleSheet.create({
  AppBody: {
    padding: '50px'
  },

  footer: {
    padding: '0',
  },
});

export default App;
