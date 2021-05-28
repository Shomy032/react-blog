import React , {useState , useEffect} from 'react' ;
import './App.css';
// import image from './test-bl.png'


const posts = [ 
    {name : 'Firts post',
  description : 'this is first post' ,
  author : 'pera peric' ,
  picture : '',
  links : [],
  social_links : []
  },
  { h1 : 'start',
  p : "start",
  img_path : './pictures/test-bl.png'} ,

{p : '2. p element' ,
h1 : 'asdasdee`11111'} ,
{
  img_path : './pictures/test.png',
  p  : "end",
  h1 : 'end'
}
]


function App() {
  

  let [values , setValues] = useState([])
   

   useEffect(() => {

     
     setValues([...posts])
   } , [])

    return (
         
 <section>{values.map(e => (
   <>
  {e.h1 ? <h1>{e.h1}</h1> : null }
  {e.p ? <p>{e.p}</p> : null }
  {e.img_path ?
   <img src={e.img_path}
   alt=''
   /> : null }
  </>
 ))}</section>
        
      )          

}

export default App;
