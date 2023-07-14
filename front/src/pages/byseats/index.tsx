import { gql, useMutation, useQuery} from "@apollo/client";
import { dirname } from "node:path/win32";
import { disconnect, eventNames } from "process";
import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";



const GET_CARS= gql`
query($seats: Int!){
    getCarsbyseats(seats: $seats) {
      id
      brand
      plate
      seats
    }}
`


const pagina = () => {

    const [ seats , setSeats] = useState<number>(0)

    const [ seats2 , setSeats2] = useState<number>(0)
    

    const { loading, error, data, refetch } = useQuery<{
        getCarsbyseats: {
            id : string
            plate : string
            brand : string
            seats : number
        }[];
    }>(GET_CARS,{
        variables : {seats : seats2}
    })


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    


      return (
          <>

            <input type="number" placeholder="seats" onChange={(e) => setSeats(parseInt(e.target.value))}></input>
            <button onClick={()=> setSeats2(seats)}> fawfawfwa</button>

            <h1>agagaegas</h1>

            {data?.getCarsbyseats.map((e)=> {
                return (
                    <>
                        {e.plate}--
                        {e.brand}--
                        {e.seats}--
                    </>
                )
            })}
    
             
          
          </>
      )
  }

  export default pagina