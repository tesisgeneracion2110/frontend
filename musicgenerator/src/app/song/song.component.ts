import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../service/class/song';

import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  @ViewChild('createForm', { static: true })
  createForm;

  file_lyric = '';
  file_voice = '';
  file_melody = '';
  file_music = '';
  file_song = '';
  file_voicexml = '';
  progression = '';
  structure = '';
  result = false;
  url = environment.serviceBaseUrl

  submitted = false;
  errorMessage = '';

  song: Song = new Song(
    undefined,
    undefined,
    undefined,
    undefined,
    [],
    undefined,
    [[undefined, undefined]]
  );

  constructor(
    private router: Router,
    private restClient: RestClientService
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.submitted = true;
    if(this.checkArrays()){
      if (this.song.progression.length == 0) {
        this.song.progression = undefined
      }
      if (this.song.structure.length == 1) {
        this.song.structure = undefined
      }
      this.restClient.createSong(this.song).subscribe(
        result => {
          console.log(result);
          this.file_lyric = result['lyric'];
          this.file_voice = result['voice'];
          this.file_melody = result['melody'];
          this.file_music = result['musica'];
          this.file_song = result['song'];
          this.file_voicexml = result['voicexml'];
          this.result = true;
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
          this.errorMessage = error.toString();
          this.submitted = false;
        }
      );
    }
    this.progression = '';
    this.structure = '';
    this.song.bpm = undefined;
    this.song.root = undefined;
    this.song.scale = undefined;
    this.song.n_chords = undefined;
    this.song.progression = [];
    this.song.n_beats = undefined;
    this.song.structure = [[undefined, undefined]];
  }

  checkArrays() {
    console.log(this.progression);
    if (this.progression != '') {
      this.song.progression = this.progression.split(",").map(x=>+x);
      console.log(this.song.progression);
      if (this.song.n_chords) {
        console.log(this.song.n_chords)
        console.log(this.song.progression.length);
        if (this.song.n_chords != this.song.progression.length) {
          return false;
        }
      }
    }
    if (this.structure != '') {
      this.song.structure.shift();
      var structArray = this.structure.split(",");
      console.log(structArray);
      for (let str of structArray) {
        this.song.structure.push([str, 1]);
      }
      console.log(this.song.structure)
      /*this.song.progression = this.progression.split(",").map(x=>+x);
      console.log(this.song.progression);
      if (this.song.n_chords) {
        console.log(this.song.n_chords)
        console.log(this.song.progression.length);
        if (this.song.n_chords != this.song.progression.length) {
          return false;
        }
      }*/
    }
    return true;
  }

  addChord(chord) {
    this.song.progression.push(chord.value)
    chord.value = '';
    console.log(this.song.progression)
  }

  addStruct(struct) {
    this.song.structure.push([struct.value, 1])
    struct.value = '';
    console.log(this.song.structure)
  }

}
