'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { AnimalI } from "@/utils/types/animais"
import ItemAnimal from "@/components/ItemAnimal"

function CadAnimais() {
  const [animais, setAnimais] = useState<AnimalI[]>([])

  useEffect(() => {
    async function getAnimais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais`)
      const dados = await response.json()
      setAnimais(dados)
    }
    getAnimais()
  }, [])

  const listaAnimais = animais.map(animal => (
    <ItemAnimal key={animal.id} animal={animal} animais={animais} setAnimais={setAnimais} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Animais
        </h1>
        <Link href="animais/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Cadastrar Animal
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Animal
              </th>
              <th scope="col" className="px-6 py-3">
                Espécie
              </th>
              <th scope="col" className="px-6 py-3">
                Idade
              </th>
              <th scope="col" className="px-6 py-3">
                Porte
              </th>
              <th scope="col" className="px-6 py-3">
                Sexo
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaAnimais}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadAnimais