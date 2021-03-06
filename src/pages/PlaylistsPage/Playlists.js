import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getPlaylists } from "app/spotify";
import { catchErrors, setPlaylistName } from "app/helpers";

import { IconMusic } from "assets/icons";

import Loader from "components/Loader/Loader";

import "./Playlists.scss";

class Playlists extends Component {
  state = {
    playlists: null,
    isFetching: true,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { data } = await getPlaylists();
    this.setState({ playlists: data, isFetching: false });
  }

  render() {
    const { playlists, isFetching } = this.state;

    return (
      <div className="px-3">
        <h2 className="title-font text-white text-center py-4 pb-4">
          Your Playlists
        </h2>
        <div className="playlists-wrapper pt-4">
          <div className="playlists-grid">
            {playlists && !isFetching ? (
              playlists.items.map(({ id, images, name, tracks }, i) => (
                <div className="playlists-container" key={i}>
                  <Link
                    className="playlist-img-container"
                    to={`/playlists/${id}`}
                  >
                    {images.length ? (
                      <img
                        className="playlists-imgs"
                        src={images[0].url}
                        alt="Album Art"
                      />
                    ) : (
                      <div>
                        <IconMusic />
                      </div>
                    )}
                    <div className="playlists-mask">
                      <i className="fas fa-info-circle" />
                    </div>
                  </Link>
                  <div className="pt-2">
                    <Link
                      className="playlist-name d-inline-block text-white m-0 p-0"
                      to={`/playlists/${id}`}
                    >
                      {setPlaylistName(name)}
                    </Link>
                    <p className="playlist-totaltracks text-muted small-font m-0 p-0">
                      {tracks.total} Tracks
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlists;
