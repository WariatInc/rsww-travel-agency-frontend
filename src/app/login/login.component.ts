import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  form!: FormGroup;
  submitted: boolean = false;

  countryOptions: string[] = [
    'jeremias.sofia@gmail.com',
    'klaus.randi@gmail.com',
    'isabela.julius@gmail.com',
    'earleen.loes@gmail.com',
    'kepa.walther@gmail.com',
    'lucia.eini@gmail.com',
    'dileep.paul@gmail.com',
    'alexandre.saskia@gmail.com',
    'beatrix.anu@gmail.com',
    'flavio.estebe@gmail.com',
    'tereza.falz@gmail.com',
    'Belle.Jenkins@gmail.com',
    'wiktor.krueger@gmail.com',
    'eddie.miranda@gmail.com',
    'marbin.humphrey@gmail.com',
    'nabil.mendoza@gmail.com',
    'darcey.beck@gmail.com',
    'rosin.price@gmail.com',
    'janet.wilkins@gmail.com',
    'charles.morton@gmail.com',
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  login(): void {
    if (this.f['email'].value) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', this.f['email'].value);
      this.refresh();
    }
  }
  refresh(): void {
    window.location.reload();
  }
}
