'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { EspecieI } from "@/utils/types/especies"

type Inputs = {
  nome: string
  idade: string
  sexo: string
  foto: string
  descricao: string
  porte: string
  especieId: string
}

function NovoAnimal() {
  const [especies, setEspecies] = useState<EspecieI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getEspecies() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/especies`)
        if (!response.ok) throw new Error('Erro ao buscar espécies.')
        const dados = await response.json()
        setEspecies(dados)
      } catch{
        toast.error('Erro ao carregar espécies.')
      }
    }
    getEspecies()
    setFocus("nome")
  }, [setFocus])

  const optionsEspecie = especies.map(especie => (
    <option key={especie.id} value={especie.id}>
      {especie.nome}
    </option>
  ))

  async function incluirAnimal(data: Inputs) {
    const novoAnimal = {
      ...data,
      idade: Number(data.idade),
      especieId: Number(data.especieId),
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/animais`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("admin_logado_token")}`,
        },
        body: JSON.stringify(novoAnimal),
      })


        // Captura e log da resposta da API
    const responseData = await response.json();
    console.log("Response Data:", responseData);

      

      if (response.ok) {
        toast.success("Ok! Animal cadastrado com sucesso.")
        reset()
      } else {
        console.error("Erro no cadastro:", responseData);
        toast.error("Erro no cadastro do animal.")
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      toast.error("Erro na comunicação com o servidor.")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Inclusão de Animais
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirAnimal)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome do Animal
          </label>
          <input
            type="text"
            id="nome"
            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
            {...register("nome", { required: true })}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="especieId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Espécie
            </label>
            <select
              id="especieId"
              className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
              {...register("especieId", { required: true })}
            >
              <option value="">Selecione</option>
              {optionsEspecie}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="idade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Idade
            </label>
            <input
              type="number"
              id="idade"
              className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
              {...register("idade", { required: true })}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="porte" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Porte
            </label>
            <select
              id="porte"
              className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
              {...register("porte", { required: true })}
            >
              <option value="">Selecione</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Medio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sexo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sexo
            </label>
            <select
              id="sexo"
              className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
              {...register("sexo", { required: true })}
            >
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Femea">Fêmea</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL da Foto
          </label>
          <input
            type="url"
            id="foto"
            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
            {...register("foto", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={4}
            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
            {...register("descricao", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Incluir
        </button>
      </form>
    </>
  )
}

export default NovoAnimal


// 'use client'
// import { useForm } from "react-hook-form"
// import Cookies from "js-cookie"
// import { toast } from "sonner"
// import { useState, useEffect } from "react"
// import { EspecieI } from "@/utils/types/especies"

// type Inputs = {
//   nome: string
//   idade: number
//   sexo: string
//   foto: string
//   descricao: string
//   porte: string
//   especieId: number
// }

// function NovoAnimal() {
//   const [especies, setEspecies] = useState<EspecieI[]>([])
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setFocus
//   } = useForm<Inputs>()

//   useEffect(() => {
//     async function getEspecies() {
//       const response = await fetch(${process.env.NEXT_PUBLIC_URL_API}/especies)
//       const dados = await response.json()
//       setEspecies(dados)
//     }
//     getEspecies()
//     setFocus("nome")
//   }, [])

//   const optionsEspecie = especies.map(especie => (
//     <option key={especie.id} value={especie.id}>{especie.nome}</option>
//   ))

//   async function incluirAnimal(data: Inputs) {

//     const novoCarro: Inputs = {
//       nome: data.nome,
//       idade: Number(data.idade),
//       sexo: data.sexo,
//       foto: data.foto,
//       descricao: data.descricao,
//       porte: data.porte,
//       especieId: Number(data.especieId)

//     }

//     const response = await fetch(${process.env.NEXT_PUBLIC_URL_API}/animais,
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
//         },
//         body: JSON.stringify(novoCarro)
//       },
//     )

//     if (response.status == 201) {
//       toast.success("Ok! Animal cadastrado com sucesso")
//       reset()
//     } else {
//       toast.error("Erro no cadastro do Animal...")
//     }
//   }

//   return (
//     <>
//       <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
//         Inclusão de Animais
//       </h1>

//       <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirAnimal)}>
//         <div className="mb-3">
//           <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Nome do Animal</label>
//           <input type="text" id="modelo"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//             {...register("nome")}
//           />
//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           <div className="mb-3">
//             <label htmlFor="marcaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Especie</label>
//             <select id="marcaId"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("especieId")}
//             >
//               {optionsEspecie}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="idade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Idade
//             </label>
//             <select id="idade"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               {...register("idade")}
//               required>
//               {Array.from({ length: 100 }, (_, index) => (
//                 <option key={index + 1} value={index + 1}>
//                   {index + 1}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           {/* <div className="mb-3">
//             <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Porte</label>
//             <input type="text" id="porte"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("porte")}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Sexo</label>
//             <input type="text" id="sexo"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("sexo")}
//             />
//           </div> */}

//           <div className="mb-3">
//             <label htmlFor="combustivel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Porte</label>
//             <select id="combustivel"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("porte")}
//             >
//               <option>Pequeno</option>
//               <option>Médio</option>
//               <option>Grande</option>

//             </select>


//           </div><div className="mb-3">
//             <label htmlFor="combustivel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Sexo</label>
//             <select id="combustivel"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("sexo")}
//             >
//               <option>Macho</option>
//               <option>Femea</option>

//             </select>
//           </div>






//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           <div className="mb-3">
//             <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               URL da Foto</label>
//             <input type="text" id="foto"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("foto")}
//             />
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="combustivel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Combustível</label>
//             <select id="combustivel"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("combustivel")}
//             >
//               <option>FLEX</option>
//               <option>GASOLINA</option>
//               <option>ALCOOL</option>
//               <option>DIESEL</option>
//               <option>ELETRICIDADE</option>
//             </select>
//           </div> */}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Descrição</label>
//           <textarea id="acessorios" rows={4}
//             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             {...register("descricao")}></textarea>
//         </div>

//         <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//           Incluir</button>
//       </form>
//     </>
//   )
// }

// export default NovoAnimal
