import React ,{ useState } from 'react' ;
import './ArticleDescription.css';


function ArticleDescription(props) {

  // not {} its an array
 // const {value , setValue } =  useState('0rem') ;
 const [isShown, setIsShown] = useState('0rem');
  return (
    <>
   
  <div className='wrap' 
  style={{display : 'flex' ,
   justifyContent : 'space-between' ,
    alignItems : 'center' , 
  flexDirection : 'row-reverse' ,
  margin : '3rem 0'
  }}>
{/*  */}
  <div style={{margin : '0 2rem' , padding : '1rem'}}>
   {props.data.name && <h1>{props.data.name}</h1>}
   <div style={{display : 'flex' , justifyContent : 'start' , alignItems : 'center' , marginTop : '1rem'}}>
   {props.data.author && <span style={{margin : '0 1rem'}}>{props.data.author}</span>}
   {props.data.avatar && <img src={props.data.avatar} alt='avatar' style={{width : 30 , height : 30 , }}/>}
   {props.data.date && <span style={{margin : '0 1rem'}}>{props.data.date}</span>}
   </div>
   </div>
   {/*  */}
<div style={{width : 300 ,height : 200 , position : 'relative'}}>
   {props.data.picture && <img 
    onMouseEnter={() => setIsShown('auto')}
    onMouseLeave={() => setIsShown('0rem')}
   className = 'picture' 
   src={props.data.picture}
    alt=''
    style={{width : '100%', height : '100%', objectFit : 'cover' , margin : 0 , position : 'relative'}}
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
          transition : 'height 1000ms ease' ,
          overflow : 'hidden' ,
          height : `${isShown}`,
   }}>{props.data.description}</p>}
   </div>
   {/*  */}
  </div>
 
    </>
  )
}

export default ArticleDescription ;