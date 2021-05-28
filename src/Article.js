import React , {useState , useEffect} from 'react' ;
import './Article.css';
import ArticleDescription from './ArticleDescription';

function Article() {
  

  let [values , setValues] = useState([]);
  let [metadata , setMetadata] = useState({})
   

useEffect( () => {
  
try {
(async () =>{                                               // hard coded for now
  const req = await fetch(`http://127.0.0.1:8000/blogs/${'First pos here , obout sql'}`);
  const res = await  req.json(); 
  //data is usen in this component
  const data = res.content
 // passed to child
 
 setMetadata({...res.metadata})
  setValues([...data])
 
})()
       
} catch(err) {
console.log(err); // here hard code fake response
}

} , [])
   

return (
         
 <section className='Article'>

<ArticleDescription
data={metadata}
/>

   {values.map(e => (

   <div className='part' key={Math.random() * 13411}>
  {e.h1 ? <h1>{e.h1}</h1> : null }
  {e.p ? <p>{e.p}</p> : null }
  {e.img_path ?
   <img src={e.img_path}
   alt=''
   /> : null }
  </div>

 ))}
 
 </section>
        
      )          

}

export default Article;
