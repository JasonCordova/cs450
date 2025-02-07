const Header = (props) => {
    return (
        <>

            <div class="f1">

              <div class="b1">
                <div class="name">{props.personalInfo.name}</div>
                <div class="title">{props.personalInfo.occupation}</div>
              </div>

            <div class="contacts">
              <div class="email">
                <b>Email:</b> <a href="mailto:jlc23@njit.edu">{props.contactInfo.email}</a>
              </div>
              <div class="linkedin"><b>Social:</b> <a href="https://www.linkedin.com/in/jason-cordova/">{props.contactInfo.web}</a></div>
              <div class="mobile"><b>Mobile:</b> {props.contactInfo.mobile}</div>
            </div>
              
          </div>
        
        </>
    )
}

export default Header;