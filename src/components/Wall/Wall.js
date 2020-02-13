import React, { useReducer } from 'react'
import AddImgForm from '../AddImgForm/AddImgForm';
import Post from '../Post/Post.js'
import { LIKE, REMOVE, ADD, COMMENT_LIKE, SUB_COMMENT_LIKE, COMMENT_REMOVE, SUB_COMMENT_REMOVE, COMMENT_ADD, ADD_IMG } from '../../actionTypes.js';
let nextPostId = 1;
let nextMainCommentId = 1;
let nextSubCommentId = 1;


const initialData = [
    {
        id: nextPostId++,
        imgUrl: 'https://www.gstatic.com/images/icons/material/apps/fonts/1x/opengraph_color_1200dp.png',
        imgName: 'PewDiePie',
        likes: 7,
        isLiked: false,
        comments: []
    }
];

function commentLike(comments, id) {
    return comments.map(o => {
        if (o.id !== id) {
            return o
        }
        if (o.isLiked) {
            return { ...o, likes: o.likes - 1, isLiked: false };
        }
        return { ...o, likes: o.likes + 1, isLiked: true };
    })
};
function subCommentLike(mainComments, id) {
    return mainComments.map(
        p => ({ ...p, comments: commentLike(p.comments, id) })
    )
};

function remove(data, id) {
    return data.filter(o => o.id !== id);
};

function subCommentRemove(mainComments, id) {
    return mainComments.map(
        p => ({ ...p, comments: remove(p.comments, id) })
    )
};
function addComment(data, message) {
    return [{ id: nextMainCommentId++, name: 'Vokker Bely', content: message, likes: 0, isLiked: false, comments: [] }, ...data]
}
function addSubComment(data, id, message) {
    return data.map(
        p =>
            ({
                ...p, comments: p.id !== id ? p.comments : [...p.comments, {
                    id: nextSubCommentId++, name: 'Teymuras Chetkiy', content: message, likes: 0, isLiked: false
                }]
            })
    )
}
function reducer(data, action) {
    switch (action.type) {
        case LIKE:
            const { likePostId } = action;
            return commentLike(data, likePostId);
        case COMMENT_LIKE:
            const { mainCommentId } = action;
            return data.map(
                o => ({ ...o, comments: commentLike(o.comments, mainCommentId) })
            );
        case SUB_COMMENT_LIKE:
            const { subCommentId } = action;
            return data.map(
                o => ({ ...o, comments: subCommentLike(o.comments, subCommentId) })
            );
        case REMOVE:
            const { removePostId } = action;
            return remove(data, removePostId);
        case COMMENT_REMOVE:
            const { mainCommentRemoveId } = action;
            return data.map(
                o => ({ ...o, comments: remove(o.comments, mainCommentRemoveId) })
            );
        case SUB_COMMENT_REMOVE:
            const { subCommentRemoveId } = action;
            return data.map(
                o => ({ ...o, comments: subCommentRemove(o.comments, subCommentRemoveId) })
            );
        case ADD:
            const { addPostId } = action;
            const { message } = action;
            return data.map(
                o => ({
                    ...o,
                    comments: o.id !== addPostId ? o.comments : addComment(o.comments, message)
                })
            );
        case COMMENT_ADD:
            const { mainCommentAddId } = action;
            const { mainMessage } = action;
            return data.map(
                o => ({
                    ...o,
                    comments: addSubComment(o.comments, mainCommentAddId, mainMessage)
                })
            );
        case ADD_IMG:
            const { imgLink } = action;
            const { imgName } = action;
            return [...data, { id: nextPostId++, imgUrl: imgLink, imgName: imgName, likes: 0, isLiked: false, comments: [] }];
        default:
            return data;
    }
}



export default function Wall() {
    const [data, dispatch] = useReducer(reducer, initialData);

    const myTubeIcon = 'https://image.flaticon.com/icons/svg/2497/2497489.svg';

    return (
        <div className="main">
            <header>
                <div>
                    <img src={myTubeIcon} alt="" className="myTubeIcon" />
                </div>
                <div className="title">NE<span>vk</span>ONTAKTE</div>
                <div>
                    <img src="https://image.flaticon.com/icons/svg/87/87415.svg" alt="" className="secIcon"/>
                </div>
            </header>
            <div className="include">
                <div className="postAddForm">
                    <AddImgForm dispatch={dispatch} />
                </div>
            </div>
            <main className="blockmain">
                <h2>Лента</h2>
                <article>
                    <ul>
                        {
                            data.map(o => <Post
                                data={o}
                                dispatch={dispatch}
                            />)
                        }
                    </ul>
                </article>
            </main>
        </div>
    )
}