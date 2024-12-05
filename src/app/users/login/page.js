"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async () => {
    setError(null)
    
    try { 
      const response = await axios.post('/api/post_master/user_exists', { username, password }) 
      if (response.status === 200) { 
        const { token } = response.data 
        localStorage.setItem('access_token', token) 
        router.push('/users/dashboard')
      } 
      else { 
        setError('Invalid credentials or unable to reach backend.') 
      } 
    } 
    catch (error) { 
      if (error.response) { 
        setError(error.response.data.message || 'Invalid credentials.') 
      } 
      else { 
        setError('Network error: Unable to reach backend.') 
      } 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <div className="mb-4">
          {" "}
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>{" "}
        <div className="mb-4">
          {" "}
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />{" "}
        </div>
        <div className="mt-4 mb-4">
        {" "}
        <Link href="/users/forgot-password">
          {" "}
          <p className="text-blue-500">Forgot Password?</p>{" "}
        </Link>
      </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}{" "}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
}
