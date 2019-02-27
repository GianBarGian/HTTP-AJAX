import React from 'react';
import axios from 'axios';
import Friend from './Friend';


export default class FriendsList extends React.Component {
    state = {
        friends: [],
        error: null,
        loading: false,
    }

    componentDidMount() {
        this.fetchData('http://localhost:5000/friends')
        
    }

    fetchData = url => {
        this.resetError();
        this.startSpinner();
        axios.get(url)
            .then(res => this.setFriends(res.data))
            .catch(this.setError)
            .then(this.stopSpinner);
    }

    setFriends = friends => {
        this.setState({ friends });
    }

    setError = error => {
        this.setState({ error });
    }

    resetError = () => this.setState({ error: null })

    startSpinner = () => this.setState({ loading: true })

    stopSpinner = () => this.setState({ loading: false }) 

    render() {
        if(this.state.loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        if (this.state.error) {
            return (
                <div>{this.state.error.message}</div>
            )
        }
        return (
            <div>
               {
                   this.state.friends.map(friend => 
                       <Friend friend={friend} />
                   )
               }
            </div>
        )
    }
}