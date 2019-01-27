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
    '3IT5yzSCLiu8PBgIWqSaA4',
    '0i3Hm7P3jRoMXrWTRXZUEx',
    '2aIypBrTUf0uETgMpeVkJF'
  ];

  public ngOnInit(): void {
    spotify.init({
      // tslint:disable-next-line:max-line-length
      token: 'BQDZOK5ddXQT_dYtZhuKlRxCJrcBUPHvOgaGN2EItpZJ1UphU7_ZSgoxhqQYzVu3rSzgjS3YEZATZ-N4CmMI7uJdVR6qf4dw6iS-PypQzjTG9SWbZq0OL6Y9M2RsePoIL_Emt4zQD90WyuaVf-SdEWeWvqS1vuLmaRfD5qOO5S22Gl6kIPYzFbOc7j92WKNc'
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
