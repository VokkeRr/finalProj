import React from 'react'
import Img from '../Img/Img.js'

export default function Post({ data, dispatch }) {
    return (
        <li className="img-post">
            <Img
                data={data}
                dispatch={dispatch}
            />
        </li>
    )
}

