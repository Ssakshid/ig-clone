import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const Login = ()=>{
  const navigate = useNavigate()
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

  const PostData = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"invalid email",classes:"#c62828 red darken-3"})
      return
    }
    fetch("/Login",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      password,
      email,
      
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
      M.toast({html:data.error,classes:"#c62828 red darken-3"})
    }
    else{
      console.log(email,password)
      M.toast({html:"successfully signed in",classes:"#43a047 green darken-1"})
    navigate('/')
    }
  }).catch(err=>{
    console.log(err)
  })

  }  
    return (
       <div className="mycard">
        <div className="card auth-card">
        <h2>Instagram</h2>
        <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick ={ ()=>
         PostData() }> Login </button>
  <h5>
    <Link to="/Signup">Don't have an account ?</Link>
  </h5>
      </div>
       </div>
    )
      }
export default Login