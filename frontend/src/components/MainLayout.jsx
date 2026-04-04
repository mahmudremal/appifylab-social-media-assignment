import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import NavBar from './NavBar';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import StoriesGallary from './StoriesGallary';
import StoryWritingPad from './StoryWritingPad';
import StoryFeed from './StoryFeed';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageNum = 1, isLoadMore = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.get(`/posts?page=${pageNum}&limit=10`);
      if (res.data.length < 10) setHasMore(false);
      else setHasMore(true);

      if (isLoadMore) {
        setPosts(prev => [...prev, ...res.data]);
      } else {
        setPosts(res.data);
      }
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, false);
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdate = () => {
    fetchPosts(1, false);
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  return (
    <div className="_main_layout">
      <NavBar />

      <div className="container _custom_container">
        <div className="_layout_inner_wrap">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <LeftSidebar />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="_layout_middle_wrap">
                <div className="_layout_middle_inner">
                  <StoriesGallary />
                  <StoryWritingPad onPostCreated={handlePostCreated} />

                  {children}

                  <StoryFeed posts={posts} onPostUpdate={handlePostUpdate} />
                  
                  {hasMore && (
                    <div className="text-center _mar_b16">
                        <button className="btn btn-primary btn-sm" onClick={loadMore} disabled={loading}>
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
              <RightSidebar />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
