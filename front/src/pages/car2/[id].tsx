import { getSSRClient } from "@/libs/client";
import { gql, useMutation } from "@apollo/client";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";


type Data = {
        getCar: {
          id: string,
          seats: number,
            brand: string,
          plate:string
        }
}

export const getStaticPaths : GetStaticPaths = async () =>  {

    const query = gql`
    query{
        getCars {
          id
        }
      }
  `;
  
    const client = getSSRClient();

    const { data } = await client.query<{
        getCars: {
            id : string
        }[]
      }>({query})

    
    const paths = data.getCars.map((e) => {
        return {params : {
            id : e.id
        }}
    })

    return {
        paths,
        fallback: false,
      };

    
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  
    const id = params?.id;
  
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
        id: string
        seats : number
        plate : string
        brand : string
      };
    }>({
      query,
      variables: {
        getCarId : id
      },
    });
  
  
    
    return {
      props: {
        data,
      },
    };
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