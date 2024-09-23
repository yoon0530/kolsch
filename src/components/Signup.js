import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Signup = (props) => {



  const [credentials, setCredentials] = useState({name:"", email: "", password: ""}) 
  let history = useHistory();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password}=credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          history.push("/login");
          props.showAlert("Account created successfully", "success")


      }
      else{
        props.showAlert("Invalid Details", "danger")
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
<div className='mt-3'>
            <h2>Create an account to use NoteZ</h2>
          <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlhtmlfor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlhtmlfor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlhtmlfor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlhtmlfor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange}/>
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Signup
