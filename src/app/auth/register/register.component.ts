import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';
import { UserService } from '@app/shared/services/user.service';
import { FileInput } from 'ngx-material-file-input';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  requestText!: string;
  profileOverview!: string;
  image: any;
  choosen: any;
  @ViewChild('stepperR') stepper!: MatStepper;
  userId!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordsMatchValidator,
    ]),
  });

  get fullname(): AbstractControl {
    return this.userForm.get('fullname')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { fullname, email, password, repeatPassword } =
      this.userForm.getRawValue();

    this.authService
      .register(fullname, email, password, repeatPassword)
      .subscribe(res => {
        this.userId = res._id;
        this.stepper.next();
      });
  }

  fileChoosen(event: any) {
    if (event?.target) {
      this.image = <File>event.target.files[0];
      this.saveAvatar();
    }
  }

  saveAvatar() {
    let fd = new FormData();
    if (this.image) {
      fd.append('avatar', this.image, this.image.name);
      this.userService.saveAvatar(fd, this.userId).subscribe(res => {
        if (res['success']) {
          console.log();
        }
      });
    }
  }

  sendRequest() {
    this.userService
      .addOrganizerRequest({ textRequest: this.requestText })
      .subscribe(res => {
        console.log(res);
      });
  }
}
