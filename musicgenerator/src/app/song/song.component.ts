import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../service/class/song';

import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  @ViewChild('createForm', { static: true })
  createForm;

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
    this.restClient.createSong(this.song).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        this.errorMessage = error.toString();
        this.submitted = false;
      }
    );
    this.song.bpm = undefined;
    this.song.root = undefined;
    this.song.scale = undefined;
    this.song.n_chords = undefined;
    this.song.progression = [];
    this.song.n_beats = undefined;
    this.song.structure = [[undefined, undefined]];
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
