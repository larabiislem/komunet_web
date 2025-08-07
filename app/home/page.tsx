'use client';
import { Provider } from 'react-redux';
import postStore from '../../store';
import AnnouncementsList from '../../composents/annnones';
import RegularPosts from '@/composents/post';
import CreatePostForm from '@/composents/creatpostform';
export default function LoginPage() {
  return (
    <Provider store={postStore}>
      <div className="flex flex-col items-center min-h-screen py-8 space-y-8">
        <AnnouncementsList />
        <CreatePostForm />
        <RegularPosts />
      </div>
    </Provider>
  );
}