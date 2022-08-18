import logo from './logo.svg';
import './Login.css';
import {  Link  } from 'react-router-dom';

function Login() {
  
  function handleSubmit(evt){
    var token = null;
    evt.preventDefault();
    var email = evt.target[0].value;
    var password = evt.target[1].value;
    
      
    fetch('http://127.0.0.1:8000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'_token':token,'email':email,'password':password})
    })
    .then(data => data.json())
    .then(dt => {
      if(dt.status){
        localStorage.setItem('token',JSON.stringify(dt.msg));
        window.location = "/profile";
      }
    })
    .catch(err=>{
      console.error(err);
    });
    


    
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3>Blog Login</h3>
          <br/>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <input type="email" class="form-control" placeholder='Enter email' />
            </div>

            <br/>
            
            <div class="form-group">
              <input type="password" class="form-control" placeholder='Enter password' />
            </div>

            <br/>
            <div class="form-group">
              <input type="submit" class="btn btn-primary btn-md" value='Login' />
            </div>
            <Link to="/register">Not a user yet. Register here</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
