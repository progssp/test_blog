import logo from './logo.svg';
import './Login.css';

function Register() {

  function handleSubmit(evt){
    evt.preventDefault();
    var name = evt.target[0].value;
    var email = evt.target[1].value;
    var password = evt.target[2].value;
    
      
    fetch('http://127.0.0.1:8000/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name':name,'email':email,'password':password})
    })
    .then(data => data.json())
    .then(dt => {
      if(dt.status){
        window.location = "/";
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
          <h3>Blog Register</h3>
          <br/>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <input type="text" class="form-control" placeholder='Enter name' />
            </div>

            <br/>
            <div class="form-group">
              <input type="email" class="form-control" placeholder='Enter email' />
            </div>

            <br/>
            
            <div class="form-group">
              <input type="password" class="form-control" placeholder='Enter password' />
            </div>

            <br/>
            <div class="form-group">
              <input type="submit" class="btn btn-primary btn-md" value='Register' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
