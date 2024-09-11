import React from 'react'
import { useAuth } from '../../contexts/authContext';
import { Route,Routes, Link, } from 'react-router-dom';
import {Menu} from './Menu';
import { NewItem } from './NewItem';

const Home = () => {
    const { currentUser } = useAuth();
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img className="w-52 mb-8" src="/La.png" alt="Navigation Image" />
        <div className="text-2xl font-bold text-center">
          Hello, {currentUser.displayName || currentUser.email}! welcome to La Monijor Admin Panel.
        </div>
      </div>
    );
  };
  
  export default Home;
  