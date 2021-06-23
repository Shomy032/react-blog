

class Cookie {

 constructor(cookie){
 this.cookie = cookie ;
 }

 getCookie(){
 return this.cookie ;
 }

setCookie(input){
    this.cookie = input ; 
}

cookieHeaders(){
 this.cookie =  localStorage.getItem('Cookie');
return new Headers("Cookie" , this.cookie)
}

storeCookie(){
    localStorage.removeItem('Cookie');
    localStorage.setItem('Cookie', this.cookie );
}
getStoredCookie(){
return localStorage.getItem('Cookie');
}


}


export default Cookie ;



// localStorage.setItem('myCat', 'Tom');
// const cat = localStorage.getItem('myCat');
// localStorage.removeItem('myCat');
// localStorage.clear();