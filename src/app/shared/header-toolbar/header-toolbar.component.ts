import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: 'header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})

export class HeaderToolbarComponent {
  public searchName: string = '';
  public pessoas = [];

  constructor(private appservice: AppService) { }

  logout(){}

  search(){
    console.log('hellow',this.searchName)
    if(this.searchName.length > 0)
    this.appservice.searchbar({name: this.searchName})
    .subscribe(res =>{
      res.forEach(pessoa => {
        this.pessoas.push(pessoa)
      });
      console.log(this.pessoas)
    })
  }
}
