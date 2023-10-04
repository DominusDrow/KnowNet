
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

function Header() {
  return (
    <header className="flex justify-between items-center p-2 text-white rounded-t-lg shadow-lg bg-zinc-900">
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-blue-500 rounded-full hover:text-blue-600"
      >
      </a>
      <h1 className="text-xl font-bold text-center">...</h1>
      <div className="flex gap-2">
        <a
          href="https://github.com/DominusDrow/KnowNet.git"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 pl-0 text-blue-500 rounded-full hover:text-blue-600"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://colab.research.google.com/drive/15vZsfIacVBbvuNQQSeskmK4FFJSNAaeW?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-red-500 rounded-full hover:text-red-600"
        >
          <FaGoogle size={24} />
        </a>
      </div>
    </header>
  );
}

export default Header;
