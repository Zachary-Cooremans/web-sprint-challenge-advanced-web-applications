import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'

const initialState = {
  username: 'Lambda',
  password: 'School',
  error: ''
}
const Login = (e) => {

  const [login, setLogin] = useState(initialState)

  let history = useHistory()

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleLogin = (e) => {
    e.preventDefault();
    if(login.username !== 'Lambda' || login.password !== 'School') {
      setLogin({...login, error:'Please fill our required fields correctly'})
    } else {
      setLogin({...login, error: ''})
    }
    
    axios
    .post(`http://localhost:5000/api/login`, login)
    .then((res) => {
      localStorage.setItem("token", res.data.payload);
      history.push('/bubbles')
    })
    .catch((err) => {
      setLogin({...login, error: 'Please fill out fields correctly'})
      console.log(err)
    })
  }

  const error = login.error;
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={handleLogin}>
          <input id='username' data-testid='username'
            type='text'
            name='username'
            value={login.username}
            onChange={handleChange}
          />

          <input id='password' data-testid='password' 
            type='text'
            name='password'
            value={login.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.