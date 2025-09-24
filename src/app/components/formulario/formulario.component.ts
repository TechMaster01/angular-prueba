import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  public nombre: string = '';
  public email: string = '';
  public isSaving: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  guardarUsuario(): void {
    // Valida que los campos no estén vacíos antes de enviar
    if (!this.nombre || !this.email) {
      console.error('El nombre y el email son obligatorios.');
      return;
    }

    this.isSaving = true; // Deshabilita el botón

    // Llama al método del servicio para crear el usuario
    this.usuarioService.crearUsuario({ nombre: this.nombre, email: this.email }).subscribe({
      next: (usuarioCreado) => {
        console.log('Usuario creado con éxito:', usuarioCreado);
        // Limpia el formulario
        this.nombre = '';
        this.email = '';
        this.isSaving = false;
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        this.isSaving = false;
      }
    });
  }
}
