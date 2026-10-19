export interface ItemVentaDto{
    idProducto: number;
    cantidad: number;
}

export interface VentaDto{
    idPersona: number;
    items: ItemVentaDto[];
}