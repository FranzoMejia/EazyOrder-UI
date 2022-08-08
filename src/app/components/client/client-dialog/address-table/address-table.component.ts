import { Address } from './../../../../model/address.module';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit {

  displayedColumns: string[] = ['delete','edit'];

  @Input() childMessage: Address[];

  constructor() { }

  ngOnInit(): void {
    let id = this.childMessage;
  }

}
