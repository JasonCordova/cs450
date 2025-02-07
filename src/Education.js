const Education = (props) => {

    return (
        <>
        
            <div class="cell">
              <div class="cell-title">{props.education.title}</div>
              <div class="cell-text">
                <b>{props.education.bsInstitution}</b>
                <div>{props.education.bsDegree}</div>
                <div>{props.education.bsDates}</div>
                <div>GPA: {props.education.bsGpa}</div>
                <br/>
                <b>{props.education.msInstitution}</b>
                <div>{props.education.msDegree}</div>
                <div>{props.education.msDates}</div>
                <div>GPA: {props.education.msGpa}</div>
              </div>
            </div>
        </>
    )

}

export default Education;