import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const formatTimeAgoShort = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
};

const CommentSection = ({ postId, onPostUpdate, showList }) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null); // commentId
    const [replyTexts, setReplyTexts] = useState({});

    const fetchComments = async () => {
        try {
            const res = await api.get(`/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            console.error('Error fetching comments', err);
        }
    };

    useEffect(() => {
        if (showList) fetchComments();
    }, [postId, showList]);

    const handleAddComment = async (e) => {
        if (e) e.preventDefault();
        if (!newComment) return;
        try {
            await api.post('/comments', { postId, content: newComment });
            setNewComment('');
            fetchComments();
            if (onPostUpdate) onPostUpdate();
        } catch (err) {
            console.error('Error adding comment', err);
        }
    };

    const handleToggleLike = async (id, type) => {
        try {
            const body = {};
            if (type === 'comment') body.commentId = id;
            else if (type === 'reply') body.replyId = id;
            await api.post('/likes/toggle', body);
            fetchComments();
        } catch (err) {
            console.error('Error toggling like', err);
        }
    };

    const handleAddReply = async (e, commentId) => {
        if (e) e.preventDefault();
        const content = replyTexts[commentId];
        if (!content) return;
        try {
            await api.post('/comments/reply', { commentId, content });
            setReplyTexts({ ...replyTexts, [commentId]: '' });
            setReplyingTo(null);
            fetchComments();
            if (onPostUpdate) onPostUpdate();
        } catch (err) {
            console.error('Error adding reply', err);
        }
    };

    return (
        <div className="_feed_inner_timeline_cooment_area">
            <div className="_feed_inner_comment_box">
                <form className="_feed_inner_comment_box_form" onSubmit={handleAddComment}>
                    <div className="_feed_inner_comment_box_content">
                        <div className="_feed_inner_comment_box_content_image">
                            <img src={user?.avatar || "assets/images/comment_img.png"} alt="" className="_comment_img" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        </div>
                        <div className="_feed_inner_comment_box_content_txt">
                            <textarea 
                                className="form-control _comment_textarea" 
                                placeholder="Write a comment" 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleAddComment(e);
                                    }
                                }}
                            ></textarea>
                        </div>
                    </div>
                </form>
            </div>

            {showList && (
                <div className="_timline_comment_main">
                    {comments.map((comment) => (
                        <div key={comment.id} className="_comment_main">
                            <div className="_comment_image">
                                <a href="#0" className="_comment_image_link">
                                    <img src={comment.author.avatar || "assets/images/txt_img.png"} alt="" className="_comment_img1" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                </a>
                            </div>
                            <div className="_comment_area">
                                <div className="_comment_details">
                                    <div className="_comment_details_top">
                                        <div className="_comment_name">
                                            <a href="#0">
                                                <h4 className="_comment_name_title">{comment.author.firstName} {comment.author.lastName}</h4>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="_comment_status">
                                        <p className="_comment_status_text"><span>{comment.content}</span></p>
                                    </div>
                                    <div className="_total_reactions">
                                        <div className="_total_react">
                                            <span className="_reaction_like">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                            </span>
                                            <span className="_reaction_heart">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </span>
                                        </div>
                                        <span className="_total">{comment._count?.likes || 0}</span>
                                    </div>
                                    <div className="_comment_reply">
                                        <div className="_comment_reply_num">
                                            <ul className="_comment_reply_list">
                                                <li><span onClick={() => handleToggleLike(comment.id, 'comment')} style={{ cursor: 'pointer', color: comment.likes?.some(l => l.userId === user?.id) ? '#1890FF' : 'inherit' }}>Like.</span></li>
                                                <li><span onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} style={{ cursor: 'pointer' }}>Reply.</span></li>
                                                <li><span>Share</span></li>
                                                <li><span className="_time_link">.{formatTimeAgoShort(comment.createdAt)}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Replies List */}
                                {comment.replies?.map((reply) => (
                                    <div key={reply.id} className="_comment_main ms-4 mt-2">
                                        <div className="_comment_image">
                                            <img src={reply.author.avatar || "assets/images/txt_img.png"} alt="" className="_comment_img1" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                        </div>
                                        <div className="_comment_area">
                                            <div className="_comment_details bg-light p-2 rounded">
                                                <h6 className="mb-0 small font-weight-bold">{reply.author.firstName} {reply.author.lastName}</h6>
                                                <p className="mb-0 small">{reply.content}</p>
                                                <div className="d-flex align-items-center gap-2 mt-1">
                                                    <small onClick={() => handleToggleLike(reply.id, 'reply')} style={{ cursor: 'pointer', color: reply.likes?.some(l => l.userId === user?.id) ? '#1890FF' : 'inherit' }}>Like ({reply._count?.likes || 0})</small>
                                                    <small className="text-muted">.{formatTimeAgoShort(reply.createdAt)}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {replyingTo === comment.id && (
                                    <div className="_feed_inner_comment_box ms-4 mt-2">
                                        <form className="_feed_inner_comment_box_form" onSubmit={(e) => handleAddReply(e, comment.id)}>
                                            <div className="_feed_inner_comment_box_content">
                                                <div className="_feed_inner_comment_box_content_image">
                                                    <img src={user?.avatar || "assets/images/comment_img.png"} alt="" className="_comment_img" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                                </div>
                                                <div className="_feed_inner_comment_box_content_txt">
                                                    <textarea 
                                                        className="form-control _comment_textarea" 
                                                        placeholder="Write a reply..."
                                                        value={replyTexts[comment.id] || ''}
                                                        onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                handleAddReply(e, comment.id);
                                                            }
                                                        }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
