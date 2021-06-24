import React , { useState } from "react";
// import { Link } from "react-router-dom";
import '../CSS/Search.css'

function Search( { setResData } ) {

const [ value , setValue ] = useState('') 

const handleChange = (e) => {
    setValue(e.target.value)
}
const handleSubmit = (e) => {
   e.preventDefault()
   if(!value){ return } // if there is no input dont call API
    let send = value.replace( /[^A-Za-z0-9]/g , ' ' ).trim().split(' ').join('+')
    fetch(`http://localhost:4002/posts/search?name=${send}` , {
     method : 'GET',
    })
        .then((res) => res.json())
            .then((data) => {
                if(data.massage && data.success == false){
                   console.error('no resulst for that search', 'passing err') 
                   let error = new Error('no resulst for that search')
                   setResData(error)   
                } else{
                    setResData(data)   
                }
                  
                })
                .catch((err) => console.error(err))
        }

 return (     

  <form className='Search' onSubmit={handleSubmit}>

<div className="inputWraper">
  <input type='text' 
  name='search' 
  className="effect-8"
  placeholder='search for question...'
  autocomplete="off" 
  value={value} onChange={handleChange}/>
<span class="focus-border">
            	<i></i>
            </span>
</div>
  <button type='submit' onSubmit={handleSubmit}>
  <i className='fas fa-search'/>
  </button>
  </form>     

    )
    
}

export default Search;