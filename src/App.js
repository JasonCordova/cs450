import './App.css';
import React, { Component } from 'react';
import Header from './Header';
import PersonalProfile from './PersonalProfile';
import Skills from './Skills';
import WorkExperience from './WorkExperience';
import Education from './Education';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personInfo:{
        name: "Jason Cordova",
        occupation: "Computer Scientist"
      },
      contactInfo: {
        email: "jlc23@njit.edu",
        web: "LinkedIn",
        mobile: "01234567890"
      },
      profile: {
        title: "Personal Profile",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      workExperience: {
        title: "Work Experience",
        job1: "Software QA Intern @  Broadridge (June 2024 – Aug 2024)",
        job1Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        job2: "Suplly Chain Analyst @ Harmon Face Values (May 2022 – Aug 2022)",
        job2Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      keySkills: {
        title: "Key Skills",
        content1: "A Key skill"
      },
      education: {
        title: "Education",
        bsInstitution: "New Jersey Institute of Technology",
        bsDegree: "BS in Computer Science",
        bsDates: "2020 - 2025",
        bsGpa: "3.8",
        msInstitution: "New Jersey Institute of Technology",
        msDegree: "MS in Data Science",
        msDates: "2026 - 2027",
        msGpa: "4.0"
      }
    }
  }
  render(){
    return (

        <>
        
        <div class="holder">

        <div class="resume">

            <Header personalInfo={this.state.personInfo} contactInfo={this.state.contactInfo}/>

            <div class="f2">

              <PersonalProfile personalProfile={this.state.profile}/>

              <WorkExperience workExperience={this.state.workExperience}/>

              <Skills skills={this.state.keySkills}/>

              <Education education={this.state.education}/>

            </div>

        </div>

      </div>
        
        </>

    );
  }
}

export default App;
