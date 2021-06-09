import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LazyTwoService } from '../lazyTwoServices/lazy-two.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  loading = false;
  unExpectedErrorAlert = true;
  mailSentAlert = true;

  constructor(
    private lazyTwo: LazyTwoService
  ) { }

  contactUsForm = new FormGroup({
    name : new FormControl('', [
      Validators.required
    ]),
    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    mobile : new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    comment : new FormControl('', Validators.required),
  });
  
  get name() {
    return this.contactUsForm.get('name');
  }
  get email() {
    return this.contactUsForm.get('email');
  }
  get mobile() {
    return this.contactUsForm.get('mobile');
  }
  get comment() {
    return this.contactUsForm.get('comment');
  }

  contactUsFormSubmit() {
    if (this.contactUsForm.invalid) {
      return;
    }

    this.loading = true;
    this.lazyTwo.contactUSForm(this.contactUsForm.value).subscribe(
      data => {
        this.loading = false;
        this.mailSentAlert = false;
      },
      (error: Response) => {
        this.loading = false;
        this.unExpectedErrorAlert = false;
      }
    );
  }

  ngOnInit() {
  }

}
