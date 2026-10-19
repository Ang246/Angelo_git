import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/interfaces/producto.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  private productoService = inject(ProductoService);
  products: Producto[] =[];
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct(){
    this.productoService.getProductos().subscribe(
      data => this.products=data
    );
  }

  async eliminarProducto(id: number){
    const confirmado = await this.alertService.confirm('Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este producto?');
    if (confirmado) {
      this.productoService.deleteProduct(id).subscribe({
        next: () => {
          this.alertService.toast('Producto eliminado!!!!!');
          this.listProduct();
        },
        error: (err) => this.alertService.error('No se puso eliminar')
      });
    }
  }

}
