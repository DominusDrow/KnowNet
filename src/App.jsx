
import React, { useState } from 'react';

import Card from './components/Card';

function App() {
  const [query, setQuery] = useState('');
  const [kValue, setKValue] = useState('5');
  const [results, setResults] = useState([]);
  const [searchMode, setSearchMode] = useState('binaria');

  const toggleSearchMode = () => {
    setSearchMode(searchMode === 'binaria' ? 'kmeans' : 'binaria');
    setQuery('');
  };

  const handleSearch = async () => {
    try {
      let url = '';
      let data = {
        query: query,
        k: 2
      };
      url = 'https://k-means-model-backend.onrender.com/query';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setResults(responseData.map(item => "https://es.wikipedia.org" + item));

    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  };

  return (
    <div className="container p-4 my-8 mx-auto bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-semibold text-center text-white">Modelos de recuperación de información</h1>
      <div className="flex justify-center mb-4">
        <button
          className={`py-2 px-4 text-white rounded-l-lg ${searchMode === 'binaria' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
            } focus:border-blue-300 focus:ring focus:outline-none`}
          onClick={toggleSearchMode}
        >
          Búsqueda Binaria
        </button>
        <button
          className={`py-2 px-4 text-white rounded-r-lg ${searchMode === 'kmeans' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
            } focus.border-blue-300 focus:ring focus:outline-none`}
          onClick={toggleSearchMode}
        >
          Probabilístico
        </button>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder={searchMode === 'kmeans' ? "¿Qué quieres saber sobre computación?" : "Ejemplo: turing o machine y learning"}
          className="flex-grow py-2 px-3 rounded-l-lg focus:border-blue-300 focus:ring focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />
        {searchMode === 'kmeans' && (
          <input
            type="number"
            placeholder="Valor de K"
            className="py-2 px-3 w-20 rounded-l-none rounded-r-lg focus:border-blue-300 focus:ring focus:outline-none"
            value={kValue}
            onChange={(e) => setKValue(e.target.value)}
          />
        )}
        <button
          className="py-2 px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:border-blue-300 focus:ring focus:outline-none"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      {results.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Resultados:</h2>
          {results.map((result, index) => (
            <Card key={index} link={result} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm font-semibold text-center text-white">Aún no hay resultados :(</p>
      )}
    </div>
  );
}

export default App;
