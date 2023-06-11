import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form!: FormGroup;

  loginOptions: string[] = [
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
    this.authService.login(this.f['email'].value);
  }
}
