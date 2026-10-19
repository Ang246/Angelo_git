import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
import { AlertService } from '../../../core/services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);

  form: FormGroup;
  id: number | null = null;
  fotoSeleccionada: File | null = null;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0.1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    })

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.productoService.getProductoById(this.id).subscribe(p => {
        this.form.patchValue(p);
      });
    }
  }

  onFileSelected(event: any) {
    this.fotoSeleccionada = event.target.files[0];
  }

  guardar() {
    if (this.form.invalid) return;
    const formData = new FormData();
    formData.append('nombre', this.form.value.nombre);
    formData.append('descripcion', this.form.value.descripcion);
    formData.append('precio', this.form.value.precio);
    formData.append('stock', this.form.value.stock);

    if (this.fotoSeleccionada) {
      formData.append('file', this.fotoSeleccionada);
    }

    const request = this.id ?
      this.productoService.updateProduct(this.id, formData)
      : this.productoService.createProduct(formData)
    request.subscribe({
      next: () => {
        this.alertService.success(this.id ? 'Producto actualizado' : 'Producto creado');
        this.router.navigate(['/productos']);
      },
      error: (err) => this.alertService.error('Ocurrió un error en la transacción')
    })
  }
}
