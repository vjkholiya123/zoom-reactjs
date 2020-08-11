import React, { Component } from 'react'
import { ZoomMtg } from '@zoomus/websdk';

export default class ZoomCall extends Component {
 state = {}
 componentDidMount() {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
 }

 startZoomCall = (meeting_number_temp, password) => {
     console.log('Starting/Joining zoom call: ', meeting_number_temp);
     const meeting_number = encodeURIComponent(meeting_number_temp);
     fetch(`http://localhost:8000/signature?meeting_number=${meeting_number}`)
        .then((res)=> {
            return res.json();
        })
        .then(data => {
            console.log('Zoom Signature Response: ', data.signature, '---', password);

            ZoomMtg.init({
                disableRecord: false,
                videoDrag: true,
                sharingMode: 'both',
                success: () => {
                  console.log('Sucess');
                  ZoomMtg.join(
                    {
                      meetingNumber: meeting_number_temp,
                      userName: 'Vijay S. K.',
                      signature: data.signature,
                      apiKey: '{YOUR_ZOOM_API_KEY}',
                      passWord: password,
                      success: (res) => {
                        // $('#nav-tool').hide();
                        console.log('join meeting success:', res);
                      },
                      error: (res) => {
                        console.log('Error point 1:', res);
                      }
                    }
                  );
                },
                error: (res) => {
                  console.log('Error point 2:', res);
                }
              });

        })
        .catch((err) => {
            console.log('Error: ', err);
        })
 }

 render() {
  const mystyle = {
    width: '100%',
    height: '20em',
    position: 'relative'
    };
  return(
    <div className="hidde" style={mystyle} id = "zmmtg-root">
    </div>
    )
   }
 }

 ZoomCall.propTypes = {
 }