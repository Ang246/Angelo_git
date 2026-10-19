import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { AlertService } from '../../core/services/alert.service';
import { Router, RouterLink } from '@angular/router';
import { ItemVentaDto, VentaDto } from '../../core/interfaces/pedido.interface';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  public cartService = inject(CartService);
  //private pedidoService = inject(PedidoService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  async pagar() {


    const confirmado = await this.alertService.confirm('¿Deseas confirmar tu compra?');
    if (!confirmado) return;


    // 3. Mapear los items del carrito al formato DTO del backend
    const itemsEnvio: ItemVentaDto[] = this.cartService.getItems().map(item => ({
      idProducto: item.producto.id!,
      cantidad: item.cantidad
    }));

    // 4. Construir el objeto final
    /*
    const pedidoFinal: VentaDto = {
      idPersona: idPersona,
      items: itemsEnvio
    };
    */

    // 5. Enviar al Backend
    
    /*
    this.pedidoService.crearPedido(pedidoFinal).subscribe({
      next: (res) => {
        this.alertService.success('Tu pedido ha sido procesado con éxito', '¡Compra Finalizada!');
        this.cartService.vaciarCarrito();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Aquí SweetAlert mostrará si no hay stock (Error 400 que configuramos en Java)
        const msg = err.error.message || 'No se pudo procesar el pedido';
        this.alertService.error(msg, 'Error en la venta');
      }
    });
    */
  }

}
