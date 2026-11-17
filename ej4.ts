interface Equipo {
  nombre: string
  tipo: string
  estado: string
}

// Contrato que espera el sistema nuevo
interface Inventario {
  agregarEquipo(nombre: string, tipo: string, estado: string): void
  listarEquipos(): Equipo[]
}

class InventarioViejo {
  private items: string[] = []

  // El sistema viejo guarda cada ítem como un string plano
  agregarItem(descripcion: string): void {
    this.items.push(descripcion)
  }

  obtenerItems(): string[] {
    return this.items
  }
}

class AdaptadorInventario implements Inventario {
  private viejo: InventarioViejo

  constructor(viejo: InventarioViejo) {
    this.viejo = viejo
  }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.viejo.agregarItem(`${nombre}|${tipo}|${estado}`)
  }

  listarEquipos(): Equipo[] {
    return this.viejo.obtenerItems().map((item) => {
      const [nombre = "", tipo = "", estado = ""] = item.split("|")
      return { nombre, tipo, estado }
    })
  }
}

const inventarioViejo = new InventarioViejo()
const adaptador = new AdaptadorInventario(inventarioViejo)
adaptador.agregarEquipo("Servidor Dell", "Servidor", "disponible")
console.log(adaptador.listarEquipos())
