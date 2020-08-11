import React, { Component } from 'react';
import FlexView from 'react-flexview';

import './App.css';
import ZoomCall from './ZoomCall';

class App extends Component {

  constructor(props) {
    super(props);
    this.zoomCall = React.createRef();
    this.state = {
      data_loaded: false,
      meeting_id: '',
      meeting_password: '',
      join_url: '',
      status: ''
    }
  }

  onCreateMeetingClick = () => {
    // this.zoomCall.current.startZoomCall();
    console.log('Create Meeting Button Clicked');
    fetch("http://localhost:8000")
        .then((res)=> {
            return res.json();
        })
        .then(data => {
            this.showMeetingData(data);
        })
        .catch((err) => {
            console.log('Error: ', err);
        })
  }

  joinMeeting = () => {
    this.zoomCall.current.startZoomCall(this.state.meeting_id, this.state.meeting_password);
  }

  showMeetingData = (data) => {
    console.log('App data:', data);
    this.setState({
      data_loaded: true,
      meeting_id: data.meeting_response.id,
      meeting_password: data.meeting_response.password,
      join_url: data.meeting_response.join_url,
      status: data.meeting_response.status
    })
  }

  render() {
  return(
    <div className="App">
      <FlexView hAlignContent='center'>
          <FlexView >
            <div className="create-meeting-element">
                <button disabled={this.state.data_loaded} onClick={this.onCreateMeetingClick} style={{width: '12em', height: '3em', backgroundColor: 'green'}} >
                 Generate JWT Token And Create Meeting
               </button>
            </div>
            <div className="join-meeting-element">
               <button disabled={!this.state.data_loaded} onClick={this.joinMeeting} style={{width: '12em', height: '3em', backgroundColor: 'green', marginLeft: '2em'}}>
              Join Meeting
               </button>
            </div>

           {/* Display the Data of the meeting generated via Zoom API call */}
          </FlexView>
          {
            this.state.data_loaded ? 
             <div>
               Meeting Data After API call:
               <FlexView column vAlignContent='center'>
                  <div>Meeting ID: {this.state.meeting_id}</div>
                  <div>Meeting Password: {this.state.meeting_password}</div>
                  <div>Join URL: {this.state.join_url}</div>
                  <div>Meeting Status: {this.state.status}</div>
               </FlexView>
             </div>
               :
             <div>
              Nothing to show here
            </div>
          }
          
      </FlexView> 
      <header className="App-header">
        <ZoomCall 
          ref={this.zoomCall}/>
      </header>
    </div>    )
   }
 }

export default App;
