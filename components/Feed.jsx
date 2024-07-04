"use client";
import { useState, useEffect } from 'react';
import Promptcard from './Promptcard';

const PromptCardList = ({ data, handleTagClick , handleEdit, handleDelete}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <Promptcard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchtext, setsearchtext] = useState('');
  const [posts, setposts] = useState([]);
  const handleSearchChange = (e) => {
    setsearchtext(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setposts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchtext}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        
      />
      
    </section>
  );
};

export default Feed;