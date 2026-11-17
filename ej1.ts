interface Equipo {
  nombre: string
  tipo: string
  estado: string
}

class Inventario {
  private static instancia: Inventario | undefined
  private equipos: Equipo[] = []

  // Constructor privado para que nadie pueda hacer new Inventario()
  private constructor() {}

  static obtenerInstancia(): Inventario {
    if (!Inventario.instancia) {
      Inventario.instancia = new Inventario()
    }
    return Inventario.instancia
  }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.equipos.push({ nombre, tipo, estado })
  }

  listarEquipos(): Equipo[] {
    return [...this.equipos]
  }
}

const inventario = Inventario.obtenerInstancia()
inventario.agregarEquipo("Notebook HP", "Portátil", "disponible")
console.log(inventario.listarEquipos())

// Misma instancia en cualquier parte del programa
const otra = Inventario.obtenerInstancia()
otra.agregarEquipo("Servidor Dell", "Servidor", "en reparación")
console.log(inventario === otra)
console.log(inventario.listarEquipos())
