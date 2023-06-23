import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-historiqueaccounts',
  templateUrl: './historiqueaccounts.component.html',
  styleUrls: ['./historiqueaccounts.component.css']
})
export class HistoriqueaccountsComponent implements OnInit {
  userId!:number;

  constructor() { }

  ngOnInit(): void {
    let user=localStorage.getItem('user');
    if(user!=null){
      this.userId=JSON.parse(user).id;
    }

  }

}
