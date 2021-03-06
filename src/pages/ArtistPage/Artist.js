import React, { Component, Fragment } from 'react';

import {
  getArtist,
  getArtistBio,
  getArtistBioExpress,
  followArtist,
  doesUserFollowArtist
} from 'app/spotify';
import {
  catchErrors,
  formatWithCommas,
  setPlaylistName,
  clearString
} from 'app/helpers';

import Loader from 'components/Loader/Loader';

import './Artist.scss';

export default class Artist extends Component {
  state = {
    artist: null,
    artistBio: null,
    isFollowing: null,
    error: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
    catchErrors(this.gettingArtistBio());
    // catchErrors(this.gettingArtistBioExpress());
    catchErrors(this.isFollowing());
  }

  async getData() {
    const { artistId } = this.props.match.params;
    const { data } = await getArtist(artistId);
    
    this.setState({
      artist: data
    });
  }

  async gettingArtistBio() {
    const { artistName } = this.props.location.state;
    const { data } = await getArtistBio(artistName);

    this.setState({
      artistBio: data && data.artist && data.artist.bio,
      error: data.error && data.error,
    });
  }

  async gettingArtistBioExpress() {
    const { artistName } = this.props.location.state;
    const { data } = await getArtistBioExpress(artistName);
    // console.log(data);
  }

  isFollowing = async () => {
    const { artistId } = this.props.match.params;
    const { data } = await doesUserFollowArtist(artistId);

    this.setState({ isFollowing: data[0] });
  };

  follow = async () => {
    const { artistId } = this.props;
    await followArtist(artistId);
    this.isFollowing();
  };

  render() {
    const { artist, artistBio, isFollowing, error } = this.state;
    const trackedError = error && error === 6;

    if (trackedError) {
      return (
        <div className="app-playlists">
          <div className="row justify-content-center ml-3 pt-4">
            <div className="col-12 pl-3">
              <h3 className="text-white font-weight-bolder mt-5">
                Artist Not Found
              </h3>
            </div>
          </div>
        </div>
      )
    }
    return (
      <Fragment>
        {artist && artistBio ? (
          <div className="app-playlists">
            <div className="row justify-content-start ml-3 pt-4">
              <div className="col-11 col-sm-5 pl-3">
                {artist.images.length && (
                  <div className="artist-cover mb-2">
                    <img
                      className="img-fluid"
                      src={artist.images[1].url}
                      alt={artist.name}
                    />
                  </div>
                )}

                <h3 className="text-white font-weight-bolder mb-0">
                  {setPlaylistName(artist.name)}
                </h3>

                <p className="text-muted small-font m-0 p-0 pt-2">
                  {formatWithCommas(artist.followers.total)}
                </p>
                <p className="text-muted text-uppercase small-font m-0 p-0">
                  Followers
                </p>

                <button
                  className="btn-custom text-white mt-3"
                  onClick={catchErrors(this.follow)}>
                  {isFollowing ? 'Following Artist' : 'Follow Artist'}
                </button>
              </div>

              <div className="col-11 col-sm-7 pr-sm-5">
                {artist.genres && (
                  <div className="artist-stats">
                    <p className="text-muted text-uppercase small-font m-0 p-0">
                      Genres
                    </p>

                    {artist.genres.map(genre => (
                      <p
                        className="text-white text-uppercase m-0 p-0"
                        key={genre}>
                        {genre}
                      </p>
                    ))}
                  </div>
                )}
                {artist.popularity && (
                  <div className="artist-stats mt-3">
                    <p className="text-muted text-uppercase small-font m-0 p-0">
                      Popularity
                    </p>

                    <p className="text-white m-0 p-0">{artist.popularity}%</p>
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 px-5 mx-auto">
                {artistBio.content && artistBio.content !== '' && (
                  <p className="text-white text-justify">
                    {clearString(artistBio.summary)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}
