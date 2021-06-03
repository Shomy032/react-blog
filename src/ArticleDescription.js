import React ,{ useState } from 'react' ;
import './CSS/ArticleDescription.css';
import { BrowserRouter as Router, Switch, Route, Link , useParams , useRouteMatch } from "react-router-dom";

function ArticleDescription(props) {

  // not {} its an array
 // const {value , setValue } =  useState('0rem') ;
 const [isShown, setIsShown] = useState('translateY(100%)');
 const [dis , setDis] = useState(props.show);
console.log(props.data.name)
 if(dis === true){
  return (
    <>
   
  <div className='wrap' 
  style={{display : 'flex' ,
   justifyContent : 'space-around' ,
    alignItems : 'center' , 
  flexDirection : 'row-reverse' ,
  margin : '1rem 0'
  }}>
{/* className={`banner ${active ? "active" : ""}` */}   
  <div style={{margin : '0 2rem' , padding : '1rem'}}>
   {props.data.name && <Link to={`/${props.data.name}`}> <h1 className={props.hover ? 'hovered' : '' }
   onClick={() => setDis(false)}
   >{props.data.name}</h1></Link>}

{/* testing stuff */}
   <Link to={`props.data.name`}>nmaeeeee</Link>
{/*  */}

   <div style={{display : 'flex' , justifyContent : 'start' , alignItems : 'center' , marginTop : '1rem'}}>
   {props.data.author && <span style={{margin : '0 1rem'}}>{props.data.author}</span>}
   {props.data.avatar && <img src={props.data.avatar} alt='avatar' style={{width : 30 , height : 30 , }}/>}
   {props.data.date && <span style={{margin : '0 1rem'}}>{props.data.date}</span>}
   </div>
   </div>
   {/*  */}
<div style={{width : 300 ,height : 200 , position : 'relative' , overflow : 'hidden' ,}}>
   {props.data.picture && <img 
    onMouseEnter={() => setIsShown('translateY(0%)')}
    onMouseLeave={() => setIsShown('translateY(100%)')}
   className ={['picture' , props.hover ? 'hovered' : ''].join(' ')}
   src={props.data.picture}
    alt=''
    style={{width : '100%',
     height : '100%',
     objectFit : 'cover' ,
      margin : 0 ,
       position : 'relative' ,
       overflow : 'hidden' ,}}
    />}
   {props.data.description && <p
   className = 'description' 
   style={{
     position : 'absolute' ,
       left : 0 ,
        right : 0 ,
         bottom : 0 ,
        //  top : 0 ,
          width : '100%' ,
          backgroundColor : 'white',
           pointerEvents : 'none' ,
          transition : 'all 1000ms ease' ,
          overflow : 'hidden' ,
          transform : `${isShown}`,
   }}>{props.data.description}</p>}
   </div>
   {/*  */}
  </div>
 
    </>
  )
 } else {
   return null;
 }
  
}

export default ArticleDescription ;