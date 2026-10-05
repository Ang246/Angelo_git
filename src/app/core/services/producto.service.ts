import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);

  //Usamos la ruta del backend para obtener los productos
  private apiUrl = '/api/v1/productos';

  //ruta publica
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  //obtener un producto por su id
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  //metodos para el admin
  //metodo para crear un producto
  createProduct(formData: FormData): Observable<Producto> {
    console.log("FormData recibido create");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post<Producto>(this.apiUrl, formData);
  }

  //metodo para actualizar un producto
  updateProduct(id: number, formData: FormData): Observable<Producto> {
    console.log("FormData recibido update");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, formData);
  }

  //metodo para eliminar un producto
  deleteProduct(id:number): Observable<void> {
    console.log("Eliminando producto con id:", id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
