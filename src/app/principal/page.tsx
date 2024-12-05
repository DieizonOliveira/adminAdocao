'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface animaisEspecieI {
  especie: string
  num: number
}

interface geralDadosI {
  adotantes: number
  animais: number
  pedidos: number
}

type DataRow = [string, number, string]

export default function Principal() {
  const [animaisEspecie, setAnimaisEspecie] = useState<animaisEspecieI[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGrafico() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/animaisEspecie`)
      const dados = await response.json()
      setAnimaisEspecie(dados)
    }
    getDadosGrafico()
  }, [])

  const data: (["Especie", "NºAnimais", { role: string }] | DataRow)[] = [
    ["Especie", "NºAnimais", { role: "style" }],
  ];
  
  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"]

  animaisEspecie.forEach((animal, index) => {
    data.push([animal.especie, animal.num, cores[index%10]])
  })

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Dados Sobre o Abrigo:</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.adotantes}</span>
          <p className="font-bold mt-2 text-center">Nº Adotantes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.animais}</span>
          <p className="font-bold mt-2 text-center">Nº Animais</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.pedidos}</span>
          <p className="font-bold mt-2 text-center">Nº Pedidos de Adoção</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Número de Animais por Espécie:</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />

    </div>
  )
}