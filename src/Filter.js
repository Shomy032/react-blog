import React , { useState , useRef } from "react";
// import { Link } from "react-router-dom";
import './CSS/Filter.css'

function Filter( { addFilters } ) {

   const [show , setShow]  =  useState(false)
   const [reRender , startReRender]  =  useState(0)
   const [searchValue , setSearchValue]  =  useState('')
    // addFilters , this send data to dashboard ,
    // then dasboard fetch wuth filters ,  and send to App and app pass to MainPosts

        // todo : make route for this , its fine to be hard coded bcs we know all our filters
    const allFiltersYouHave = ['html' , 'css' , 'js', 'react' , 'redux' , 'angular' , 'node' , 'go' , 'dom' , 'vue' , 'php' , 'pc' , 'nosql' , 'sql' , 'database' ,'c#', '.net' , 'express' , 'java' ,"oop"  ,"git" ,"other" , "docker", "graph", "http1.1" , 'http2.0' , 'quic', 'ip' , 'networking', 'algorithm', 'data', 'server', 'serverless', 'crypto', 'file', 'tls', 'tcp' , 'udp', 'bash', 'ssh' , 'telnet' , 'security' , 'password' , 'xss', 'cors','jwt', 'cookie' , 'md', 'scss','swift', 'ddos' , 'limiting' , 'status' ,'c#' ,'c++','linux','windows','mac','python']                  
    const [filtersAll , setFiltersAll]  =  useState([...allFiltersYouHave])

  //  console.log('rendering again')

  let filters = useRef([])
  const [ filtersState , setFiltersState ] = useState([])

const handleChange = (eve) => {
  setSearchValue(eve.target.value)

  setFiltersAll( [...allFiltersYouHave.filter((e) => e.includes(eve.target.value))] )
  
}

const [currentAdded , setCurrentAdded]  =  useState([])

  const handleAddFilter = (filter , event) =>{ // filter is content from <li>
    
  //  console.log('starting re render') // not sure , maybe not
    startReRender(Math.random()) // this is needed , bcs without it component wont rerender enough times
 //   console.log(event.target , filter) 


    if(!filters.current.includes(filter)){
       //  console.log('new filter added')
     filters.current.push(filter)
    //  event.target.style.backgroundColor = 'red'

     setCurrentAdded([...currentAdded , event.target.className.split(' ')[1]])
    } else {
        //  console.log('same filter again')
          let indexToRemove = filters.current.indexOf(filter)
          filters.current.splice(indexToRemove , 1)
        //  event.target.style.backgroundColor = 'lightcoral'
 
          let index = currentAdded.indexOf(event.target.className.split(' ')[1])
          if(index !== -1){
              currentAdded.splice(index , 1)
            } // else { console.error('index is -1 ') }
          
            // todo : send this tags to server
          setCurrentAdded([ ...currentAdded ] )
          
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

const removeTag = (event) => {

  let index = currentAdded.indexOf(event.target.className.split(' ')[1])
  if(index !== -1){
      currentAdded.splice(index , 1)
     } // else { console.error('index is -1 ') }
  
    // let colors = document.querySelectorAll(`.${event.target.className.split(' ')[1]}`)
    
    // colors.forEach((e) =>{
    //   e.style.backgroundColor = 'lightcoral'
    // })
    

    // todo : send this tags to server
  setCurrentAdded([ ...currentAdded ] )

}

// setFiltersState

  // make side bar that comes form left with all filters and sort method
 return (     
<div className='Filter'>

<> 
{show ?  <div className='sideBarOpen'> <button className='btn' onClick={() => {
    addFilters(filters.current) // or filtersState , will see
    // console.log('click')
    }}>applay filters</button>
    <i className='fas fa-times' onClick={setShowFalse}/>
  </div>
: <button className='btn' onClick={setShowTrue}>show filters</button> }
    </>
    <div className='wraper'>
    {show && <form onSubmit={(e) => { 
      e.preventDefault() 
    }} > <input
    value={searchValue} 
    onChange={handleChange}
    placeholder='search for filter'
    className='searchForFilters'/></form>}
    {show && <div
     className='currentFilters'>
       <p>current filters :</p>
         <ul>
       {currentAdded && currentAdded.map((e , i) => <li key={i} className={'singleFilter' + ' ' + e} onClick={(event) => removeTag(event)}>{e}</li>)}
       </ul>
      </div>}
{show && 
    <div className='allFiltersTags'>
      <p>all filters :</p>
  <ul>
  {filtersAll && filtersAll.map((filter , index) => { 
     return <li  className={'singleFilter' + ' ' + filter} key={index} onClick={(event) => handleAddFilter(filter , event) }>
         {filter}
         </li>
  })}  
  </ul>
  </div>
}
 </div>

 </div>
    )
    
}

export default Filter;