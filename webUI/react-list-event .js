------------------------------------app.js----------------------------------------------
import React, { Component } from 'react';

import './App.css';
import First from './First/First'
import ButtonX from './First/button'
import Books from './Books/Books'

class App extends Component {
 
  state= {
    books:[
    {
      name:'javascript',
      price: 20,
      id:1
    },
    {
      name:'React',
      price: 30,
      id:2
    },
    {
      name:'React Native',
      price: 40,
      id:3
    },
    {
      name:'Redux',
      price: 23,
      id:4
    }
  ]
}
deleteHandler = (id) =>{
  let newBooks = this.state.books.filter(book => book.id != id)
  this.setState({
    books:newBooks
  })
}
changeHandler =(name,id) =>{
  let newBooks =this.state.books.map(book =>{
   if (id===book.id)
    return{
      ...book,
      name
    }
    return book
  })
  this.setState({
    books: newBooks
  })

}

  render() {
    return (
       <div className="App">
        <Books 
        changeHandler ={this.changeHandler .bind(this)}
        deleteHandler={this.deleteHandler.bind(this)} 
        books={this.state.books}/>
      </div>)
       };
     
    
  
}

export default App;






Books.js--------------------------------------------------------------------

import React, {Component} from 'react'
import Book from './Book/Book';

class Books extends Component{
    render(){
        return(
            <div>
                {
                    this.props.books.map((book) =>{
                        return(
                            <Book 
                            changeHandler ={this.props.changeHandler}
                            deleteHandler={this.props.deleteHandler} 
                            book={book}/>
                        )

                    
                    })
                }
            </div>
        )
    }
}
export default Books




----------------------------------------------book.js--------------------------------------------

import React, {Component} from 'react'
class Book extends Component{
    state={
        isEditable: false
    }

    keyChangeHandler= (e)=>{
        if(e.key==='Enter'){
            this.setState({
                isEditable:false
            })
        }

    }

    render(){
        var output = this.state.isEditable ? (
        <input 
        onChange = {(e) =>
            this.props.changeHandler(e.target.value, this.props.book.id)
        }
        onKeyPress={this.keyChangeHandler}
        type='text' 
        placeholder="Enter Name" 
        value={this.props.book.name} 
        />  
        ):
        (<p> {this.props.book.name}</p>) ;

        return(
            <li className='list-group-item d-flex'>
                {output}
                <span className='ml-auto'> ${this.props.book.price} </span>
                <span style={{cursor:'pointer'}} onClick={ ()=> this.setState({isEditable:true
                    })} className='mx-2'>
                <i className="fas fa-edit"></i>
                </span>
                <div className='mx-4'>
                <span style={{cursor:'pointer'}} 
                onClick={()=> this.props.deleteHandler(this.props.book.id)}>
                <i className="fas fa-trash-alt"></i>
                </span>

                </div>
            </li>
        )
    }
}
export default Book

//-----------------------------------------app.js for fething data from API--------------

import React, { Component } from 'react';

import './App.css';
import First from './First/First'
import ButtonX from './First/button'
import Books from './Books/Books'
import axios from 'axios';

class App extends Component {
 
  state = {
    posts : []
  }
  componentDidMount()
  {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      this.setState({
        posts:response.data
      })
    })

    .catch(error => console.log(error)) 
  }
  
  render (){

    let{posts}=this.state;
    if(posts.length===0)
    {
      return <h1 style={{textAlign:'center'}}>Loading......</h1>
    }
    else{
      return (<div className='container'>
      <ul className='list-group'>
        {posts.map(post => <li key ={post.id} className='list-group-item'>{post.title}</li>)}
      </ul>

    </div>)
      
    }
    
    return (
      <div className="App">
        
      </div>
    );

  }
     
    
  
}

export default App;

------------------------------Form--------------------------------------
import React, {Component} from 'react'

const initialState={
    name :'',
    email:'',
    password:'',
    bio:'',
    country:'',
    gender:'',
    skills:[]

}
class PostForms extends Component{

    constructor(){
        super()

        this.newForm= React.createRef()
    }

    state = {
       ... initialState
    }
    changeHandler = (e) =>{
        if(e.target.type==='checkbox'){
            if(e.target.checked){
                this.setState({
                    ...this.state,
                    skills: this.state.skills.concat(e.target.value)
                })
            }
            else{
                this.setState({
                    ...this.state,
                    skills: this.state.skills.filter(skill => skill != e.target.value)
                })

            }

        }
        else{
            this.setState({
                [e.target.name]:e.target.value
            })
        }

    };
    submitHandler=(e) =>{
        e.preventDefault()
        
        console.log(this.state);
        this.newForm.current.reset()
        this.setState({
           ...initialState
        })

    }

