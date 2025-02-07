const WorkExperience = (props) => {

    return (
        <>
        
            <div class="cell">
              <div class="cell-title">{props.workExperience.title}</div>
              <div class="cell-text fc">
                <div class="job">
                  <b>{props.workExperience.job1}</b>
                  <div>{props.workExperience.job1Content}</div>
                </div>
                <div class="job">
                  <b>{props.workExperience.job2}</b>
                    <div>{props.workExperience.job2Content}</div>
                </div>
              </div>
            </div>

        </>
    )

}

export default WorkExperience;