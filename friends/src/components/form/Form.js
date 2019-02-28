import React from 'react';

export default function Form ({ selectedFriend, friends, inputNameRef, inputAgeRef, inputEmailRef, updateSelected, postFriend, updateFriend }) {
    console.log(friends)
    return (
        <form>
        <select name="friends" value={selectedFriend} onChange={e => updateSelected(e.target.value)}>
            <option value="" >Choose a friend</option>
            {
                friends.map(friend => 
                    <option key={friend.id} value={friend.id}>{friend.name}</option>    
                )
            }
        </select>
        <input type="text" placeholder="name" ref={inputNameRef}/>
        <input type="number" placeholder="age" ref={inputAgeRef}/>
        <input type="email" placeholder="email" ref={inputEmailRef}/>
        <input onClick={postFriend} type="button" value="Submit"/>
        <input onClick={() => updateFriend(selectedFriend)} type="button" value="Update"/>
    </form>
    )
} 