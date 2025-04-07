import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateDummyPosts } from './DummyData';
import PostCard from './PostCard';

const InfiniteScrollPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  
  // Function to fetch more posts
  const fetchMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      // Simulate API fetch delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate 10 dummy posts
      const newPosts = generateDummyPosts(page, 10);
      
      // If we've reached 100 posts, stop loading more
      if (page >= 10) {
        setHasMore(false);
      }
      
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  
  // Set up the intersection observer
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMorePosts();
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchMorePosts]);
  
  // Initial load
  useEffect(() => {
    fetchMorePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Alternative scroll event handler (as a fallback)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        fetchMorePosts();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, fetchMorePosts]);
  
  return (
    <div className="infinite-scroll-page">
      <h1>Infinite Scroll Demo</h1>
      <p className="description">
        Scroll down to see more content load automatically. We're using both
        Intersection Observer API and scroll event listeners for better compatibility.
      </p>
      
      <div className="posts-container">
        {posts.map((post, index) => {
          // If this is the last post, add the ref for observation
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <PostCard post={post} />
              </div>
            );
          } else {
            return <PostCard key={post.id} post={post} />;
          }
        })}
      </div>
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading more content...</p>
        </div>
      )}
      
      {!hasMore && (
        <div className="end-message">
          <p>You've reached the end of the content!</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollPage;