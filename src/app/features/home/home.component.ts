import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/interfaces/producto.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private productoService = inject(ProductoService);

  productos: Producto[] = [];

  ngOnInit(): void {
    this.loadingProducts();
  }

  loadingProducts(){
    this.productoService.getProductos().subscribe({
      next:(data) => this.productos = data,
      error:(err) => console.error('Error al cargar los productos:', err)
    })
  }
  
}
