import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';
import { Router } from '@angular/router';

import { NgNavigatorShareService } from 'ng-navigator-share';
import { SaveRefService } from '../services/save-ref.service';
import { environment } from 'src/environments/environment';
import { completeUrl } from '../angularUrl/angularUrl';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLoginData;
  userLevel;
  sharableUrl;
  myRefId;
  lazySpinner = false;
  linkCopied = false;
  notLoggedinToShareLink = false;
  copyToClipboardReferal: boolean = false;
  productUrl: any;
  constructor(
    private loginRegi: LoginRegisterService,
    private router: Router,
    private referal: SaveRefService,
    private ngNavigatorShareService: NgNavigatorShareService
  ) { }

  shareRef = async () => {
    if (!this.userLoginData.isLoggedin) {
      this.notLoggedinToShareLink = true;
      return;
    }
    const promise = this.referal.genRefId().toPromise();
    await promise.then(
      data => {
        this.myRefId = data;
        this.sharableUrl = `${environment.domainPrefix}/ref/save/${this.myRefId.myReferalId}`;
      }
    ).catch((error) => {
      console.log(error);
    });
    if (this.ngNavigatorShareService.canShare()) {
      this.ngNavigatorShareService.share({
        title: 'Refer & Earn',
        text:
          `Refer & Earn!
Hey, I'm enjoying this referral system by having upto 300 Rs. in my account and gifting my friend 7 coconuts FREE on subscription.

Check out my referral link to earn upto 7 coconuts FREE. 
`,
        url: this.sharableUrl
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          this.copyToClipboardReferal = true;
          this.copyToclipBoard(this.sharableUrl);
          return;
        });
    } else {
      this.copyToClipboardReferal = true;
      this.copyToclipBoard(this.sharableUrl);
      return;
    }
  }

  copyToclipBoard = (urlValue: string) => {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = urlValue;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  adminClick = () => {
    this.lazySpinner = true;
    this.router.navigate(['admin']);
  }

  subscrNavigationQuart = () => {
    this.router.navigate([completeUrl.product], {
      queryParams: {
        category: 'coconut',
        subscriptionDuration: 90
      }
    });
  }

  subscrNavigationMonthly = () => {
    this.router.navigate([completeUrl.product], {
      queryParams: {
        category: 'coconut',
        subscriptionDuration: 30
      }
    });
  }

  subscrNavigationHalfYearly = () => {
    this.router.navigate([completeUrl.product], {
      queryParams: {
        category: 'coconut',
        subscriptionDuration: 180
      }
    });
  }
  subscrNavigationRegular = () => {
    this.router.navigate([completeUrl.product], {
      queryParams: {
        category: 'coconut',
        subscriptionDuration: 1
      }
    });
  }

  ngOnInit() {
    this.loginRegi.userLoginData.subscribe(
      data => {
        this.userLoginData = data;
        this.userLevel = this.userLoginData.userlevel;
      },
      (error: Response) => {
        console.log(error);
      }
    );
  }
}
