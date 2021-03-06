// Change any String into only first capital letter
export const formatString = string => {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

// Clear Last FM Artists Bio Strings
export const clearString = string => {
  let characterToDeleteFrom = string.indexOf('<a');
  let cleanString = string.slice(0, characterToDeleteFrom);
  return cleanString;
};

export const setPlaylistName = playlistString => {
  return (
    playlistString.charAt(0).toUpperCase() +
    playlistString.toLowerCase().slice(1)
  );
};

export const getTrackMinutesSeconds = trackDuration => {
  let minutes = parseInt(Math.floor(trackDuration / 60));
  let seconds = parseInt(trackDuration - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes} : ${seconds}`;
};

// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Format milliseconds into MM:SS
export const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const formatWithCommas = n =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Higher-order function for async/await error handling
export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };
};
