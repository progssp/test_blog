import logo from './logo.svg';
import './Login.css';
import {  Link  } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function PostEdit() {

  const {id} = useParams();


  useEffect(() => {
    loadPostDetail();
  },[]);

  function check_auth(){
    if(localStorage.getItem('token') == null){
      window.location = '/';
    }
  }


  function loadPostDetail(){
    fetch('http://127.0.0.1:8000/user/get-post?post_id='+id,{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).plainTextToken
      }
    })
    .then(data => data.json())
    .then(dt=>{
      document.getElementById('title').value = dt.msg.title;
      document.getElementById('sub_title').value = dt.msg.sub_title;
      document.getElementById('tags').value = dt.msg.tags;
      document.getElementById('content').value = dt.msg.content;
    })
    .catch(err=>console.error(err))
  }

  function handle_submit(evt){
    evt.preventDefault();
    var title = evt.target[0].value;
    var sub_title = evt.target[1].value;
    var tags = evt.target[2].value;
    var content = evt.target[3].value;

    fetch('http://127.0.0.1:8000/user/update-post',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')).plainTextToken
      },
      body: JSON.stringify({'post_id':id,'title':title,'sub_title':sub_title,'tags':tags,'content':content})
    })
    .then(data => data.json())
    .then(dt=>{
    })
    .catch(err=>console.error(err))

  }
  
 

  return (
    
    <div class="container">
      {check_auth()}
      
      
      <form onSubmit={handle_submit} id="edit-form">
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Title</h3>
          <input type="text" id="title" className="form-control" />
        </div>
      </div>

      
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Sub Title</h3>
          <input type="text" id="sub_title" className="form-control" />
        </div>
      </div>

      
      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Tags</h3>
          <input type="text" id="tags" className="form-control" />
        </div>
      </div>

      
      <div className='row'  style={{'margin-top':25}}>
        <div className='col-md'>
          <h3>Content</h3>
          <input type="text" id="content" className="form-control" />
        </div>
      </div>

      <div className='row' style={{'margin-top':25}}>
        <div className='col-md'>
          <button type="submit" className='btn btn-success'>Submit</button>
        </div>
      </div>
      </form>

    </div>
  );
}

export default PostEdit;
