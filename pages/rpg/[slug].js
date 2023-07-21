import { getTokenFromLocalCookie, getTokenFromServerCookie } from "@/lib/auth";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import { useFetchUser } from "../../lib/authContext";

const Rpg = ({ rpg }) => {
    const { user, loading } = useFetchUser();

    if (!rpg || !rpg.attributes || !rpg.attributes.slug) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout user={user}>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                {rpg.attributes.slug}
            </span>
        </h1>
        <p>
            <span style={{ color: 'red' }}>Released Date: {rpg.attributes.released}</span>
        </p>
        <p>{rpg.attributes.plot}</p>
        </Layout>
    );
};

export async function getServerSideProps({ req, params }) {
    const { slug } = params;
    const jwt =
        typeof window !== "undefined"
            ? getTokenFromLocalCookie()
            : getTokenFromServerCookie(req);
    try {
        const rpgResponse = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/rpgs?filters[slug]=${slug}&populate=*`,
            jwt
                ? {
                      headers: {
                          Authorization: `Bearer ${jwt}`,
                      },
                  }
                : ""
        );
        return {
            props: {
                rpg: rpgResponse.data[0],
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                rpg: null,
            },
        };
    }
}

export default Rpg;
