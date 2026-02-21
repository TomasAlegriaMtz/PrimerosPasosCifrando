import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cifrado } from "./components/cifrado/cifrado";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cifrado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primerosPasosCifrando');
}
