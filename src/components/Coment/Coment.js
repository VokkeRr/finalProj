import React, { useState } from 'react'
import SubComments from '../SubComents/SubComents.js'
import { COMMENT_LIKE, COMMENT_REMOVE, COMMENT_ADD } from '../../actionTypes';

export default function Coment({ mainComment, dispatch }) {
    const [message, setMessage] = useState('');
    const [heartColor, setHeartColor] = useState('');
    const [heartLiked, setHeartLiked] = useState(false);

    const onSave = evt => {
        const message = evt.target.value;
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
        dispatch({ type: COMMENT_LIKE, mainCommentId: mainComment.id });
    };
    const remove = () => {
        dispatch({ type: COMMENT_REMOVE, mainCommentRemoveId: mainComment.id });
    };
    const addComment = evt => {
        evt.preventDefault();
        dispatch({ type: COMMENT_ADD, mainCommentAddId: mainComment.id, mainMessage: message });
        setMessage('');
    };

    return (
        <div className="maincomment">
            <p>{mainComment.name}</p>
            <p>{mainComment.content}</p>
            <button onClick={handleLike} className={heartColor}>{mainComment.likes}</button>
            <button onClick={remove}>Delete</button>
            <form onSubmit={addComment}>
                <input type="text" placeholder="respond" onChange={onSave} value={message} className="luboychi"/>
                <button>respond</button>
            </form>
            {mainComment.comments.map(o => <SubComments
                subComments={o}
                dispatch={dispatch}
            />)}
        </div>
    )
}

