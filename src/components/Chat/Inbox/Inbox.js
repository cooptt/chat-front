import React, { Component } from 'react';
import axios from 'axios'


class Inbox extends Component {
    state = {
        messages : [],
        message : ''
    }

    componentWillMount(){
        let path = `http://127.0.0.1:8080/getConversation?userId=${this.props.srcId}&mUserId=${this.props.destId}`
        axios.get(path)
        .then( response =>{
            this.setState({
                messages:response.data.data
            })
        })
        .catch( error=>{
            console.log(error);
        })


    }

    componentDidMount(){
      this.interval = setInterval(() =>{
          let path = `http://127.0.0.1:8080/getConversation?userId=${this.props.srcId}&mUserId=${this.props.destId}`
          axios.get(path)
          .then( response =>{
              this.setState({
                  messages:response.data.data
              })
          })
          .catch( error=>{
              console.log(error);
          })
      }, 3000);

    }


    componentWillUnmount() {
      clearInterval(this.interval);
    }



    sendMessageHandler = (event) =>{
        event.preventDefault();
        // here i send the message to Felipe
        let path = `http://127.0.0.1:8080/addMessage?rscUserId=${this.props.srcId}&destUserId=${this.props.destId}`
        axios.post(path,{content:this.state.message})
        .then( response =>{
            console.log(response);
            document.getElementById("sendMessageForm").reset()
        })
        .catch( error=>{
            console.log(error);
            document.getElementById("sendMessageForm").reset()
        })
    }

    typingHandler = (event) =>{
        this.setState({
            message:event.target.value
         })
    }
    render() {
        let messages = null;
        messages = this.state.messages.map( (msg,index)=>{
            if(msg.srcUserId===parseInt(this.props.srcId)){
                return   <p key={index} className="message" > You: {msg.content} </p>
            }else
                 return <p key={index}  className="message darker"> User: {msg.content} </p>
        })
        return (
            <div className="Inbox">
                <div className="Messages">
                    {messages}
                </div>
                <form onSubmit={this.sendMessageHandler} id="sendMessageForm">
                    <input type="text" onChange={this.typingHandler}  formnovalidate required/>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}

export default Inbox;
