import React from 'react';

const Form = ({ type, post, setpost, submit, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world,
        and let your imagination run wild with any AI-powered platform.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism '>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) => setpost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Tag</span>
          <span className='font-inter font-normal text-sm text-gray-600'>
            (#product, #webdevelopment, #idea)
          </span>
        </label>
        <input
          value={post.tag}
          onChange={(e) => setpost({ ...post, tag: e.target.value })}
          placeholder='#Tag'
          required
          className='form_input'
        />
        <div className='flex-end mx-3 mb-5 gap-4'>
          {/* <Link  className='text-gray-500 text-sm '> Cancel</Link> */}
          <button className='text-gray-500 text-sm '>Cancel</button>
          <button type='submit' disabled={submit} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;