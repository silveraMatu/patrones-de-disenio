interface Observador {
  notificar(equipo: Equipo): void
}

class Equipo {
  nombre: string
  tipo: string
  private _estado: string
  private observadores: Observador[] = []

  constructor(nombre: string, tipo: string, estado: string) {
    this.nombre = nombre
    this.tipo = tipo
    this._estado = estado
  }

  get estado(): string {
    return this._estado
  }

  agregarObservador(observador: Observador): void {
    this.observadores.push(observador)
  }

  cambiarEstado(nuevoEstado: string): void {
    this._estado = nuevoEstado
    for (const o of this.observadores) {
      o.notificar(this)
    }
  }
}

class Soporte implements Observador {
  notificar(equipo: Equipo): void {
    console.log(`Soporte notificado: ${equipo.nombre} ha cambiado su estado a ${equipo.estado}.`)
  }
}

// Otro observador sin tocar la clase Equipo
class RegistroLog implements Observador {
  notificar(equipo: Equipo): void {
    console.log(`[log] ${equipo.nombre} -> ${equipo.estado}`)
  }
}

const soporte = new Soporte()
const equipo = new Equipo("Notebook HP", "Portátil", "disponible")
equipo.agregarObservador(soporte)
equipo.agregarObservador(new RegistroLog())
equipo.cambiarEstado("en reparación")
equipo.cambiarEstado("disponible")
