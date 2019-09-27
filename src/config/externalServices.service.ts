import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExternalService {
  private googleAPI = 'https://www.googleapis.com/youtube/v3';
  private googleKey = 'AIzaSyDrCp8YhYfb0rqBBSzUiZ4_a0Ylj5AAFnw';
  private listOfVideos: any;

  constructor(private http: HttpClient) { }

  getYoutubeTumbnail(urlVideo: string) {
    let videoId = this.youtube_parser(urlVideo)
    if(videoId){
      this.http.get(`${this.googleAPI}/videos?key=${this.googleKey}&part=snippet&id=${videoId}`)
      .subscribe(res=>{
        this.listOfVideos = res;
        this.listOfVideos.items.forEach(video => {
          const thumbnailsUrl = video.snippet.thumbnails.high.url
          return thumbnailsUrl;
        });
      }, err =>{
        console.log(err);
        return '';
      }) 
    }else {
      return 'Url do vídeo inválida';
    }
  }

  private youtube_parser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    return (match && match[7].length==11)   ? match[7] : false;
  }
}