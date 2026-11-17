abstract class EquipoBase {
  protected nombre: string
  protected ram: string
  protected procesador: string

  constructor(nombre: string, ram: string, procesador: string) {
    this.nombre = nombre
    this.ram = ram
    this.procesador = procesador
  }

  abstract detalles(): string
}

class Notebook extends EquipoBase {
  detalles(): string {
    return `Tipo: Notebook, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`
  }
}

class Desktop extends EquipoBase {
  detalles(): string {
    return `Tipo: Desktop, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`
  }
}

class Servidor extends EquipoBase {
  detalles(): string {
    return `Tipo: Servidor, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`
  }
}

type TipoEquipo = "Notebook" | "Desktop" | "Servidor"

class EquipoFactory {
  // Siempre devuelve el tipo abstracto, quien llama no depende de la clase concreta
  crearEquipo(tipo: TipoEquipo, nombre: string, ram: string, procesador: string): EquipoBase {
    switch (tipo) {
      case "Notebook":
        return new Notebook(nombre, ram, procesador)
      case "Desktop":
        return new Desktop(nombre, ram, procesador)
      case "Servidor":
        return new Servidor(nombre, ram, procesador)
      default:
        throw new Error(`Tipo de equipo desconocido: ${tipo satisfies never}`)
    }
  }
}

const factory = new EquipoFactory()
const equipos: EquipoBase[] = [
  factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7"),
  factory.crearEquipo("Desktop", "Lenovo ThinkCentre", "8GB", "i5"),
  factory.crearEquipo("Servidor", "HP ProLiant", "64GB", "Xeon"),
]

for (const e of equipos) {
  console.log(e.detalles())
}
