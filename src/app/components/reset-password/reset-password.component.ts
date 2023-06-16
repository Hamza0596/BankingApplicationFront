import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute) { }
  status:boolean=false;

  ngOnInit(): void {
    const email = this.route.snapshot.params['email'];
    const token = this.route.snapshot.params['token'];

    this.authenticationService.resetPassword(email,token).subscribe(data=>{
      this.status=true;

    },(error)=>{
      this.status=false;

    })

  }

}