    render(){
        return(
      <form ref={this.newForm} onSubmit={this.submitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Enter Your Name</label>
           <input 
            className='form-control'
            type='text' 
            placeholder="enter Your Name" 
            name="name" 
            id='name' 
            value={this.state.name}
            onChange={this.changeHandler}
            />

        </div>

        <div className='form-group'>
          <label htmlFor='email'>Enter Your Email</label>
           <input 
            className='form-control'
            type='eamil' 
            placeholder="enter Your Email" 
            name="email" 
            id='email' 
            value={this.state.email}
            onChange={this.changeHandler}
            />

        </div>
        <div className='form-group'>
          <label htmlFor='password'>Enter Your password</label>
           <input 
            className='form-control'
            type='password' 
            placeholder="enter Your password" 
            name="password" 
            id='password' 
            value={this.state.password}
            onChange={this.changeHandler}
            />

        </div>
        <div className='form-group'>
          <label htmlFor='bio'>Enter Your Bio</label>
           <textarea 
            className='form-control'
            type='text' 
            placeholder="enter Your Bio" 
            name="bio" 
            id='bio' 
            value={this.state.bio}
            onChange={this.changeHandler}
            />

        </div>
        <div className='form-group'>
          <label htmlFor='country'>Select your Country</label>
          <select className='form-control' 
          onChange={this.changeHandler} name='country' id ='country'>
          <option value ="Bangladsh">Bangladsh</option>
          <option value="India">India</option>
          <option value="Nepal">Nepal</option>
          <option value="Bhutan">Bhutan</option>

          </select>

        </div>
        <div className='form-group'>
            <div className='form-check'>
            <input onChange={this.changeHandler} type='radio' name='gender' id='gender1' value="Male"/>
            <label htmlFor='gender1'>Male</label>
            </div>

            <div className='form-check'>
            <input onChange={this.changeHandler} type='radio' name='gender' id='gender2' value="Female"/>
            <label htmlFor='gender2'>Female</label>
            </div>

            <div className='form-check'>
            <input onChange={this.changeHandler} type='radio' name='gender' id='gender3' value="Other"/>
            <label htmlFor='gender3'>Other</label>
            </div>

        </div>

        <div className='form-group'>
            <label>Skills :</label>
            <div className='form-check'>
                <input name="skills" type='checkbox' id='JS' 
                value='JavaScript' onChange={this.changeHandler} />
                <label htmlFor='JS'>JavaScript</label>

            </div>
            <div className='form-check'>
                <input name="skills" type='checkbox' id='JS native' 
                value='JavaScript' onChange={this.changeHandler} />
                <label htmlFor='JS native'>JavaScript Native</label>

            </div>
            <div className='form-check'>
                <input name="skills" type='checkbox' id='react' 
                value='JavaScript' onChange={this.changeHandler} />
                <label htmlFor='react'>React</label>

            </div>

        </div>
        <button className='btn btn-primary' tupe='submit'>Submit></button>

      </form>
        )

    }

}
export default PostForms
--------------------------------------form er app.js------------------------------import React, { Component } from 'react';

import './App.css';


import PostForms from './PostForms';

class App extends Component {
 
 


  render (){

    return (
      <div className='container'>
      <div className="row">
        <div className="col-sm-6 offset-sm-1">
            <PostForms />
        </div>

      </div>
      
      </div>
      
    );
      
    }
    
   

  }
     
    
  


export default App;
----------------------------------------------------postForm by post -------------------------
import React, { Component } from 'react';
import axios from 'react';



class PostForm extends Component{

    state={
        title :'',
        body : "",
        userId: '112',
        isSubmitted:false,
        error:false
        
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })

    } 

    submitHandler = (e ) => {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/posts',{
            title:this.state.title,
            body: this.state.body,
            userId :this.state.userId

        })
        .then(res=>{
            this.setState({
                isSubmitted:true,
                error:false
            })
            console.log(res)
        })
        .catch(error=>{
            this.setState({
                error:true,
                isSubmitted:false
            })
            console.log(error)

        })

    }
    
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <input
                className='form-control'
                type='text'
                placeholder='Enter your Title'
                value={this.state.title}
                onChange={this.changeHandler}
                name='title'
                
                />
                <textarea
                type='text'
                placeholder="enter your text"
                className="form-control"
                name='body'
                value={this.state.body}
                onChange={this.changeHandler}

                />
                <button className='btn btn-success' type='submit'>Submit</button>
                {this.state.isSubmitted && <p>Succesfull</p>}
                {this.state.error && <p>Unsuccesfull</p>}
            </form>


        )
    }
}
 export default PostForm




