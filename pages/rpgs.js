import Rpgs from '../components/Rpgs';
import Layout from "../components/Layout";
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useState } from 'react';
import { useFetchUser } from '../lib/authContext';

// RpgsList component displays the list of RPGs fetched from the Strapi CMS.
const RpgsList = ({ rpgs }) => {
    const { user } = useFetchUser();
    const [pageIndex, setPageIndex] = useState(1);
    const { data } = useSWR(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rpgs?pagination[page]=${pageIndex}&pagination[pageSize]=2`,
        fetcher,
        {
            fallbackData: rpgs,
        }
    );

    // Check if the user is authenticated
    const isAuthenticated = !!user;

    return (
        <Layout user={user}>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    Rpgs
                </span>
            </h1>
            {isAuthenticated ? (
                <>
                    <Rpgs rpgs={data} />
                    <div className="space-x-2 space-y-2">
                        <button
                            className={`md:p-2 rounded py-2 text-black text-white p-2 ${
                                pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
                            }`}
                            disabled={pageIndex === 1}
                            onClick={() => setPageIndex(pageIndex - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`md:p-2 rounded py-2 text-black text-white p-2 ${
                                pageIndex === (data && data.meta.pagination.pageCount)
                                    ? 'bg-gray-300'
                                    : 'bg-blue-400'
                            }`}
                            disabled={pageIndex === (data && data.meta.pagination.pageCount)}
                            onClick={() => setPageIndex(pageIndex + 1)}
                        >
                            Next
                        </button>
                        <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount}`}</span>
                    </div>
                </>
            ) : (
                <p>Please log in to view the Rpgs content.</p>
            )}
        </Layout>
    );
};

export default RpgsList;

export async function getStaticProps() {
    const rpgResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rpgs?pagination[page]=1&pagination[pageSize]=2`
    );
    console.log(rpgResponse);
    return {
        props: {
            rpgs: rpgResponse,
        },
    };
}
