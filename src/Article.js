import React , {useState , useEffect} from 'react' ;
import './Article.css';


function Article() {
  

  let [values , setValues] = useState([])
   

useEffect( () => {
  
try {
(async () =>{
  const req = await fetch(`http://127.0.0.1:8000/blogs/${'Firts post'}`);
  const res = await  req.json(); 
  const data = res.content
        //  console.log(data)
          setValues([...data])
})()
       
} catch(err) {
console.log(err); // here hard code fake response
}

} , [])


return (
         
 <section className='Article'>

   {values.map(e => (

   <div className='part' key={Math.random() * 1341}>
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
