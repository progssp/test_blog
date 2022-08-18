<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Post;

class AppController extends Controller
{

    
    public function login(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');
        $email = $request->email;
        $password = $request->password;
        
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
 
        if ($validator->fails()) {
            $errors = $validator->errors();
            if($errors->has('email')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('email')[0]
                ]);
            }
            else {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('password')[0]
                ]);
            }
        }



        
        $user = User::where('email', $request->email)->first();        
        
     
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['status'=>false,'msg'=>'The provided credentials are incorrect.']);
        }
     
        return response()->json([
            'status'=>true,
            'msg'=>$user->createToken($request->email)
        ]);
    }



    public function register(Request $request){
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users',
            'name' => 'required',
            'password' => 'required',
        ]);
 
        if ($validator->fails()) {
            // return response()->json($validator->errors());
            $errors = $validator->errors();
            if($errors->has('email')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('email')[0]
                ]);
            }
            else if($errors->has('name')) {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('name')[0]
                ]);
            }
            else {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('password')[0]
                ]);
            }
        }



        
        $user = new User;
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        
        if($user->save()){
            return response()->json([
                'status' => true,
                'msg' => 'User register success'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Error in creating user'
            ]);
        }

      
    }


    public function create_post(Request $request){
        $title = $request->title;
        $sub_title = $request->sub_title;
        $tags = $request->tags;
        $content = $request->content;
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts',
            'sub_title' => 'required',
            'tags' => 'required',
            'content' => 'required',
        ]);
 
        if ($validator->fails()) {
            // return response()->json($validator->errors());
            $errors = $validator->errors();
            if($errors->has('title')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('title')[0]
                ]);
            }
            else if($errors->has('sub_title')) {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('sub_title')[0]
                ]);
            }
            else if($errors->has('tags')) {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('tags')[0]
                ]);
            }
            else {
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('content')[0]
                ]);
            }
        }



        
        $post = new Post;
        $post->user_id = Auth('user')->user()->id;
        $post->title = $title;
        $post->sub_title = $sub_title;
        $post->tags = $tags;
        $post->content = $content;
        
        if($post->save()){
            return response()->json([
                'status' => true,
                'msg' => 'post create success'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Error in creating post'
            ]);
        }

      
    }

    public function update_post(Request $request){
        $post_id = $request->post_id;
        $title = $request->title;
        $sub_title = $request->sub_title;
        $tags = $request->tags;
        $content = $request->content;
        
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|integer',
            'title' => 'unique:posts',
        ]);
 
        if ($validator->fails()) {
            // return response()->json($validator->errors());
            $errors = $validator->errors();
            if($errors->has('post_id')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('post_id')[0]
                ]);
            }
        }



        
        $post = Post::where('id',$post_id)->first();
        if($post == null){
            return response()->json([
                'status' => false,
                'msg' => 'Enter correct post id'
            ]);
        }
        if(isset($request->title) && ($request->title != null) && ($request->title != $post->title)){
            $post->title = $title;
        }
        if(isset($request->sub_title) && ($request->sub_title != null)){
            $post->sub_title = $sub_title;
        }
        if(isset($request->tags) && ($request->tags != null)){
            $post->tags = $tags;
        }
        if(isset($request->content) && ($request->content != null)){
            $post->content = $content;
        }
        
        if($post->save()){
            return response()->json([
                'status' => true,
                'msg' => 'post update success'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Error in updating post'
            ]);
        }

      
    }

    public function delete_post(Request $request){
        $post_id = $request->post_id;        
        
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|integer',
        ]);
 
        if ($validator->fails()) {
            $errors = $validator->errors();
            if($errors->has('post_id')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('post_id')[0]
                ]);
            }
        }



        
        $post = Post::where('id',$post_id)->first();
        if($post == null){
            return response()->json([
                'status' => false,
                'msg' => 'Enter correct post id'
            ]);
        }
        if($post->deleted_at != null){
            return response()->json([
                'status' => false,
                'msg' => 'Post already deleted'
            ]);
        }
        
        if($post->delete()){
            return response()->json([
                'status' => true,
                'msg' => 'post delete success'
            ]);
        }
        else{
            return response()->json([
                'status' => false,
                'msg' => 'Error in deleting post'
            ]);
        }

      
    }

    public function get_all_posts(Request $request){
        $user_id = Auth('user')->user()->id;

        $all_posts = Post::where('user_id',$user_id)->orderBy('id','desc')->get();
        if(empty($all_posts)){
            return response()->json([
                'status' => false,
                'msg' => 'No posts'
            ]);
        }
        else{
            return response()->json([
                'status' => true,
                'msg' => $all_posts
            ]);
        }
    }

    public function get_post(Request $request){
        $post_id = $request->post_id;
        
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|integer',
        ]);
 
        if ($validator->fails()) {
            $errors = $validator->errors();
            if($errors->has('post_id')){
                return response()->json([
                    'status' => false,
                    'msg' => $errors->get('post_id')[0]
                ]);
            }
        }



        
        $post = Post::where('id',$post_id)->first();
        if($post == null){
            return response()->json([
                'status' => false,
                'msg' => 'Enter correct post id'
            ]);
        }
        
        return response()->json([
            'status' => true,
            'msg' => $post
        ]);        

      
    }

    public function get_posts_by_tag(Request $request){
        $tags_string = NULL;
        if(isset($request->tags) && ($request->tags != null)){
            $tags_string = $request->tags;
        }

        
        
        $post = Post::query();
        $tags_arr = explode(',',$tags_string);
        foreach($tags_arr as $select) {
            $post->orWhere('tags', 'like', '%'.$select.'%');
        }
        $res = $post->get();
        
        return response()->json($res);
    }


    






    public function get_csrf_token(){
        header('Access-Control-Allow-Origin: *');
        return response()->json(csrf_token());
    }
}
