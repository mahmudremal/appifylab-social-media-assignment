import React, { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { Image, Globe, Lock } from 'lucide-react';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content && !image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('content', content);
    formData.append('isPublic', isPublic);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContent('');
      setImage(null);
      setImagePreview(null);
      onPostCreated(res.data);
    } catch (error) {
      console.error('Error creating post', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="_create_post_area _mar_b20 card p-3 shadow-sm border-0">
      <div className="_create_post_top d-flex align-items-center mb-3">
        <div className="_create_post_img me-2">
          <img src={user?.avatar || "/assets/images/Avatar.png"} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
        <div className="_create_post_input flex-grow-1">
          <textarea
            className="form-control border-0 bg-light"
            placeholder={`What's on your mind, ${user?.firstName}?`}
            rows="2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      {imagePreview && (
        <div className="position-relative mb-3">
          <img src={imagePreview} alt="Preview" className="img-fluid rounded" />
          <button 
            className="btn btn-sm btn-dark position-absolute top-0 end-0 m-2"
            onClick={() => { setImage(null); setImagePreview(null); }}
          >X</button>
        </div>
      )}

      <div className="_create_post_bottom d-flex justify-content-between align-items-center pt-2 border-top">
        <div className="d-flex align-items-center">
          <label className="mb-0 me-3 cursor-pointer text-primary d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <Image size={20} className="me-1" />
            <span>Photo</span>
            <input type="file" className="d-none" accept="image/*" onChange={handleImageChange} />
          </label>
          <div className="dropdown">
            <button className="btn btn-sm btn-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
              {isPublic ? <Globe size={16} className="me-1" /> : <Lock size={16} className="me-1" />}
              {isPublic ? 'Public' : 'Private'}
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => setIsPublic(true)}>Public</button></li>
              <li><button className="dropdown-item" onClick={() => setIsPublic(false)}>Private</button></li>
            </ul>
          </div>
        </div>
        <button 
          className="btn btn-primary px-4" 
          onClick={handleSubmit}
          disabled={loading || (!content && !image)}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
