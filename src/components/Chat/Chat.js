import React, { Component } from 'react';
import axios from 'axios'
import Inbox from './Inbox/Inbox'
import './Chat.css'
class Chat extends Component {


    constructor(props){
        super(props);
        console.log(this.props.destId)
        this.state={
            users:[],
            destId:this.props.destId
        }
    }



    componentWillMount(){
      let path = `http://127.0.0.1:8080/getChatUsers?userId=${this.props.userId}`
      axios.get(path)
      .then( response =>{
          this.setState({
              users:response.data.data
          })
      })
      .catch( error=>{
          console.log(error);
      })
    }


    componentDidMount(){
        this.interval = setInterval(() =>{
            let path = `http://127.0.0.1:8080/getChatUsers?userId=${this.props.userId}`
            axios.get(path)
            .then( response =>{
                this.setState({
                    users:response.data.data
                })
            })
            .catch( error=>{
                console.log(error);
            })
        }, 10000);

    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    selectionHandler = id=>{
        console.log(id)
        this.setState({
            destId:id
        })
    }



    render() {

        let users = null
        users = this.state.users.map( user=>{
            return   <p key={user.userId} onClick={()=>this.selectionHandler(user.userId)} className="user"> {user.firstName} {user.lastName} </p>
        })

        let inbox = null
        if(this.state.destId)inbox=<Inbox srcId={this.props.userId} destId={this.state.destId}/>

        return (

            <div className="Chat">
                {inbox}
                <div className="Users">
                  {users}
                </div>
            </div>
        );
    }
}

export default Chat;
