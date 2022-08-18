import logo from './logo.svg';
import './Login.css';
import {  Link  } from 'react-router-dom';
import {useState, useEffect} from 'react';

function Profile() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  },[]);

  function check_auth(){
    if(localStorage.getItem('token') == null){
      window.location = '/';
    }
  }

  function logout(evt){
    localStorage.removeItem('token');
    window.location = "/";
  }

  function loadPosts(){
    console.log(JSON.parse(localStorage.getItem('token')).plainTextToken);
    fetch('http://127.0.0.1:8000/user/get-all-blog-posts',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).plainTextToken
      }
    })
    .then(data => data.json())
    .then(dt=>{
      setPosts(dt.msg)
    })
    .catch(err=>console.error(err))
  }

  
  
 

  return (
    
    <div class="container">
      {check_auth()}
      <div class="row">
        <div class="col-md-6">
          {(localStorage.getItem('token') != null)?JSON.parse(localStorage.getItem('token')).accessToken.name:'no auth'}
        </div>
        <div class="col-md">
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>               
      </div>

      <div class="row">
        <div className='col-md'>
          <Link to={`/create`} className="btn btn-primary">Create post</Link>
        </div>
      </div>


      <div class="row">
        <div className='col-md'>
        {posts.map((number) =>
          <li><Link to={`/post/${number.id}`}>{number.title}</Link></li>
        )};
        </div>
      </div>

    
    </div>
  );
}

export default Profile;
