import { getSSRClient } from "@/libs/client";
import { gql, useMutation } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";


type Data = {
        getCar: {
          id: string,
          seats: number,
            brand: string,
          plate:string
        }
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {id}  = context.query

    
  const query = gql`
    query($getCarId: ID!){
        getCar(id: $getCarId) {
    id
    seats
    brand
    plate
    }
    }
  `;
  
    const client = getSSRClient();

    const { data } = await client.query<{
        getCar: {
            id : string
            plate : string
            brand : string
            seats : number
        }
      }>({query, variables : { getCarId : id}});
    


    return {    
        props: {
            data
        }
    }

}

const Page : NextPage<{data : Data}> = ({data}) => {




  
    return (
    <>

    {data.getCar.id}
    {data.getCar.brand}
    {data.getCar.plate}
    {data.getCar.seats}

    </>
    );
}

export default Page