
'use client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import postStore from '../../store';
import { getPosts } from './postslicer';

interface Post {
  title: string;
  content: string;
}

function HomeContent() {
  const dispatch = useDispatch();
  const post = useSelector((state: any) => state.post.value);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log('Posts:', post);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-black">home</h1>
        <h2 className="text-xl font-semibold text-gray-700">Welcome to the Home Page</h2>
        <p className="mt-4 text-gray-600">This is where you can find the latest posts.</p>
        <div className="mt-6">
          {post && post.map((item: Post, index: number) => (
            <div key={index} className="p-4 mb-4 bg-white shadow rounded">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Provider store={postStore}>
      <HomeContent />
    </Provider>
  );
}