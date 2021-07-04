
import React , {} from "react"

import "./../CSS/FooterContact.css"

const FooterContact = () => {

return (
    <div className="FooterContact">
        <ul className="icons">
            <li><a ><i className="fab fa-github" /></a>  </li>
            <li> <a href=""> <i className="fab fa-twitter" /> </a> </li>
            <li> <a href="mailto:milosmilic032@gmail.com" target="_blank"> <i className="fas fa-envelope" /> </a> </li>
        </ul>
        <ul className="links">

            <li><a>Contact</a></li>
            <li><a>About</a></li>
            <li><a>Terms of use</a></li>

        </ul>
   <p className="copyRight"> © 2020 Miloš Milić</p>
    </div>
)
}

export default FooterContact ;