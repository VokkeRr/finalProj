import React, { useState } from 'react'
import { ADD_IMG } from '../../actionTypes';

export default function AddImgForm({ dispatch }) {
    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch({ type: ADD_IMG, imgName: imgName, imgLink: imgLink });
        setImgName('');
        setImgLink('');
    };
    const handleSave = evt => {
        let imgLink = evt.target.value;
        setImgLink(imgLink);
    };
    const handleSaveName = evt => {
        let imgName = evt.target.value;
        setImgName(imgName);
    };
    const [imgLink, setImgLink] = useState('');
    const [imgName, setImgName] = useState('');

    return(
        <form action="" className="add-img-form" onSubmit={handleSubmit}>
            <div className="add-img">Add images</div>
            <div className="blockFlex">
                <div className="blockInput">
                    <input type="text" placeholder="URL Here" onChange={handleSave} value={imgLink} className="inputss"/>
                    <input type="text" placeholder="Name here" onChange={handleSaveName} value={imgName} className="bottomInput" />
                </div>
                <button className="buttonAdd">Accept</button>
            </div>
        </form>
    )

}






