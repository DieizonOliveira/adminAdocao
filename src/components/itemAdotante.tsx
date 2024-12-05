'use client'

import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import Cookies from "js-cookie"
import { AdotanteI } from "@/utils/types/adotantes"

interface listaAdotanteProps {
  adotante: AdotanteI,
  adotantes: AdotanteI[],
  setAdotantes: Dispatch<SetStateAction<AdotanteI[]>>
}

function ItemAdotante({ adotante, adotantes, setAdotantes }: listaAdotanteProps) {

  async function excluirAdotante() {
    if (confirm(`Confirma a exclusão do adotante ${adotante.nome}?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/adotantes/${adotante.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const adotantesAtualizados = adotantes.filter(a => a.id !== adotante.id)
        setAdotantes(adotantesAtualizados)
        alert("Adotante excluído com sucesso")
      } else {
        alert("Erro... Adotante não foi excluído")
      }
    }
  }

  return (
    <tr key={String(adotante.id)} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {adotante.nome}
      </td>
      <td className="px-6 py-4">
        {adotante.fone}
      </td>
      <td className="px-6 py-4">
        {adotante.endereco}
      </td>
      <td className="px-6 py-4">
        {adotante.email}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirAdotante} />
      </td>
    </tr>
  )
}

export default ItemAdotante
