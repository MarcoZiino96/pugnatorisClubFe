import { IUser } from './../../../Models/i-user';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseData } from '../../../Models/i-response-data';
import { AuthService } from '../../../Services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../../Models/i-register';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class EditComponent {
  match:boolean=false;
  msg!:IRegister;
  errorMsg!:IRegister;
  registered : boolean=false;
  iUser:IResponseData ={
    dateResponse: new Date(),
    message: '',
    response:{
      id: 0,
    username: '',
    password: '',
    ruolo: '',
    nome: '',
    cognome: '',
    email: '',
    fotoProfilo: '',
    dataNascita:new Date()

    },
  }


  constructor(private route : ActivatedRoute, private authSvc:AuthService,private fb:FormBuilder,private router: Router){}
registerForm:FormGroup = this.fb.group({

  nome: this.fb.control(this.iUser.response.nome,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern(/^[a-zA-Z\s]*$/)]),
  cognome: this.fb.control(this.iUser.response.cognome,[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern(/^[a-zA-Z\s]*$/)]),
  username: this.fb.control(this.iUser.response.username,[Validators.required,Validators.minLength(4),Validators.maxLength(16),Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{4,}$/)]),
  email: this.fb.control(this.iUser.response.email,[Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)]),
  password: this.fb.control(this.iUser.response.password,[Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/)]),
  dataNascita: this.fb.control(this.iUser.response.dataNascita, [Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  confirmPassword: this.fb.control(this.iUser.response.password, [Validators.required])
});

ngOnInit(){
  this.route.params.subscribe((params:any)=>{
    this.authSvc.getById(params.id)?.subscribe((res=>{
      if(!res){
        throw new Error
      }
     this.iUser = res
     console.log(res);

     this.registerForm.patchValue({
      nome: this.iUser.response.nome,
      cognome: this.iUser.response.cognome,
      username: this.iUser.response.username,
      dataNascita: this.iUser.response.dataNascita,
      email: this.iUser.response.email,
    });
  }))
  })
}

ngDoCheck(){
  this.errorMsg = {
    nome: this.invalidMessages('nome'),
    cognome: this.invalidMessages('cognome'),
    username: this.invalidMessages("username"),
    email: this.invalidMessages('email'),
    dataNascita: this.invalidMessages("dataNascita"),
    password: this.invalidMessages('password'),
    confirmPassword: (this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value) && (this.registerForm.controls['confirmPassword'].dirty) ? 'Mancata corrispondenza' : this.invalidMessages('confirmPassword')
  }

  this.msg = {
    email: '',
    password: '',
    nome: '',
    cognome: '',
    username: '',
    dataNascita: '',
    confirmPassword: ''
  }

  if(this.registerForm.controls["password"].value === this.registerForm.controls["confirmPassword"].value && this.registerForm.controls["confirmPassword"].dirty){
    this.match = true
  }else{
    this.match = false
  }

  if (this.errorMsg.nome) {
    this.msg.nome = this.errorMsg.nome
  } else {
    this.msg.nome = 'Campo compilato correttamente'
  }

  if (this.errorMsg.cognome) {
    this.msg.cognome= this.errorMsg.cognome
  } else {
    this.msg.cognome = 'Campo compilato correttamente'
  }

  if (this.errorMsg.username) {
    this.msg.username = this.errorMsg.username
  } else {
    this.msg.username = 'Campo compilato correttamente'
  }

  if (this.errorMsg.email) {
    this.msg.email = this.errorMsg.email
  } else {
    this.msg.email = 'Campo compilato correttamente'
  }

  if (this.errorMsg.password) {
    this.msg.password = this.errorMsg.password
  } else {
    this.msg.password = 'Campo compilato correttamente'
  }

  if (this.errorMsg.dataNascita) {
    this.msg.dataNascita = this.errorMsg.dataNascita
  } else {
    this.msg.dataNascita = 'Campo compilato correttamente'
  }

  if (this.errorMsg.confirmPassword) {
    this.msg.confirmPassword = this.errorMsg.confirmPassword
  } else {
    this.msg.confirmPassword = 'Le due password combaciano'
  }
}

invalidMessages(fieldName: string):string{
  const field: AbstractControl | null = this.registerForm.get(fieldName);
  let errorMsg:string = "";

  if(field)
   if(field.errors){

    if (field.errors['required'])
    errorMsg = 'Campo vuoto'

      if (field.errors['pattern'] && fieldName === 'email')
      errorMsg = 'Formato email errato'

      if (field.errors['pattern'] && fieldName === 'dataNascita')
      errorMsg = 'Formato data errato'

      if (field.errors['pattern'] && fieldName === 'password')
      errorMsg = "Password deve contenere: 1 lettera maiuscola, 1 lettera minuscola, 1 numero e 1 carattere speciale"

      if (field.errors['minlength'] && fieldName === 'password')
      errorMsg = 'Lunghezza minima password: 8 caratteri'

      if (field.errors['maxlength'] && fieldName === 'password')
      errorMsg = 'Lunghezza massima password: 16 caratteri'

      if (field.errors['minlength'] && fieldName === 'username')
      errorMsg = 'Lunghezza minima password: 4 caratteri'

      if (field.errors['maxlength'] && fieldName === 'username')
      errorMsg = 'Lunghezza massima password: 16 caratteri'

      if (field.errors['pattern'] && fieldName === 'username')
      errorMsg = 'deve contenere almeno una lettere maiuscola e un carattere speciale'

      if (field.errors['minlength'] && (fieldName === 'nome' || fieldName === 'cognome'))
      errorMsg = 'Lunghezza minima: 3 caratteri'

      if (field.errors['maxlength'] && (fieldName === 'nome' || fieldName === 'cognome'))
      errorMsg = 'Lunghezza massima: 10 caratteri'

      if (field.errors['minlength'] && fieldName === 'confirmPassword')
      errorMsg = 'Lunghezza minima password: 8 caratteri'

      if (field.errors['pattern'] && (fieldName === 'nome' || fieldName === 'cognome'))
      errorMsg = 'Sono ammesse solo lettere dell\'alfabeto'
   }
   return errorMsg;
}

isValid(inputName:string){
  return this.registerForm.get(inputName)?.valid && this.registerForm.get(inputName)?.dirty
}

isInvalid(inputName:string){
  return !this.registerForm.get(inputName)?.valid && this.registerForm.get(inputName)?.dirty
}

edit(){
  const registerData: any = this.registerForm.value
  registerData.dataNascita = new Date(registerData.dataNascita)
  delete registerData.confirmPassword
  this.route.params.subscribe((params:any)=>{
    this.authSvc.getById(params.id)?.subscribe((res=>{
      if(!res){
        throw new Error
      }
      console.log(res);

     this.iUser = res
     this.authSvc.edit(this.iUser.response.id, registerData)?.subscribe((res=>{
      if(!res){
        throw new Error
      }else{
        this.router.navigate(['../../welcomeUser']);
      }
  }))
  }))
  })
}
}
