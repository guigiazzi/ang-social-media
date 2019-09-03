import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder }  from '@angular/forms';


@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})

export class PostagensComponent implements OnInit{ 
  public post;
  public isMyProfile = true;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(){}

  postForm = this.formBuilder.group({
    post: ['', Validators.required]
  });

  onSubmit(postagem) {
    // Process checkout data here
    this.post = postagem;
    console.warn('Ta ai sua postage', this.post);
    this.postForm.reset();
  }
}
