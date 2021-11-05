import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

const Product : NextPage = ({product} : any) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <h4>{product.category}</h4>
            <span>R$ {product.price}</span>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async (context) => {

    const { name, path} = context.params as any

    const { data } = await axios(`https://my-fake-store.herokuapp.com/api/companies/${path}/products/${name}`)

    return {
        props: {
            product: data
        }
    }
}

export default Product