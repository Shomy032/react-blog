
const nodemailer = require('nodemailer');

class MailSender {

     

    constructor( email ,   subject , text ){
        this.myEmail = process.env.myEmail 
        this.myPassword = process.env.emailPassword   
       this.email = email 
       this.text = text   
       this.subject = subject  
    }
  
    

   transporter(){
   return  nodemailer.createTransport({
       service : "hotmail" ,
       auth : {
           user : this.myEmail ,
           pass : this.myPassword 
       } 
    })
   } 
    options(){
        return {
            from : this.myEmail ,
            to : this.email ,
            subject : this.subject ,
            text : this.text 
        }
    }   
 
    sendMail(){
       const transporter =  this.transporter()
       const options = this.options() 
       transporter.sendMail(options , (err , info) => {
           if(err){
             //  console.log(err)
               throw new Error("error sending email")
           }
            return info ;
           //console.log("info.response :::" ,  info.response)

       })
    }


}


module.exports = MailSender ;