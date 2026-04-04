import React from 'react';
import PostCard from './PostCard';

export default function StoryFeed({ posts, onPostUpdate }) {
    if (!posts || posts.length === 0) {
        return <div className="text-center p-4">No posts yet.</div>;
    }

    const handlePostDeleted = (postId) => {
        if (onPostUpdate) onPostUpdate();
    };

    return (
        <>
            {posts.map((post) => (
                <PostCard 
                    key={post.id} 
                    post={post} 
                    onPostDeleted={handlePostDeleted} 
                    onPostUpdate={onPostUpdate} 
                />
            ))}
        </>
    );
}
