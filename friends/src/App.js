import React, { Component } from 'react';
import axios from 'axios';
import FriendsList from './components/friends/FriendsList';
import Form from './components/form/Form';

class App extends Component {
  state = {
    friends: [],
    error: null,
    loading: false,
    selectedFriend: "",
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
   
  updateSelected = string => {
    this.setState({
      updateSelected: string
    })
  }

  render() {
      return (
        <div className="App">
          <FriendsList 
            loading={this.state.loading} 
            error={this.state.error} 
            friends={this.state.friends} 
            deleteFriend={this.deleteFriend} 
          />
          <Form 
            selectedFriend={this.state.selectedFriend}
            friends={this.state.friends} 
            inputNameRef={this.inputNameRef}
            inputAgeRef={this.inputAgeRef}
            inputEmailRef={this.inputEmailRef}
            updateSelected={this.updateSelected}
            postFriend={this.postFriend}
            updateFriend={this.updateFriend}
          />
        </div>
      );
    }
}

export default App;
