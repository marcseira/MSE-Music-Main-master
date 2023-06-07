import { Component, Input, OnInit } from '@angular/core';
import { ProductsResponse } from 'src/app/shared/interfaces/store.interface';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input() product !: ProductsResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
