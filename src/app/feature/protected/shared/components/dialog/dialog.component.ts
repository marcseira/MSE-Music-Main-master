import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesResponse } from 'src/app/shared/interfaces/store.interface';
import { StoreService } from 'src/app/shared/services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  categories: CategoriesResponse[] = [];

  form: FormGroup = this.fb.group({
    title:     ['', [ Validators.required, Validators.minLength(3)]],
    price:    ['', [ Validators.required]],
    description: ['', [ Validators.required, Validators.minLength(3)]],
    categorie: ['', [ Validators.required]],
  });

  constructor( private fb:FormBuilder, 
               private store:StoreService, 
               @Inject(MAT_DIALOG_DATA) public data: any, 
               private dialog: MatDialogRef<DialogComponent>,) { }

  ngOnInit(): void {
    this.store.categories()
    .subscribe( categories => {
      this.categories = categories;
    })
    this.form.patchValue(this.data)
  }



}
