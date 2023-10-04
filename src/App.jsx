
import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Realiza una solicitud POST a tu API Flask con la consulta
      const response = await axios.post('https://boolean-model-backend.onrender.com/boolean-query', {
        query: query,
      });

      // Actualiza los resultados de búsqueda con la respuesta de la API
      setResults(response.data.results);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
    }
  };


  return (
    <div className="container p-4 my-8 mx-auto bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-semibold text-center text-white">Busqueda Binaria</h1>
      <div className="flex">
        <input
          type="text"
          placeholder="Ejemplo:   ((turing o machine) y (learning o deep))"
          className="flex-grow py-2 px-3 rounded-l-lg focus:border-blue-300 focus:ring focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="py-2 px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:border-blue-300 focus:ring focus:outline-none"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Resultados:</h2>
          <ul className="mt-2">
            {results.map((result) => (
              <li key={result.id} className="mb-2">
                <h3 className="text-lg font-semibold">{result.title}</h3>
                <p>{result.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
