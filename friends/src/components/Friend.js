import React from 'react';

export default function Friend ({ friend, deleteFriend }) {
    return (
        <div className="friend">
            <p>{friend.name}</p>   
            <p>{friend.age}</p>
            <p>{friend.email}</p>
            <input onClick={() => deleteFriend(friend.id)} type="button" value="Delete" />
        </div>
    )
}