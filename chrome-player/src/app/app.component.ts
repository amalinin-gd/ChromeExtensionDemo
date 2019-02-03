import { Component, OnInit } from '@angular/core';
import * as spotify from 'spotify-web-sdk';
import { Track } from 'spotify-web-sdk';

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
    '3jzerzfM8lLFej7MAry7qG',
    '0i3Hm7P3jRoMXrWTRXZUEx',
    '2aIypBrTUf0uETgMpeVkJF'
  ];

  public ngOnInit(): void {
    spotify.init({
      // tslint:disable-next-line:max-line-length
      token: 'BQDv9zf8hNuuwodaleroBElqVaiaLBN1mdCiJ91O4PcSHn7NYNHDrHm7iAj79cIPC49AIGQeOa1ngGnsEYaxEWz35LDlN-d4ORlcJ3lAlQK6lgzocbMmRkTd9k5iLRUhFWO184g83Gq9mKvAMZXeXo6ha4etRul4xMQFqUabpJfmVfWgpmhT-F1AJr_mWF6n'
    });

    this.loadSongs();
  }

  private loadSongs() {
    const trackPromises: Promise<Track>[] = [];

    this.trackIds.forEach(trackId => {
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
}
