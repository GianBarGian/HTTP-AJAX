import React from 'react';
import PT from 'prop-types';

export default function Form ({ 
                                selectedFriend, 
                                friends, 
                                inputNameRef, 
                                inputAgeRef, 
                                inputEmailRef, 
                                updateSelected, 
                                postFriend, 
                                updateFriend 
                            }) {
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

Form.propTypes = {
    selectedFriend: PT.string.isRequired,
    friends: PT.arrayOf(PT.shape({
        id: PT.number.isRequired,
        name: PT.string.isRequired,
        age: PT.number.isRequired,
        email: PT.string.isRequired,
    }).isRequired).isRequired,
    inputNameRef: PT.object.isRequired,
    inputAgeRef: PT.object.isRequired,
    inputEmailRef: PT.object.isRequired,
    updateSelected:PT.func.isRequired,
    postFriend: PT.func.isRequired,
    updateFriend: PT.func.isRequired,
}