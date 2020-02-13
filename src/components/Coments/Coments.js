import React from 'react'
import Comment from '../Coment/Coment.js'


export default function Coments({ mainComments, dispatch }) {
    return (
        <div>
                        <Comment
                mainComment={mainComments}
                dispatch={dispatch}
            />
        </div>
    )
}


