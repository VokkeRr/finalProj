import React from 'react'
import SubComent from '../SubComent/SubComent.js'

export default function SubComents({ subComments, dispatch }) {
    return (
        <div>
            <SubComent
            subComment={subComments}
            dispatch={dispatch}
            />
        </div>
    )
}

