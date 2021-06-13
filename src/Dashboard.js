import React , { useState , useEffect , useRef} from "react";
import './CSS/Dashboard.css';
import Search from './Search'
import Filter from './Filter'

function Dashboard( { sendDataToIndexThenToMain } ) { 

    const [resData , setResData ] = useState([])  // his is for child component // Search
    const [filters , addFilters ] = useState([]) // his is for child component // Filter
    
    console.log('current filters , rerendering' , filters , JSON.stringify(filters))
    
    let filterString = useRef('')
          
    // current problem , effect are called once ??
    useEffect(() => {
        console.log('useEffect is called')

        filterString.current = filters.map((tag , index , arr) =>{
            return  arr.length == index + 1 ? `tag=${tag}` : `tag=${tag}&` // construct query
            }).join('') 

        console.log('filters in effect' , filters , filterString.current)

        if(filterString.current && filters.length !== 0){
            fetch(`http://localhost:4002/posts/filter?${filterString.current}`
            , {method : "GET"})
             .then((res) => { if(res.ok || res.status == 200){ return res.json() }
              else { throw new Error('fetch failed') } // throw new Error('fetch failed')
            })
                 .then((data) => sendDataToIndexThenToMain(data)) // save in state
                     .catch((err) => console.error(err)) // if there is err throw it
        } else { 
           console.error('bad filters' , 'returning')    
            return () => console.log('returning , last else')
        }

    } ,  [JSON.stringify(filters)] ) // for some reason , this isnt working, it call only once , or twice ???
                                                     // with [filters] only it calls once
                                                     // with ... it throw error
//[JSON.stringify(outcomes)]
//[JSON.stringify(filters)]

 return (
     <></>
     
// <div className='Dashboard'>
//     <Search setResData={ setResData }/> 
//      <Filter addFilters={addFilters}/>       
//      </div>
    )
    
}

export default Dashboard;