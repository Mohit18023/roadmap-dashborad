'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function CreateRoadmapPage() {
  const { isLoaded, userId } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateRoadmap = async () => {
    if (!title || !description) {
      setMessage('Title and description are required.');
      return;
    }

    try {
      const response = await fetch('/api/roadmaps/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Send Clerk session cookie
        body: JSON.stringify({
          title,
          description,
          image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Roadmap created successfully!');
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!userId) return <div>Please log in to create a roadmap.</div>;

  return (
    <div>
      <h1>Create New Roadmap</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={handleCreateRoadmap}>Create Roadmap</button>

      <div>{message}</div>
    </div>
  );
}
