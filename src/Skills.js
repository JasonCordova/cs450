const Skills = (props) => {

    return (
        <>
        
            <div class="cell">
              <div class="cell-title">{props.skills.title}</div>
              <div class="cell-text fs">
                <div class="fc">
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                </div>
                <div class="fc">
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                </div>
                <div class="fc">
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                  <div>{props.skills.content1}</div>
                </div>
              </div>
            </div>

        </>
    )

}

export default Skills;