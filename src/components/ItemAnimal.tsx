'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { AnimalI } from "@/utils/types/animais"
import Image from 'next/image';

interface listaAnimalProps {
  animal: AnimalI,
  animais: AnimalI[],
  setAnimais: Dispatch<SetStateAction<AnimalI[]>>
}

function ItemAnimal({ animal, animais, setAnimais }: listaAnimalProps) {

  async function excluirAnimal() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais/${animal.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const animais2 = animais.filter(x => x.id != animal.id)
        setAnimais(animais2)
        alert("Animal excluído com sucesso")
      } else {
        alert("Erro... Animal não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais/destacar/${animal.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const animais2 = animais.map(x => {
        if (x.id == animal.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setAnimais(animais2)
    }
  }

  return (
    <tr key={animal.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Image src={animal.foto} alt="Foto Animal"
          width={100} 
          height={100} />
      </th>
      <td className={`px-6 py-4 ${animal.destaque ? "font-extrabold" : ""}`}>
        {animal.nome}
      </td>
      <td className={`px-6 py-4 ${animal.destaque ? "font-extrabold" : ""}`}>
        {animal.especie.nome}
      </td>
      <td className={`px-6 py-4 ${animal.destaque ? "font-extrabold" : ""}`}>
        {animal.idade}
      </td>
      <td className={`px-6 py-4 ${animal.destaque ? "font-extrabold" : ""}`}>
        {animal.porte}
      </td>
      <td className={`px-6 py-4 ${animal.destaque ? "font-extrabold" : ""}`}>
        {animal.sexo}
      </td>

      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirAnimal} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemAnimal