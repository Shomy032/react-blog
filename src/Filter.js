import React , { useState , useRef } from "react";
// import { Link } from "react-router-dom";
import './CSS/Filter.css'

function Filter( { addFilters } ) {

   const [show , setShow]  =  useState(false)
   const [reRender , startReRender]  =  useState(0)
    // addFilters , this send data to dashboard ,
    // then dasboard fetch wuth filters ,  and send to App and app pass to MainPosts

        // todo : make route for this , its fine to be hard coded bcs we know all our filters
    const allFiltersYouHave = ['html' , 'css' , 'js', 'ubuntu' , 'linux' , 'jsx' , 'kali' , 'RedHat' , 'dom' , 'custom' , 'comm' , 'pc' , 'react' , 'amgular' ]

  let filters = useRef([])
  const [ filtersState , setFiltersState ] = useState([])

  const handleAddFilter = (filter , event) =>{ // filter is content from <li>
    
    console.log('starting re render') // not sure , maybe not
    startReRender(Math.random()) // this is needed , bcs without it component wont rerender enough times
    console.log(event.target , filter) 


    if(!filters.current.includes(filter)){
        console.log('new filter added')
     filters.current.push(filter)
     event.target.style.backgroundColor = 'red'
    } else {
         console.log('same filter again')
          let indexToRemove = filters.current.indexOf(filter)
          filters.current.splice(indexToRemove , 1)
          event.target.style.backgroundColor = 'lightcoral'
        }


  }

  const setShowFalse = () =>{
    setFiltersState(filters.current)
    setShow(false)
  }

  const setShowTrue = () =>{
    setFiltersState(filters.current)
    setShow(true)
  }
// setFiltersState

  // make side bar that comes form left with all filters and sort method
 return (     
<div className='Filter'>

<> 
{show ?  <div className='sideBarOpen'> <button className='btn' onClick={() => {
    addFilters(filters.current) // or filtersState , will see
    console.log('click')
    }}>applay filters</button>
    <i className='fas fa-times' onClick={setShowFalse}/>
  </div>
: <button className='btn' onClick={setShowTrue}>show filters</button> }
    </>
{show && 
    <div className='allFiltersTags'>
  <ul>
  {allFiltersYouHave.map((filter , index) => { 
     return <li className='singleFilter' key={index} onClick={(event) => handleAddFilter(filter , event) }>
         {filter}
         </li>
  })}  
  </ul>
  </div>
}
 

 </div>
    )
    
}

export default Filter;