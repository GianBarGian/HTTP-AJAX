import React from 'react';
import axios from 'axios';


export default class FriendsList extends React.Component {
    state = {
        friends: null,
        error: null,
        loading: false,
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
}