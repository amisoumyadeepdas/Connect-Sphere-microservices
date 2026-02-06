import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../Api/ProfileApi';
import { 
  Edit, Camera, MoreVertical, MessageCircle, 
  ThumbsUp, Share2, Send, Users, UserPlus,
  MapPin, Briefcase, Calendar, Heart
} from 'lucide-react';
import '../styles/Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  // Mock data for UI (remove when you have APIs)
  const mockFriends = [
    { id: 1, name: 'John Doe', profileImage: null },
    { id: 2, name: 'Jane Smith', profileImage: null },
    { id: 3, name: 'Bob Johnson', profileImage: null },
    { id: 4, name: 'Alice Brown', profileImage: null },
    { id: 5, name: 'Mike Wilson', profileImage: null },
    { id: 6, name: 'Sarah Davis', profileImage: null },
  ];

  const mockPosts = [
    {
      id: 1,
      author: { name: 'John Doe', profileImage: null },
      content: 'Having a great day at the beach! ☀️🏖️',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      likes: 42,
      comments: 8,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: { name: 'Jane Smith', profileImage: null },
      content: 'Just finished my morning run! Feeling energized 💪',
      image: null,
      likes: 25,
      comments: 3,
      timestamp: '5 hours ago'
    },
  ];

  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      const res = await getUserProfile(userId);
      setUser(res.data);
    } catch (error) {
      console.error('Failed to load profile');
      // For demo, create mock user
      setUser({
        name: 'Demo User',
        email: 'demo@example.com',
        city: 'New York',
        company: 'Tech Corp',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
        role: 'USER',
        bio: 'Welcome to my profile!'
      });
    }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      alert(`Post created: ${newPost}`);
      setNewPost('');
      setShowPostForm(false);
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Cover Photo */}
      <div className="cover-photo">
        <div className="cover-overlay">
          <button className="cover-action-btn">
            <Camera size={20} />
            Update Cover
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <img 
            src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=150`}
            alt={user.name}
          />
          <button className="avatar-edit-btn">
            <Edit size={16} />
          </button>
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-bio">{user.bio || 'No bio yet'}</p>
          
          <div className="profile-details">
            {user.city && (
              <div className="detail-item">
                <MapPin size={16} />
                <span>{user.city}</span>
              </div>
            )}
            {user.company && (
              <div className="detail-item">
                <Briefcase size={16} />
                <span>{user.company}</span>
              </div>
            )}
            {user.dateOfBirth && (
              <div className="detail-item">
                <Calendar size={16} />
                <span>{user.dateOfBirth}</span>
              </div>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <strong>{mockPosts.length}</strong>
              <span>Posts</span>
            </div>
            <div className="stat-item">
              <strong>{mockFriends.length}</strong>
              <span>Friends</span>
            </div>
            <div className="stat-item">
              <strong>245</strong>
              <span>Following</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-primary" onClick={() => navigate(`/user/update/${userId}`)}>
            <Edit size={18} />
            Edit Profile
          </button>
          <button className="btn-secondary">
            <MessageCircle size={18} />
            Message
          </button>
          <button className="btn-outline">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="profile-body">
        {/* Left Column - Friends List */}
        <div className="left-column">
          <div className="friends-card">
            <div className="friends-header">
              <h3>
                <Users size={20} />
                Friends
                <span className="friend-count">{mockFriends.length}</span>
              </h3>
              <button className="see-all">See all</button>
            </div>
            <div className="friends-grid">
              {mockFriends.slice(0, 9).map(friend => (
                <div key={friend.id} className="friend-card">
                  <img 
                    src={friend.profileImage || `https://ui-avatars.com/api/?name=${friend.name}&size=80&background=0D8ABC&color=fff`}
                    alt={friend.name}
                  />
                  <p className="friend-name">{friend.name.split(' ')[0]}</p>
                </div>
              ))}
            </div>
            <button className="add-friend-btn">
              <UserPlus size={16} />
              Find Friends
            </button>
          </div>

          {/* Additional Info Card */}
          <div className="info-card">
            <h3>Details</h3>
            {user.gender && (
              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">{user.gender}</span>
              </div>
            )}
            {user.role && (
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value">{user.role}</span>
              </div>
            )}
          </div>
        </div>

        {/* Middle Column - Posts */}
        <div className="middle-column">
          {/* Create Post Card */}
          <div className="create-post-card">
            <div className="post-input-header">
              <img 
                src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&size=40&background=0D8ABC&color=fff`}
                alt="You"
                className="post-user-avatar"
              />
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onClick={() => setShowPostForm(true)}
                rows={showPostForm ? 3 : 1}
              />
            </div>
            {showPostForm && (
              <div className="post-actions">
                <button className="post-action-btn">Photo/Video</button>
                <button className="post-action-btn">Feeling/Activity</button>
                <button className="btn-post" onClick={handleCreatePost}>
                  <Send size={16} />
                  Post
                </button>
              </div>
            )}
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {mockPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <img 
                    src={post.author.profileImage || `https://ui-avatars.com/api/?name=${post.author.name}&size=40&background=0D8ABC&color=fff`}
                    alt={post.author.name}
                    className="post-author-avatar"
                  />
                  <div className="post-author-info">
                    <h4>{post.author.name}</h4>
                    <span className="post-time">{post.timestamp}</span>
                  </div>
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="post-image" />
                  )}
                </div>
                <div className="post-stats">
                  <div className="post-likes">
                    <Heart size={16} fill="red" />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="post-comments">
                    <span>{post.comments} comments</span>
                  </div>
                </div>
                <div className="post-actions">
                  <button className="post-action-btn">
                    <ThumbsUp size={18} />
                    Like
                  </button>
                  <button className="post-action-btn">
                    <MessageCircle size={18} />
                    Comment
                  </button>
                  <button className="post-action-btn">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;