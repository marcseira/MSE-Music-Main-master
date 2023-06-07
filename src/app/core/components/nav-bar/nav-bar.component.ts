import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
  
})
export class NavBarComponent implements OnInit  {

  route: boolean = false;
  imageBase: string = '../../../../assets/moon.png';
  imageMoon: string = '../../../../assets/moon.png';
  imageSun: string = '../../../../assets/sun.png';

  constructor(private store:StoreService) { }

  ngOnInit(): void {
    this.store.existToken$
    .subscribe(exist => {
      this.route = exist;
    })
  }

  NightMode(){
    document.body.classList.toggle("night-theme");
    if(document.body.classList.contains("night-theme")){
      this.imageBase = this.imageSun;
    } else {
      this.imageBase = this.imageMoon;
    }
  }

}
