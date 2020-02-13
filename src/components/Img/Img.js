import React, { useState } from 'react'
import Comments from '../Coments/Coments.js'
import { LIKE, REMOVE, ADD } from '../../actionTypes';

export default function Img({ data, dispatch }) {
    const [message, setMessage] = useState('');
    const [heartColor, setHeartColor] = useState('');
    const [heartLiked, setHeartLiked] = useState(false);

    const handleSave = evt => {
        let message = evt.target.value;
        setMessage(message);
    };

    const handleLike = () => {
        if (heartLiked) {
            setHeartLiked(false);
            setHeartColor('black');
        } else {
            setHeartLiked(true);
            setHeartColor('red');
        }
        dispatch({ type: LIKE, likePostId: data.id });
    };
    const handleRemove = () => {
        dispatch({ type: REMOVE, removePostId: data.id });
    };
    const addComment = evt => {
        evt.preventDefault();
        dispatch({ type: ADD, addPostId: data.id, message: message })
        setMessage('');
    };



    return (
        <li className="blockimg">
            <img  className="img" src={data.imgUrl}/>
            <div className="colorsersa">
                <div className="blocksssaf">
                    <div>
                        <div className="nameAuthor">{data.imgName}</div>
                    </div>
                    <div>
                        <button onClick={handleLike} className={heartColor}>♥{data.likes}</button>
                        <button onClick={handleRemove}>Delete</button>
                    </div>
                </div>
                
                
                
                <label htmlFor="post-img-add-comment">Comment</label>
                <form onSubmit={addComment} className="avatar">
                    <input type="text" id="post-img-add-comment" placeholder="add your comment" onChange={handleSave} value={message} />
                    <button onClick={addComment}>Add</button>
                </form>
            </div>
            
            <div className="common">
                {
                    data.comments.map(o => <Comments
                        mainComments={o}
                        dispatch={dispatch}
                    />)
                }
            </div>
        </li>
    )
}

