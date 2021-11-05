import Link from 'next/link'
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from 'next/dist/client/router';

const Company : NextPage = ({company} : any) => {

    const {isFallback} = useRouter();

    if (isFallback) {
        return <h1>Carregando...</h1>
    }

    return (
        <div>
            <h1>{company.name}</h1>
            <h3>{company.location}</h3>

            <h4>Produtos:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                {
                    company.products.map((prod : any) => (
                        <Link key={prod.id} href={`/companies/${company.path}/products/${prod.name}`}>
                            {prod.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export const getStaticPaths : GetStaticPaths = async () => {
    const {data} = await axios('https://my-fake-store-2.herokuapp.com/api/companies');
    const paths = data.map((company : any) => ({
        params: {
            path: company.path
        }
    }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps : GetStaticProps = async (context) => {
    const { path } = context.params as any;

    const {data} = await axios(`https://my-fake-store-2.herokuapp.com/api/companies/${path}`);
    return {
      props: {
        company: data
      }
    }
}

export default Company