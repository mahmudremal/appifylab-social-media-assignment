import React, { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import CommentSection from './CommentSection';

const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const PostCard = ({ post, onPostDeleted, onPostUpdate }) => {
    const { user } = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);
    const [showLikers, setShowLikers] = useState(false);
    const [isTimelineDropShow, setIsTimelineDropShow] = useState(false);
    const isLiked = post.likes?.some(l => l.userId === user?.id);

    const handleLike = async () => {
        try {
            await api.post(`/likes/post/${post.id}`);
            if (onPostUpdate) onPostUpdate();
        } catch (error) {
            console.error('Error liking post', error);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Post by ${post.author.firstName}`,
                    text: post.content,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing', err);
            }
        } else {
            alert('Web Share API not supported in this browser');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${post.id}`);
                onPostDeleted(post.id);
            } catch (err) {
                console.error('Error deleting post', err);
            }
        }
    };

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <div className="_feed_inner_timeline_post_top">
                    <div className="_feed_inner_timeline_post_box">
                        <div className="_feed_inner_timeline_post_box_image">
                            <img src={post.author.avatar || "assets/images/post_img.png"} alt="" className="_post_img" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        </div>
                        <div className="_feed_inner_timeline_post_box_txt">
                            <h4 className="_feed_inner_timeline_post_box_title">{post.author.firstName} {post.author.lastName}</h4>
                            <p className="_feed_inner_timeline_post_box_para">
                                {formatTimeAgo(post.createdAt)} . <a href="#0">{post.isPublic ? 'Public' : 'Private'}</a>
                            </p>
                        </div>
                    </div>
                    <div className="_feed_inner_timeline_post_box_dropdown">
                        <div className="_feed_timeline_post_dropdown">
                            <button 
                                id="_timeline_show_drop_btn" 
                                className="_feed_timeline_post_dropdown_link btn p-0 border-0"
                                onClick={() => setIsTimelineDropShow(!isTimelineDropShow)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={4} height={17} fill="none" viewBox="0 0 4 17">
                                    <circle cx={2} cy={2} r={2} fill="#C4C4C4"></circle>
                                    <circle cx={2} cy={8} r={2} fill="#C4C4C4"></circle>
                                    <circle cx={2} cy={15} r={2} fill="#C4C4C4"></circle>
                                </svg>
                            </button>
                            <div id="_timeline_drop" className={`_feed_timeline_dropdown _timeline_dropdown ${isTimelineDropShow ? 'show' : ''}`}>
                                <ul className="_feed_timeline_dropdown_list list-unstyled mb-0">
                                    <li className="_feed_timeline_dropdown_item">
                                        <a href="#0" className="_feed_timeline_dropdown_link">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"></path>
                                                </svg>
                                            </span>
                                            Save Post
                                        </a>
                                    </li>
                                    {user?.id === post.authorId && (
                                        <li className="_feed_timeline_dropdown_item">
                                            <button className="_feed_timeline_dropdown_link btn p-0 border-0 bg-transparent w-100 text-start d-flex align-items-center" onClick={handleDelete} style={{ color: 'inherit' }}>
                                                <span className="me-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"></path>
                                                    </svg>
                                                </span>
                                                Delete Post
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {post.content && <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>}
                {post.image && (
                    <div className="_feed_inner_timeline_image">
                        <img src={`http://localhost:5000${post.image}`} alt="" className="_time_img" />
                    </div>
                )}
            </div>
            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                <div className="_feed_inner_timeline_total_reacts_image position-relative"
                     onMouseEnter={() => setShowLikers(true)}
                     onMouseLeave={() => setShowLikers(false)}
                >
                    <img src="assets/images/react_img1.png" alt="Image" className="_react_img1" />
                    <img src="assets/images/react_img2.png" alt="Image" className="_react_img" />
                    <p className="_feed_inner_timeline_total_reacts_para" style={{ cursor: 'pointer' }}>{post._count.likes}+</p>
                    
                    {showLikers && post.likes?.length > 0 && (
                        <div className="position-absolute bg-dark text-white p-2 rounded shadow-lg" style={{ zIndex: 100, bottom: '100%', left: '0', minWidth: '150px' }}>
                            <ul className="list-unstyled mb-0 small">
                                {post.likes.map((l, i) => (
                                    <li key={i}>{l.user.firstName} {l.user.lastName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="_feed_inner_timeline_total_reacts_txt">
                    <p className="_feed_inner_timeline_total_reacts_para1">
                        <a href="#0" onClick={(e) => { e.preventDefault(); setShowComments(!showComments); }}>
                            <span>{post._count.comments}</span> Comment
                        </a>
                    </p>
                    <p className="_feed_inner_timeline_total_reacts_para2"><span>0</span> Share</p>
                </div>
            </div>
            <div className="_feed_inner_timeline_reaction">
                <button 
                    className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
                    onClick={handleLike}
                >
                    <span className="_feed_inner_timeline_reaction_link"> 
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"></path>
                                <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"></path>
                                <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"></path>
                                <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"></path>
                            </svg>
                            Haha
                        </span>
                    </span>
                </button>
                <button className="_feed_inner_timeline_reaction_comment _feed_reaction" onClick={() => setShowComments(!showComments)}>
                    <span className="_feed_inner_timeline_reaction_link"> 
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"></path>
                                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"></path>
                            </svg>
                            Comment
                        </span>
                    </span>
                </button>
                <button className="_feed_inner_timeline_reaction_share _feed_reaction" onClick={handleShare}>
                    <span className="_feed_inner_timeline_reaction_link"> 
                        <span>
                            <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"></path>
                            </svg>
                            Share
                        </span>
                    </span>
                </button>
            </div>
            <CommentSection postId={post.id} onPostUpdate={onPostUpdate} showList={showComments} />
        </div>
    );
};

export default PostCard;
