import { Metadata } from "next";
import BrandIdentityPage from "./brand-identity";
import axios from "axios";
import { api_url } from "@/src/constants/app_constants";
import { Shop } from "@/src/types/shop";
import Head from "next/head";


type Param = { params: Promise <{ id: string }>}
export const generateMetadata = async ({ params }: Param): Promise<Metadata> => {
    const id = (await params).id
    const response = await axios.get(`${api_url}/shops/${id}`)
    const shop = response.data as Shop

    return {
        title: shop?.name ?? 'ORBIS Q',
        description: shop?.description ?? 'RMS ORBISQ'
    }
}

export default async function Page({ params }: Param) {
    const id = (await params).id
    const response = await axios.get(`${api_url}/shops/${id}`)
    const shop = response.data as Shop
    
    return (
        <>
            <Head>
                <link rel="favicon" href={shop?.logo} />
            </Head>
            <BrandIdentityPage />
        </>
    )
}