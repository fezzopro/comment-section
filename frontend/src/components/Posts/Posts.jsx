import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { fetchPosts } from '../../Redux/post.reducer/posts.reducers';

const Posts = () => {
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 mx-auto max-w-2xl text-center">
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Past Posts</h3>
      </div>
      <div>
        <div className="mt-8">
          {post.map((post) => <Post post={post} key={post.id} />)}
          {/* <Post /> */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
