import React, { useState ,useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import { toast,  Bounce } from 'react-toastify';





const Login = () => {

  const notify=()=>{

  toast.success("Logged-in Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,});}
  


     const[credentials,setCredentials]=useState({email:"", password:""});
    
     const navigate= useNavigate();

      

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response= await  fetch('http://localhost:8080/api/auths/login',{
            method:'POST',
            headers:{
                'content-type':'application/json',
       
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password}),
        });
          const json = await response.json();
          setCredentials({email:"", password:""});
        console.log(json);
          if(json.success){
           localStorage.setItem("token",json.jwtToken);
           navigate("/");

            // flash msg
           setTimeout(()=>{
            notify();
           },0);
           
          }

          else{
            alert("invalid credentials");
          }
    }

    const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  
  return (
    <>
     {/* <ToastContainer/> */}
     
     

    <div className='offset-3 mt-5'>
        <h2 className='text-align-center'>Login here</h2>
     <form onSubmit={handleSubmit}>
  <div className="mb-3  col-6 ">
   
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control border border-dark" id="email" aria-describedby="emailHelp" name='email' value={credentials.email}   onChange={onChange}/>
    <div id="email1" className="form-text">We'll never share your email with anyone else.</div>
 
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control border border-dark" id="password" name='password' value={credentials.password}  onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
  </div>
</form>

    </div>
     </>
  )
}

export default Login
