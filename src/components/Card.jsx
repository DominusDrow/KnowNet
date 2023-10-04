
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function Card({ link }) {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener el contenido de la página
    axios.get(link)
      .then((response) => {
        // Analizar el HTML de la página con cheerio
        const $ = cheerio.load(response.data);

        // Extraer el título de la página (por ejemplo, el título de la etiqueta <title>)
        const pageTitle = $('title').text();

        // Extraer otra información relevante de la página (ajusta esto según tus necesidades)
        const pageInfo = $('meta[name="description"]').attr('content');

        // Actualizar el estado del componente con la información obtenida
        setTitle(pageTitle);
        setInfo(pageInfo);
      })
      .catch((error) => {
        console.error('Error al obtener la página:', error);
      });
  }, [link]);

  // Obtener el nombre del documento a partir del enlace
  const documentName = link.substring(link.lastIndexOf('/') + 1);

  return (
    <div className="p-4 text-white bg-gray-900 rounded-lg shadow-lg">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="text-gray-400">{info}</p>
      <p className="mt-2 text-lg text-gray-400">{documentName}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 text-blue-500 hover:text-blue-600"
      >
        <button className="py-1 px-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:border-blue-300 focus:ring focus:outline-none">
          Visitar la página
        </button>
      </a>
    </div>
  );
}

export default Card;
