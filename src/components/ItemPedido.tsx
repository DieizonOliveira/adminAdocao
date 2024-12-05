'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import Cookies from "js-cookie"
import { PedidoI } from "@/utils/types/pedidos"
import Image from 'next/image';

interface listaPedidoProps {
  pedido: PedidoI,
  pedidos: PedidoI[],
  setPedidos: Dispatch<SetStateAction<PedidoI[]>>
}

function ItemPedido({ pedido, pedidos, setPedidos }: listaPedidoProps) {

  async function excluirPedido() {

    if (confirm(`Confirma Exclusão do Pedido "${pedido.descricao}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedido.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const pedidos2 = pedidos.filter(x => x.id != pedido.id)
        setPedidos(pedidos2)
        alert("Proposta excluída com sucesso")
      } else {
        alert("Erro... Proposta não foi excluída")
      }
    }
  }

  async function responderPedido() {
    const respostaAbrigo = prompt(`Resposta do Abrigo "${pedido.descricao}"`)

    if (respostaAbrigo == null || respostaAbrigo.trim() == "") {
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedido.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify({resposta: respostaAbrigo})
      },
    )

    if (response.status == 200) {
      const pedidos2 = pedidos.map(x => {
        if (x.id == pedido.id) {
          return { ...x, resposta: respostaAbrigo}
        }
        return x
      })
      setPedidos(pedidos2)
    }
  }

  return (
    <tr key={pedido.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Image src={pedido.animal.foto} alt="Foto do Animal"
          width={100} 
          height={100} />
      </th>
      <td className={"px-6 py-4"}>
        {(pedido.animal.especie.nome)}
      </td>
      <td className={"px-6 py-4"}>
        {Number(pedido.animal.idade)}
      </td>
      <td className={`px-6 py-4`}>
        {pedido.adotante.nome}
      </td>
      <td className={`px-6 py-4`}>
        {pedido.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {pedido.resposta}
      </td>
      <td className="px-6 py-4">
        {pedido.resposta ? 
          <>
            <Image src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirPedido} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
              onClick={responderPedido} />
          </>
        }
      </td>

    </tr>
  )
}

export default ItemPedido