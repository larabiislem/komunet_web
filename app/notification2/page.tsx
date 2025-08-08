'use client'

import React from 'react'

const notifications = [
  { name: 'Sarah Carter', action: 'liked your post', time: '1w', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Ethan Miller', action: 'commented on your post', time: '2w', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Sophia Clark', action: 'shared your post', time: '3w', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { name: 'Liam Davis', action: 'mentioned you in a comment', time: '4w', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { name: 'Olivia Wilson', action: 'liked your comment', time: '5w', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { name: 'Noah Thompson', action: 'followed you', time: '6w', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
]

export default function Notifications() {
  return (
    <div className="bg-[#FFF7F3] min-h-screen p-6">
      <div className="bg-white rounded-xl shadow max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

        {/* Tabs */}
        <div className="flex space-x-6 mb-6 border-b pb-2">
          <button className="text-black font-medium border-b-2 border-black pb-1">All</button>
          <button className="text-gray-500 hover:text-black">Unread</button>
        </div>

        {/* Notification Items */}
        <div className="space-y-4">
          {notifications.map((n, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-lg transition"
            >
              <img
                src={n.avatar}
                alt={n.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm text-gray-800">
                  <strong>{n.name}</strong> {n.action}
                </p>
                <p className="text-xs text-gray-500">{n.time}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
