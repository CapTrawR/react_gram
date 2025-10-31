import React from 'react'
import "./Auth.css"

//Componentes
import {Link} from "react-router-dom"

//Hooks
import { useState, useEffect } from 'react'

function Register() {
  const [name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")

  //Funcao do submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    //imprime o user
    console.log(user)
  }

  return (
    <div id='register'>
      <h2>Reactgram</h2>
      <p className='subtitle'> "Create an account to view your friends' pictures." </p>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Name' autoComplete="name" onChange={(e) => setName(e.target.value)} value={name || ''} />
      <input type="email" placeholder='Email' autoComplete="email" onChange={(e) => setEmail(e.target.value)} value={email || ''} />
      <input type="password" placeholder='Password' autoComplete="password" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
      <input type="password" placeholder='Repeat Password' autoComplete="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ''} />
      <input type="submit"  value={"Register"} />
      </form>
      <p>
        You have an account already ? <Link to="/login">Cick here to Login</Link>
      </p>
    </div>
  )
}

export default Register