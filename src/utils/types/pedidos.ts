import { AnimalI } from "./animais"
import { AdotanteI } from "./adotantes"

export interface PedidoI {
  id: number
  adotanteId: string
  adotante: AdotanteI
  animalId: number
  animal: AnimalI
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}