import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios';

const Home: NextPage = ({companies} : any) => {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Bem vindo ao MyStore!</h1>

      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        {
          companies && companies.map((company : any) => (
            <Link key={company.path} href={`/companies/${company.path}`}>
              {company.name}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export const getStaticProps : GetStaticProps = async () => {
  const {data} = await axios('https://my-fake-store-2.herokuapp.com/api/companies');
  return {
    props: {
      companies: data
    },
    revalidate: 20 //segundos
  }
}

export default Home
