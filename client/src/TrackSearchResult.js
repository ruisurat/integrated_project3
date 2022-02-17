import React from 'react'

export default function TrackSearchResult({track, chooseTrack}) {
  function handlePlay() {
    chooseTrack(track)
  }
  
  return (
    <div className="d-flex m-2 align-items-center">
        <img src={track.albumUrl} style={{height: '64px', width: '64px'}} alt="album cover" style={{cursor: 'pointer'}} onClick={handlePlay}/>
        <div className="m-2">
            <div>{track.title}</div>
            <div className="text-muted">{track.artist}</div>
        </div>
    </div>
  )
}
