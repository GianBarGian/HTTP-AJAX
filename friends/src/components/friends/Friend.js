import React from 'react';
import PT from 'prop-types';

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

Friend.propTypes = {
    friend: PT.shape({
        id: PT.number.isRequired,
        name: PT.string.isRequired,
        age: PT.number.isRequired,
        email: PT.string.isRequired,
    }).isRequired,
    deleteFriend: PT.func.isRequired,
}