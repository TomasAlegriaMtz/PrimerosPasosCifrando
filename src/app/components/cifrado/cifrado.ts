import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-cifrado',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cifrado.html',
  styleUrl: './cifrado.css',
})
export class Cifrado {
  //GV1
  band:boolean = false;
  //GV2
  cifradoForm!:FormGroup;
  //GV3
  resultado:string = '';

  //I4
  constructor(private formBuilder : FormBuilder){}
  //I5
  ngOnInit():void{
    this.cifradoForm = this.formBuilder.group({
      metodo: ['1', Validators.required],
      n: [3, [Validators.min(1)]],        
      cadena: ['', Validators.required],   
      asciiMin: [32],                     
      asciiMax: [126]                      
    })
  }
  //I6
  toggleN(band:boolean){
    this.band = band;
  }
  ///I7
  onSubmit(band:boolean){
    if(this.cifradoForm.valid){
      const {metodo, n, cadena} = this.cifradoForm.getRawValue();
      metodo ==1 ?this.funC(n,cadena,band)  : this.funA(cadena);
    }
  }
  //I8
  funA(cadena:string){
    const { asciiMin, asciiMax } = this.cifradoForm.getRawValue();
    this.resultado = cadena.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= asciiMin && code <= asciiMax) {
        const nuevoCode = (asciiMin + asciiMax) - code;
        return String.fromCharCode(nuevoCode);
      }
      return char;
    }).join('');
  }
  //I9
  funC(n:number, cadena:string, band:boolean){
    const { asciiMin, asciiMax } = this.cifradoForm.getRawValue();
    const range = asciiMax - asciiMin + 1;
    const desplazamiento = band ? n : -n;
    this.resultado = cadena.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= asciiMin && code <= asciiMax) {
        let nuevoCode = ((code - asciiMin + desplazamiento) % range + range) % range;
        return String.fromCharCode(nuevoCode + asciiMin);
      }
      return char;
    }).join('');
  }
}
