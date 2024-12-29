import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [news, setNews] = useState([]); // State to store news articles
  const [loading, setLoading] = useState(true); // State to show loading

  useEffect(() => {
    // Fetch news from the backend API
    fetch('http://localhost:5000/api/news')
      .then((response) => response.json())
      .then((data) => {
        setNews(data); // Update news state with fetched data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>News Application</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="news-container">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div key={index} className="news-article">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                {article.url && (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
