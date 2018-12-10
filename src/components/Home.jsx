import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import axios from 'axios'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            apiKey:'',
            token:'',
            sessionId:'',
            CHROME_EXTENSION_ID:'jkempjiialedbaaicflemdhdbcfppleb'
        }
    }

        componentDidMount(){
            const apikey = localStorage.getItem('apiKey')
            const token = localStorage.getItem('token')
            const sessionId = localStorage.getItem('sessionId')
            if(!apikey){
                axios.get('http://localhost:3000/opentok')
                .then(response=>{
                    // console.log(response.data)
                    const toState = response.data
                    this.setState({
                        apiKey:toState.apiKey,
                        token:toState.token,
                        sessionId:toState.sessionId
                    })
                    localStorage.setItem('apiKey',toState.apiKey)
                    localStorage.setItem('token',toState.token)
                    localStorage.setItem('sessionId',toState.sessionId)
                    console.log('ini state',this.state)
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                this.setState({
                    apiKey:apikey,
                    token:token,
                    sessionId:sessionId
                })
            }
        }

    render() {
        const {apiKey,token,sessionId} = this.state
        console.log('apikey nih',apiKey)
        if(!apiKey&&!sessionId&&!token){
            return(
                <div>
                    loading coy
                </div>
            )
        }else{
            return (
                <div>
                    {apiKey}
                    <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
                        <OTPublisher />
                            <OTStreams>
                                <OTSubscriber />
                            </OTStreams>
                    </OTSession>
                </div>
        )
        }
    }
}
