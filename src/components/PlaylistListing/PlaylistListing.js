import React from 'react';

import PlaylistCard from './PlaylistCard';

export default function PlaylistListing(props) {
  const { playlistToRender } = props;

  return (
    <div className="playlists-container">
      <div className="row align-items-center justify-content-start no-gutters pt-2 pb-4">
        <div className="col-12 align-self-center">
          <h3 className="text-muted font-weight-bold pt-lg-5">
            Your Playlists
          </h3>
          <p className="text-muted">Your own created playlists</p>
        </div>
      </div>

      {playlistToRender && playlistToRender.length !== 0 ? (
        playlistToRender.map((playlist, index) => (
          <PlaylistCard playlist={playlist} key={index} />
        ))
      ) : (
        <div className="pt-5 text-white">
          <h6>No playlists or songs matching the search</h6>
        </div>
      )}
    </div>
  );
}
