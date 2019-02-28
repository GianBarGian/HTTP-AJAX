import React from 'react';
import styled from 'styled-components';
import Friend from './Friend';


export default function FriendsList({ loading, error, friends, deleteFriend }) {
    if(loading) {
        return (
             <div>
                Loading...
            </div>
        )
    }
    if (error) {
        return (
            <div>{error.message}</div>
        )
    }
    return (
        <div>
           {
               friends.map(friend => 
                    <Friend 
                        key={friend.id} 
                        deleteFriend={deleteFriend} 
                        friend={friend} 
                    />
                )
           }
        </div>
    )
}



