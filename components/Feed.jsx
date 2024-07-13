"use client";
import { useState, useEffect } from 'react';
import Promptcard from './Promptcard';
import { debounce } from 'lodash';

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <Promptcard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick} // Pass handleTagClick function to Promptcard
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};


const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    // Append the clicked tag to the existing search text
    setSearchText(prevSearchText => prevSearchText.trim() ? `${prevSearchText} ${tag}` : tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/prompt?search=${encodeURIComponent(searchText)}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [searchText]);

  useEffect(() => {
    // Filter posts based on search text
    const filtered = posts.filter(post =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase())
        || post.creator.username.toLowerCase().includes(searchText.toLowerCase())
        || post.tag.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
        handleEdit={() => {}}
        handleDelete={() => {}}
      />
    </section>
  );
};

export default Feed;