import Head from 'next/head';
import Nav from './Nav';
import { UserProvider } from '../lib/authContext';


// Layout component represents the overall structure of the application.
// It wraps the content with UserProvider to manage user data.

const Layout = ({ user, loading = false, children }) => (
    <UserProvider value={{ user, loading }}>
        <Head>
            <title>RPG Database</title>
        </Head>

        <Nav />
        <main className="px-4">
            <div
                className="
                flex
                justify-center
                items-center
                bg-white
                mx-auto
                w-2/4
                rounded-lg
                my-16
                p-16
            "
            >
                <div className="text-2xl font-medium">{children}</div>
            </div>
        </main>

    </UserProvider>

);

export default Layout;
