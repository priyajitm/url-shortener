import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppState';

const GenUrl = () => {
  const [Url, setUrl] = useState('');
  const [urlcode, setUrlcode] = useState('');

  const { generateUrl, url, updateUrlCode } = useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();

    generateUrl(Url);
  };

  const onClickCopy = (e) => {
    console.log(e.target);
  };

  const onCodeChange = (oldcode) => {
    if (urlcode !== '') {
      // Update Url Code
      updateUrlCode(urlcode, oldcode);
      setUrlcode('');
    }
  };

  const urlLength = Object.keys(url).length;

  return (
    <div className="container bg-primary" style={{ maxWidth: '100%' }}>
      <div className="head-text">
        <h1>URL Shortener</h1>
        <p>This is a free tool to shorten URLs.</p>
        <p>Create short & memorable links in seconds.</p>
      </div>
      <form
        className="form-container"
        style={{ display: 'flex' }}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          name="url"
          placeholder="Enter URL"
          value={Url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input className="btn btn-success" type="submit" value="Submit" />
      </form>
      {urlLength > 0 ? (
        <div className="box">
          <p style={{ gridTemplateRows: '100%', color: 'black' }}>
            Date: {url.date.slice(0, 15)}
          </p>
          <p style={{ gridTemplateRows: '100%', color: 'black' }}>
            Long URL: {url.longUrl}
          </p>
          <p style={{ gridTemplateRows: '100%', color: 'black' }}>
            Short URL: <a href={url.shortUrl}>{url.shortUrl}</a>
          </p>
          <div style={{ gridTemplateRows: '100%', color: 'black' }}>
            <input
              type="text"
              name="urlcodechange"
              placeholder={url.urlCode}
              value={urlcode}
              onChange={(e) => setUrlcode(e.target.value)}
            />
            <button
              style={{ gridTemplateColumns: '1fr', margin: '0px 20px' }}
              onClick={(e) => onCodeChange(url.urlCode)}
            >
              Change URL Code
            </button>
          </div>

          <div
            style={{
              gridTemplateRows: '100%',
              textAlign: 'center',
              paddingBottom: '10px',
            }}
          >
            <button
              style={{ gridTemplateColumns: '1fr', margin: '0px 20px' }}
              onClick={onClickCopy}
            >
              Copy URL
            </button>

            <button style={{ gridTemplateColumns: '3fr', margin: '0px 20px' }}>
              Clicks: {url.clicks}
            </button>
          </div>
        </div>
      ) : null}
      <div className="btm-text">
        <p>Links created on fly will expire on 100 clicks</p>
        <p>
          Create a free account and store your shorten URL till it reaches 10000
          clicks
        </p>
        <button className="btn btn-sm">
          <Link to="/login">Login</Link>
        </button>
        <button className="btn btn-sm">
          <Link to="/register">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default GenUrl;
