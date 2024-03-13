import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponseData } from '../../../Models/i-response-data';
import { AuthService } from '../../../Services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEdit } from '../../../Models/i-edit';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class EditComponent {

  match: boolean = false;
  msg!: IEdit;
  errorMsg!: IEdit;
  registered: boolean = false;
  file!:File

  iUser: IResponseData = {
    dateResponse: new Date(),
    message: '',
    response: {
      id: 0,
      password: '',
      ruolo: '',
      nome: '',
      cognome: '',
      email: '',
      fotoProfilo: null,
      dataNascita: null,
    },
  }

  constructor(private route: ActivatedRoute, private authSvc: AuthService, private fb: FormBuilder, private router: Router) { }

  editForm: FormGroup = this.fb.group({
    nome: this.fb.control(this.iUser.response.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    cognome: this.fb.control(this.iUser.response.cognome, [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: this.fb.control(this.iUser.response.email, [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)]),
    dataNascita: this.fb.control(this.iUser.response.dataNascita, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
  });

  editFotoForm :FormGroup = this.fb.group({
    fotoProfilo: this.fb.control(this.iUser.response.dataNascita, [Validators.required])
  })


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.authSvc.getById(params.id)?.subscribe((res => {
        if (!res) {
          throw new Error
        }
        this.iUser = res

        this.editForm.patchValue({
          nome: this.iUser.response.nome,
          cognome: this.iUser.response.cognome,
          dataNascita: this.iUser.response.dataNascita,
          email: this.iUser.response.email,
        });
      }))
    })
  }

  ngDoCheck() {
    this.errorMsg = {
      nome: this.invalidMessages('nome'),
      cognome: this.invalidMessages('cognome'),
      email: this.invalidMessages('email'),
      dataNascita: this.invalidMessages("dataNascita"),
    }

    this.msg = {
      email: '',
      nome: '',
      cognome: '',
      dataNascita: '',
    }

    if (this.errorMsg.nome) {
      this.msg.nome = this.errorMsg.nome
    } else {
      this.msg.nome = 'Campo compilato correttamente'
    }

    if (this.errorMsg.cognome) {
      this.msg.cognome = this.errorMsg.cognome
    } else {
      this.msg.cognome = 'Campo compilato correttamente'
    }

    if (this.errorMsg.email) {
      this.msg.email = this.errorMsg.email
    } else {
      this.msg.email = 'Campo compilato correttamente'
    }

    if (this.errorMsg.dataNascita) {
      this.msg.dataNascita = this.errorMsg.dataNascita
    } else {
      this.msg.dataNascita = 'Campo compilato correttamente'
    }
  }

  invalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.editForm.get(fieldName);
    let errorMsg: string = "";

    if (field)
      if (field.errors) {

        if (field.errors['required'])
          errorMsg = 'Campo vuoto'

        if (field.errors['pattern'] && fieldName === 'email')
          errorMsg = 'Formato email errato'

        if (field.errors['pattern'] && fieldName === 'dataNascita')
          errorMsg = 'Formato data errato'

        if (field.errors['minlength'] && (fieldName === 'nome' || fieldName === 'cognome'))
          errorMsg = 'Lunghezza minima: 3 caratteri'

        if (field.errors['maxlength'] && (fieldName === 'nome' || fieldName === 'cognome'))
          errorMsg = 'Lunghezza massima: 10 caratteri'

        if (field.errors['pattern'] && (fieldName === 'nome' || fieldName === 'cognome'))
          errorMsg = 'Sono ammesse solo lettere dell\'alfabeto'
      }
    return errorMsg;
  }

  isValid(inputName: string) {
    return this.editForm.get(inputName)?.valid && this.editForm.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.editForm.get(inputName)?.valid && this.editForm.get(inputName)?.dirty
  }

  edit() {

    const editData: any = this.editForm.value

    editData.dataNascita = new Date(editData.dataNascita)

    this.route.params.subscribe((params: any) => {
      this.authSvc.getById(params.id)?.subscribe((res => {
        if (!res) {
          throw new Error
        }
        this.iUser = res

        this.authSvc.edit(this.iUser.response.id, editData)?.subscribe((response => {
          if (!response) {
            throw new Error
          } else {
            this.router.navigate(['../../welcomeUser']);
          }
        }))
      }))
    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }


editFoto(){

  const editFotoData:any=this.editFotoForm.value;

  this.route.params.subscribe((params: any) => {
    this.authSvc.getById(params.id)?.subscribe(
      (res) => {
        if (!res) {
          throwError('Utente non trovato');
        }

        this.iUser = res;

        this.authSvc.uploadFile(this.iUser.response.id, this.file)?.subscribe(
          (response) => {
            console.log("Foto caricata con successo", response);
          },
          (error) => {
            console.error("Errore durante l'upload della foto", error);
          }
        );
      },
    );
  });

}
}
