import React, { Component } from 'react';
import axios from 'axios'
import Inbox from './Inbox/Inbox'

class Chat extends Component {
    state={
        users:[
            {userId:'1',name:'luis'},
            {userId:'2',name:'felipe'},
            {userId:'3',name:'jaime'}
        ],
        userId: 4, // by props
        destId:null
    }



    /*
    componentDidMount(){
        let path = `http://127.0.0.1:8080/getChatUsers?=${this.props.userId}`
        axios.post(path)
        .then( response =>{
            this.setState({
                users:response.data
            })
        })
    }


    */

    selectionHandler = id=>{
        console.log(id)
        this.setState({
            destId:id
        })
    }



    render() {
        
        let users = null 
        users = this.state.users.map( user=>{
            return   <p key={user.userId} onClick={()=>this.selectionHandler(user.userId)} > {user.name} </p>
        })

        let inbox = null
        if(this.state.destId!==null){
            inbox=<Inbox srcId={this.state.userId} destId={this.state.destId}/>
        }
        return (
            
            <div className="Chat">
                {users}
                {inbox}
            </div>
        );
    }
}

export default Chat;
