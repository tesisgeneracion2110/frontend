import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongComponent } from './song/song.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { MusicComponent } from './music/music.component';

const routes: Routes = [
  { path: '', redirectTo: '/song', pathMatch: 'full' },
  {path: 'song', component: SongComponent },
  {path: 'lyrics', component: LyricsComponent },
  {path: 'music', component: MusicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
