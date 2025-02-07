const PersonalProfile = (props) => {

    return (
        <>
        
            <div class="cell">
              <div class="cell-title">{props.personalProfile.title}</div>
              <div class="cell-text">{props.personalProfile.content}</div>
            </div>

        </>
    )

}

export default PersonalProfile;