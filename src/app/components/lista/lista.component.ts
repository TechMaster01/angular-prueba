import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuarios';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2'; // 👈 Importa SweetAlert2

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // 👇 Esta es la nueva función que maneja el SweetAlert
  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡elimínalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si el usuario confirma, procede con la eliminación
      if (result.isConfirmed) {
        // Llama al método del servicio para eliminar el usuario
        this.usuarioService.eliminarUsuario(id).subscribe(
          () => {
            // Muestra un mensaje de éxito y actualiza la lista
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            // Vuelve a cargar la lista de usuarios para reflejar el cambio
            this.ngOnInit();
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire(
              'Error',
              'Ocurrió un error al intentar eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }
}