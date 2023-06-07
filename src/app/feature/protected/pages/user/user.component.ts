import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/interfaces/auth.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  record: ProductsResponse[] = []; 
  profile: RegisterResponse | null  = null;
  flag: boolean = false;

  constructor(private store: StoreService, private router:Router) { }

  ngOnInit(): void {
    this.store.getProfile()
    .subscribe(profile => this.profile = profile);
    this.record = this.store.getRecord();
    console.log(this.record);
    if(this.record.length==undefined){
      console.log(this.record.length);
      this.flag = true;
    }
  }

  logout(){
    this.store.logout();
    this.router.navigate(['/auth']);
  }

}
