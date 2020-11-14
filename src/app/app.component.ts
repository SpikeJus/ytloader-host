import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { HttpClient } from '@angular/common/http';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ytubeloader';
  messages;

  constructor(private loader: LoaderService, private http: HttpClient) {}

  convert(urlInput): void {
    console.log('convert ', urlInput.value);
    if (urlInput.value) {
      this.loader.getVideoFromServer(urlInput.value).subscribe(res => {
        console.log('res: ', res.headers.get('Content-Disposition'));
        if (res) {
          let fileName;
          let disposition = res.headers.get('Content-Disposition');
          if (disposition && disposition.indexOf('attachment') !== -1) {
            disposition = decodeURIComponent(disposition);
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              fileName = matches[1].replace(/['"]/g, '');
            }
          }
          fileName = fileName ? fileName : 'Download.mp4';
          fileSaver.saveAs(new Blob([res.body], { type: 'video/mp4'}), fileName);
        }
      });
    }
  }

  ngOnInit(): void {
    this.messages = this.loader.getMessages();
  }
}
