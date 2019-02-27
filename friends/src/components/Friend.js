import React from 'react';

export default function Friend ({ friend }) {
    return (
        <div className="friend">
            <p>{friend.name}</p>   
            <p>{friend.age}</p>
            <p>{friend.email}</p>
        </div>
    )
}