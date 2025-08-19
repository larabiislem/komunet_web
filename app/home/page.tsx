'use client';

import AnnouncementsList from '../../composents/annnones';
import RegularPosts from '@/composents/post';
import CreatePostForm from '@/composents/creatpostform';
export default function Home() {
  return (

      <div className="flex flex-col items-center min-h-screen py-8 space-y-8">
        <AnnouncementsList />
        <CreatePostForm />
        <RegularPosts />
      </div>

  );
}