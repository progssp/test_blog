import logo from './logo.svg';
import './Login.css';
import {  Link  } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Post() {

  const [post, setPost] = useState([]);
  const {id} = useParams();


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    loadPostDetail();
  },[]);

  function check_auth(){
    if(localStorage.getItem('token') == null){
      window.location = '/';
    }
  }

  function loadPostDetail(){
    console.log(JSON.parse(localStorage.getItem('token')).plainTextToken);
    fetch('http://127.0.0.1:8000/user/get-post?post_id='+id,{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).plainTextToken
      }
    })
    .then(data => data.json())
    .then(dt=>{
      setPost(dt.msg)
    })
    .catch(err=>console.error(err))
  }

  function handle_delete(){
    console.log(JSON.parse(localStorage.getItem('token')).plainTextToken);
    fetch('http://127.0.0.1:8000/user/delete-post?post_id='+id,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).plainTextToken
      },      
      body: JSON.stringify({'post_id':id})
    })
    .then(data => data.json())
    .then(dt=>{
      if(dt.status){
        window.location = "/profile";
      }
    })
    .catch(err=>console.error(err))
  }
  
 

  return (
    
    <div class="container">
      {check_auth()}
      
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md-3'>
          <Link to={`/post/edit/${id}`} className="btn btn-primary">Edit</Link>
        </div>
        <div className='col-md-3'>
          <button className="btn btn-primary" onClick={handle_delete}>Delete</button>
        </div>
      </div>

      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Title</h3>
          {post.title}
        </div>
      </div>

      
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Sub Title</h3>
          {post.sub_title}
        </div>
      </div>

      
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Tags</h3>
          {post.tags}
        </div>
      </div>

      
      <div className='row'  style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Content</h3>
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default Post;
