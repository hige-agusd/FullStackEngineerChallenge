import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-instance';
import Home from '../../components/Home';
import './App.css';
import AuthUserContext from '../../hoc/Session/context';
import UsersContext from '../../hoc/Users/context';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      employees: []
    }
  }

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees = () => {
      axios.get('/users').then(res => {
          this.setState({employees: res.data.users})
      }).catch(err => {
          console.log(err);
      });
  }

  loginHandler = (authUser) => {
    this.setState({authUser});
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <AuthUserContext.Provider value={{authUser: this.state.authUser, setAuthUser: this.loginHandler}}>
            <UsersContext.Provider value={{users: this.state.employees, refreshUsers: this.loadEmployees}} >
              <Route path="/" exact component={Home} />
            </UsersContext.Provider>
          </AuthUserContext.Provider>
        </Switch>
      </div>
    );
  }
}

export default App;
