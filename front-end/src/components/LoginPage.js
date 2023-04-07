import React, { useState, useContext, useEffect } from 'react';
import Cookie from 'cookie';
import { myContext } from '../App';
import { useNavigate } from 'react-router';
import '../stylesheets/LoginPage.css';
import { LoginAlert } from './LoginAlert';
import RouteHandler from './RouterHandler';
import { Button } from 'react-bootstrap';
import HomePage from './HomePage';


const LoginPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { setCookies } = useContext(myContext);
  const [authMode, setAuthMode] = useState("signin")
  const [showAlert, setShowAlert] = useState(false);
  const [alertObj, setAlertObj] = useState({});
  const navigate = useNavigate();

  const handleLogin = () => {
    let headers = new Headers();
    headers.append('firstName', firstName)
    headers.append('lastName', lastName)
    headers.append('username', username);
    headers.append('password', password);
    fetch('http://localhost:3001/login', {
      method: 'GET',
      credentials: 'include',
      headers: headers,
    })
      .then((response) => {

        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setAlertObj(data);
          setShowAlert(true);
        }
        setCookies(Cookie.parse(document.cookie));
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error);
      }
      )
  }
  

  const handleRegister = () => {
    let headers = new Headers();
    headers.append('firstName', firstName)
    headers.append('lastName', lastName)
    headers.append('username', username);
    headers.append('password', password);
    fetch('http://localhost:3001/user/register', {
      method: 'POST',
      credentials: 'include',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if(!data.error){
          setAlertObj(data);
          setShowAlert(true);
          setAuthMode("signin");
        }else{
          setAlertObj(data);
          setShowAlert(true);
        }
        return;

      })
      .catch((error) => {
        console.log(error);
      }
      )
  };
  // const handleUpdatePassword = () => {
  //   let headers = new Headers();
  //   headers.append('username', username);
  //   headers.append('password', password);
  //   headers.append('newPassword', newPassword);
  //   fetch('http://localhost:3001/user/update', {
  //     method: 'PUT',
  //     credentials: 'include',
  //     headers: headers,
  //   })
  //     .then((response) => {

  //       return response.json();
  //     })
  //     .then((data) => {
  //       if(!data.error){
  //         setAlertObj(data);
  //         setShowAlert(true);
  //         setAuthMode("signin");
  //       }else{
  //         setAlertObj(data);
  //         setShowAlert(true);
  //       }
  //       return;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     }
  //     )
  // };

  const changeAuthMode = (value) => {
    setShowAlert(false);
    setAuthMode(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">CRUD Inventory</h3>
            <div className="text-center text-light">
              Not registered yet?{" "}
              <span className="link-primary" onClick={() => changeAuthMode("signup")}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label className="input-label">Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {showAlert ? <LoginAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-primary" onClick={() => handleLogin()}>
                Login
              </button>
            </div>
            <p className="text-center text-light mt-2">
              Sign in as Guest?{" "}
              <Button variant="outline-primary" className="nav-buttons" onClick={() => changeAuthMode("guest")}>Continue as Guest</Button>{' '}
            </p>
          </div>
        </form>
      </div>
    )
  } else if (authMode === "signup") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content ">
            <h3 className="Auth-form-title text-primary">CRUD Inventory</h3>
            <div className="text-center text-light">
              Already registered?{" "}
              <span className="link-primary" onClick={() => changeAuthMode("signin")}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label className="input-label">First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter First Name"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Last Name"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="New Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="New Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {showAlert ? <LoginAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-primary" onClick={() => handleRegister()}>
                Register
              </button>
            </div>
            <p className="text-center text-light mt-2">
              Sign in as Guest? {" "}
              <Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/home')}>Continue as Guest</Button>{' '}
            </p>
          </div>
        </form>
      </div>
    )
  } else if (authMode === "guest") {
    return (
      <HomePage/>
    )
}
}
export default LoginPage

