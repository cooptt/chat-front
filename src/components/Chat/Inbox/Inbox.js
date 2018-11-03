import React, { Component } from 'react';



class Inbox extends Component {
    state = {
        messages : [
            {userId:'4',content: 'Hola'},
            {userId:'2',content: 'Hola tu'},
            {userId:'4',content: 'Como estas?'},
            {userId:'2',content: 'Bien y tu'}
        ],
        message : null
    }


    componentDidMount(){
        ///here get all messages
    }

    sendMessageHandler = (event) =>{
        event.preventDefault();
        // here i send the message to Felipe
        let messages = [...this.state.messages]
        messages.push({userId:this.props.userId,content:this.state.message})
        this.setState({
            messages
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
            if(msg.userId==this.props.srcId)
                return   <p key={index} > {msg.content} </p>
            else 
                 return <p key={index} >·············3 {msg.content} </p>
        })
        return (
            <div>
                {messages}
                <form onSubmit={this.sendMessageHandler}>
                    <input type="text" onChange={this.typingHandler} required/>
                    <input type="submit" value="Send Message"/>
                </form>
            </div>
        );
    }
}

export default Inbox;
