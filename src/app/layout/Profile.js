import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "components/NavBar/NavBar";
import Dashboard from "pages/DashboardPage/Dashboard";
import TopArtists from "pages/TopArtistsPage/TopArtists";
import Artist from "pages/ArtistPage/Artist";
import TopTracks from "pages/TopTracksPage/TopTracks";
import Album from "components/Album/Album";
import Recent from "pages/RecentPage/Recent";
import Playlists from "pages/PlaylistsPage/Playlists";
import PlaylistDetail from "components/PlaylistDetail/PlaylistDetail";

class Profile extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <div className="main-wrapper">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/top-artists" component={TopArtists} />
              <Route path="/top-tracks" component={TopTracks} />
              <Route path="/recent" component={Recent} />
              <Route exact path="/playlists" component={Playlists} />
              <Route path="/playlists/:playlistId" component={PlaylistDetail} />
              <Route path="/artist/:artistId" component={Artist} />
              <Route path="/album/:albumId" component={Album} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Profile;
