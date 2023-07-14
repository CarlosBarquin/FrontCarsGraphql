import { gql, useMutation, useQuery} from "@apollo/client";
import Link from "next/link";
import styled from "styled-components";
import { use, useEffect, useState } from "react";

const ADD_CAR = gql`
mutation($plate: String!, $brand: String!, $seats: Int!){
    createCar(plate: $plate, brand: $brand, seats: $seats) {
      id
    }
  }
`

const GET_CARS= gql`
query{
  getCars {
    id
    brand
    seats
    plate
  }
}
`

const DEL_CAR = gql`
mutation($deleteCarId: ID!){
  deleteCar(id: $deleteCarId) {
    id
  }
}
`

const UPD_CAR = gql`
mutation($updateCarId: ID!, $plate: String!, $brand: String!, $seats: Int!){
  updateCar(id: $updateCarId, plate: $plate, brand: $brand, seats: $seats) {
    id
  }
}
`

const pagina = () => {

    const [ plate , setPlate] = useState<string>("")
    const [ brand , setBrand] = useState<string>("")
    const [ seats , setSeats] = useState<number>(0)

    const [ plate2 , setPlate2] = useState<string>("")
    const [ brand2 , setBrand2] = useState<string>("")
    const [ seats3 , setSeats3] = useState<number>(0)
    const [ id3 , setId3] = useState<string>("")
    const [e, sete] = useState<number>(0)

    const [ seats2 , setSeats2] = useState<number>(0)

    const [ id , setId] = useState<string>("")
    const [ id2 , setId2] = useState<string[]>([])
    
    const [perpage, setPerPage ] = useState<number>(-1) 
    const [ max , setMax] = useState<number>(-1)
    const [ min, setMin] = useState<number>(0)
    const[page, setPage] = useState<number>(1)

    const [addCar] = useMutation(ADD_CAR, {
        variables : {plate, brand, seats},
        onCompleted: () => {
          refetch()
        },
        onError: (error) => {
          const errorMessage = error.message; 
          const errorMessageElement = document.getElementById('error-message');
          errorMessageElement!.textContent = errorMessage; 
        }
    });

    const [deleteCar] = useMutation(DEL_CAR, {
      variables : {deleteCarId : id},
      onCompleted: () => {
        refetch()
      },
      onError: (error) => {
        const errorMessage = error.message; 
        const errorMessageElement = document.getElementById('error-message2');
        errorMessageElement!.textContent = errorMessage; 
      }
  });

  const [updateCar] = useMutation(UPD_CAR, {
    variables : {updateCarId : id3, plate : plate2, brand : brand2, seats : seats3},
    onCompleted: () => {
      refetch()
    },
    onError: (error) => {
      const errorMessage = error.message; 
      const errorMessageElement = document.getElementById('error-message3');
      errorMessageElement!.textContent = errorMessage; 
    }
});

    const { loading, error, data, refetch } = useQuery<{
        getCars: {
            id : string
            plate : string
            brand : string
            seats : number
        }[];
    }>(GET_CARS);

    useEffect(()=>{
      if(id === "") return
      deleteCar()
    },[id])

    useEffect(()=>{
      if(id3 === "") return
      updateCar()
    },[id3,e])



    useEffect(()=>{
      if(perpage === -1) return
      setMax(perpage)
      setMin(0)
      setPage(1)
    },[perpage])


    const data2 = data?.getCars.filter((e)=> e.seats === seats2)


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    


      return (
          <>
             <Titulo>CONSTRUIR COCHES</Titulo>
             <input type="text" placeholder="plate" onChange={(e)=> setPlate(e.target.value)}></input>
             <input type="text" placeholder="brand" onChange={(e)=> setBrand(e.target.value)}></input>
             <input type="number" placeholder="seats" onChange={(e)=> setSeats(parseInt(e.target.value))}></input>
             <button onClick={()=> {
                addCar()
             }}>add</button>

             <Link href={"/byseats/"}>
              <button>byseats</button>
             </Link>


              <div id="error-message"></div>
              <div id="error-message2"></div>
              <div id="error-message3"></div>


             <Titulo>COCHES POR ASIENTOS  PAG: {page}</Titulo>


             <input type="number" placeholder="asientos" onChange={(e)=> setSeats2(parseInt(e.target.value))}></input> 
              <button onClick={()=>{
                    if(max >= (data2!.length)-1) return
                    setMin(min+ perpage+1)
                    setMax(max+ perpage+1)
                    setPage(page+1)
                  }}>siguiente</button>
                  <button onClick={()=>{
                    if(min <= 0) return
                    setMin(min- (perpage+1))
                    setMax(max- (perpage+1))
                    setPage(page-1)
                  }}>anterior</button>

                  <input type="number" placeholder="cars por pagina" onChange={(e) => {
                    setPerPage(parseInt(e.target.value)-1)
                  }}></input>


             <Formulario>
             <Header>plate</Header>
             <Header>brand</Header>
             <Header>seats</Header>
             <Header></Header>

             {data2?.map((car, index)=> {



              return(
                <>
              
                  {index >= min && index <= max  &&   (
                  <>
                    <Celda2 onClick={()=> {
                     if(id2.includes(car.id)){
                      setId2(id2.filter((id)=> id !== car.id))
                     }else{
                      setId2([...id2, car.id])
                     } 
                    }}>{car.plate} {index}</Celda2>
                    <Celda>{<Link href={`/car/${car.id}`}>{car.brand}</Link>}</Celda>
                    <Celda>{car.seats}</Celda>
                    <Celda><button onClick={()=> {
                        setId(car.id)
                    }}>borrar</button></Celda>

                    {id2.includes(car.id) && (
                    <>
                      <Celda><input type="text" placeholder="plate" onChange={(e)=> setPlate2(e.target.value)}></input></Celda>
                      <Celda><input type="text" placeholder="brand" onChange={(e)=> setBrand2(e.target.value)}></input></Celda>
                      <Celda><input type="number" placeholder="seats" onChange={(e)=> setSeats3(parseInt(e.target.value))}></input></Celda>
                      <Celda><button onClick={()=> {
                        setId3(car.id)
                        sete(e +1 )
                    }}>editar</button></Celda>
                    </>
                    )}
                   </>
                )}

                </>
              )
             })}

             </Formulario>

     
             
          
          </>
      )
  }

  
    const Formulario = styled.div`
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 0.3fr;
    grid-gap: 1px;
    background-color: #fff;
    color: #444;
    margin-bottom: 50px;
    `;

    const Header = styled.div`
    background-color: #f1f1f1;
    font-weight: bold;
    padding: 20px;
    text-align: left;
    `;

    const Celda = styled.div`
    padding: 10px 20px 10px 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    `;

    const Titulo = styled.div`
    background-color: blue;
    font-weight: bold;
    padding: 20px;
    text-align: left;
    color: white;
    `;

    const Celda2 = styled.div`
    padding: 10px 20px 10px 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background-color: powderblue;
    transition: background-color .5s;

    &:hover {
      background-color: gold;

    }
`;




  
  export default pagina;