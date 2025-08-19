'use client';

import AnnouncementsList from '../../composents/annnones';
import RegularPosts from '@/composents/post';
import CreatePostForm from '@/composents/creatpostform';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar (top on mobile, right on desktop) */}
          <aside className="order-1 lg:order-2 lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <AnnouncementsList />
            </div>
          </aside>

          {/* Feed (centered, constrained width) */}
          <main className="order-2 lg:order-1 lg:col-span-2">
            <div className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8">
              <CreatePostForm />
              <RegularPosts />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}