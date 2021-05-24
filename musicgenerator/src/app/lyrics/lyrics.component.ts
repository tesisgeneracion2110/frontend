import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { RestClientService } from '../service/rest-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {

  @ViewChild('createForm', { static: true })
  createForm;

  file = '';
  result = false;
  url = environment.serviceBaseUrl

  constructor(
    private router: Router,
    private restClient: RestClientService
  ) { }

  ngOnInit(): void {
  }

  getLyrics() {
    this.restClient.getLyrics().subscribe(
      results => {
        console.log(results);
        this.file = results['lyrics'];
        this.result = true;
        console.log(this.file);
      },
      error => console.error(error)
    );
  }
}
