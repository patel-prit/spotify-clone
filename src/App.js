import React, { useEffect, useState } from'react';
import './App.css';
import Login from './Login';
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useStateValue } from './StateProvider';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token},dispatch] = useStateValue();
  
  useEffect(() => {
    const hash = getTokenFromResponse()
    window.location.hash = "";
    const _token = hash.access_token;
    if(_token){
      
      spotify.setAccessToken(_token)
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })
      spotify.getPlaylist("37i9dQZEVXcPYRV68yIFRv").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({ 
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      })
    }
  },[token,dispatch])

  return (
    <div className="app">
      {token ? 
        <Player 
          spotify={spotify}
        />
        : <Login />
      }
    </div>
  );
}

export default App;
