"use client";

import { useState } from "react";

export default function MessagesPage() {
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Your profile (centered at top of page)
  const myProfile = {
    name: "Me",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  };

  const friends = [
    { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Sarah Connor", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "David Brown", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  ];

  const messages = [
    { id: 1, sender: "John Doe", text: "Hey, how are you?", isMine: false },
    { id: 2, sender: "Me", text: "I’m good, thanks! How’s your day going?", isMine: true },
    { id: 3, sender: "John Doe", text: "Not bad, just got back from work.", isMine: false },
    { id: 4, sender: "Me", text: "Nice! Any plans for the evening?", isMine: true },
    { id: 5, sender: "John Doe", text: "Probably just relaxing and watching a movie.", isMine: false },
    { id: 6, sender: "Me", text: "Sounds good. Let me know if you want to hang out.", isMine: true },
    { id: 7, sender: "John Doe", text: "Sure thing!", isMine: false },
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex min-h-screen"
      style={{ marginLeft: "300px", backgroundColor: "#ff4d4f" }}
    >
      {/* Friends List */}
      <div className="w-64 bg-white text-black p-4">
        <h2 className="text-lg font-bold mb-4">Friends</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none"
        />

        <ul className="space-y-3">
          {filteredFriends.map((friend) => (
            <li
              key={friend.id}
              className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                selectedFriend === friend.id ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedFriend(friend.id)}
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-black">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* My profile at top */}
        <div className="flex flex-col items-center p-6 border-b border-red-200 bg-white">
          <img
            src={myProfile.avatar}
            alt={myProfile.name}
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <h3 className="text-lg font-semibold text-black">{myProfile.name}</h3>
        </div>

        {/* Friend info (if selected) */}
        {selectedFriend && (
          <div className="flex flex-col items-center p-4 border-b border-gray-200 bg-gray-50">
           
            <h4 className="font-medium text-black">
              {friends.find((f) => f.id === selectedFriend)?.name}
            </h4>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedFriend &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.isMine
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        {selectedFriend && (
          <div className="p-4 border-t border-red-200 bg-white flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded px-4 py-2 focus:outline-none"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
