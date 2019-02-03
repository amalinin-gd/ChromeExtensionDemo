import { Component, OnInit } from '@angular/core';
import * as spotify from 'spotify-web-sdk';
import { Track } from 'spotify-web-sdk';
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Chrome Extension Player';
  public songsLoaded = false;
  public appInitialized = false;
  public trackUrl: string;
  public tracks: Track[] = [];
  public trackIds: string[] = [
    '3I5azi0831uNpYQsfYsW7G',
    '0kEQwPz9SrMN8E5iL9cxQL',
    '0NWPxcsf5vdjdiFUI8NgkP',
    '3gFS9CKU70Wm7vAoA0O1uW',
    '4s6LhHAV5SEsOV0lC2tjvJ',
    '4vJAhLLHcgPeR3pQopGaIG',
    '3sYDVtqO35oRSOIMx7dOqR',
    '0MKGH8UMfCnq5w7nG06oM5',
    '2oaK4JLVnmRGIO9ytBE1bt',
    '45fAUkBTqnLogZ0tRDchFi',
    '78lgmZwycJ3nzsdgmPPGNx',
    '5jddjli3YTIxueb3xFdLaA'
  ];

  public ngOnInit(): void {
    spotify.init({
      // tslint:disable-next-line:max-line-length
      token: 'BQAIs5BDy0-sc3236CUGw1KmkhHmVOg2L4VQzlGEbMZNKEjG7A2MEJCbJscQ960026b8zdD7bFwWcERcMqTE_NWLGnT01JN4_vTPWmNPK2Jl1teFhgBWPt8eUJwPykxo27a_hXhpPY00VGC9r-SoR5DYllzSbfa_aanMxiNUExTwL2ew0L9j5t3NjKUto4xv'
    });

    this.loadSongs();
  }

  public reloadExtension(): void {
    location.href = location.href + 'index.html';
  }

  public onPlay(track: Track) {
    if (!track || !track.album) {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {imageUrl: track.album.imageUrl}, function(response) {
        if (response) {
          console.log(response.message);
        }
      });
    });
  }

  private loadSongs() {
    const trackPromises: Promise<Track>[] = [];
    const songsLimit = 3;
    const randomIds = this.getRandomTrackIds(songsLimit);

    randomIds.forEach(trackId => {
      const trackPromise = spotify.getTrack(trackId);
      trackPromises.push(trackPromise);
    });

    Promise
      .all(trackPromises)
      .then((tracks: Track[]) => {
        this.tracks = tracks;
        this.songsLoaded = true;
      });
  }

  private getRandomTrackIds(limit: number): string[] {
    const randomIds: string[] = [];

    for (let i = 0; i < limit; i++) {
      const randomIndex = Math.floor(Math.random() * this.trackIds.length);
      const randomId = this.trackIds.splice(randomIndex, 1)[0];
      randomIds.push(randomId);
    }

    return randomIds;
  }
}
