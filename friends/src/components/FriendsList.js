import React from 'react';
import axios from 'axios';
import Friend from './Friend';


export default class FriendsList extends React.Component {
    state = {
        friends: [],
        error: null,
        loading: false,
        selectedFriend: null,
    }

    inputNameRef = React.createRef();
    inputAgeRef = React.createRef();
    inputEmailRef = React.createRef();

    componentDidMount() {
        this.fetchData('http://localhost:5000/friends')
        
    }

    fetchData = url => {
        this.resetError();
        this.startSpinner();
        axios.get(url)
            .then(res => this.setFriends(res.data))
            .catch(this.setError)
            .finally(this.stopSpinner);
    }

    postFriend = () => {
        const name= this.inputNameRef.current.value;
        const age= this.inputAgeRef.current.value;
        const email = this.inputEmailRef.current.value;
        const id = this.state.friends.length + 1;

        this.resetError();
        this.startSpinner();
        axios.post('http://localhost:5000/friends', { id, name, age, email})
            .then(res => this.setFriends(res.data))
            .catch(this.setError)
            .finally(this.stopSpinner);
    }

    updateFriend = id => {
        const name= this.inputNameRef.current.value;
        const age= this.inputAgeRef.current.value;
        const email = this.inputEmailRef.current.value;

        this.resetError();
        this.startSpinner();
        axios.put(`http://localhost:5000/friends/${id}`, { name, age, email})
            .then(res => this.setFriends(res.data))
            .catch(this.setError)
            .finally(this.stopSpinner);
    }

    deleteFriend = id => {
        this.resetError();
        this.startSpinner();
        axios.delete(`http://localhost:5000/friends/${id}`)
            .then(res => this.setFriends(res.data))
            .catch(this.setError)
            .finally(this.stopSpinner);
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
                        <Friend 
                            key={friend.id} 
                            deleteFriend={this.deleteFriend} 
                            friend={friend} 
                        />
                   )
               }
                <form>
                    <select name="friends" value={this.state.selectedFriend} onChange={e => this.setState({ selectedFriend: e.target.value })}>
                        <option>Choose a friend</option>
                        {
                            this.state.friends.map(friend => 
                                <option key={friend.id} value={friend.id}>{friend.name}</option>    
                            )
                        }
                    </select>
                    <input type="text" placeholder="name" ref={this.inputNameRef}/>
                    <input type="number" placeholder="age" ref={this.inputAgeRef}/>
                    <input type="email" placeholder="email" ref={this.inputEmailRef}/>
                    <input onClick={this.postFriend} type="button" value="Submit"/>
                    <input onClick={() => this.updateFriend(this.state.selectedFriend)} type="button" value="Update"/>
                </form>
            </div>
        )
    }
}
