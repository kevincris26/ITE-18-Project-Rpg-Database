import Link from 'next/link';
import { useState } from 'react';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';

// Nav component displays the navigation bar and handles user authentication.
const Nav = () => {
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    // useUser hook to access user data and loading state.
    const { user, loading } = useUser();

    // Handles form submission to log in the user.
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetches user data from Strapi API for authentication.
        const responseData = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: data.identifier,
                    password: data.password,
                }),
            }
        );
        console.log(responseData);
        setToken(responseData);
    };

    // Handles user logout.
    const logout = () => {
        unsetToken();
    }

    // Handles form input changes and updates the state.
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Navigation bar UI with links and login/logout form.
    return (
        <nav
            className="
                flex flex-wrap
                items-center
                justify-between
                w-full
                py-4
                md:py-0
                px-4
                text-lg text-gray-700
                bg-white
            "
        >
            <div>
                <Link href="/" passHref>
                    <img
                        className="m-3"
                        src="/rpg-logo.png"
                        width={200}
                        height={50}
                        alt="RPG Logo"
                    />
                </Link>
            </div>

            <div
                className="hidden w-full md:flex md:items-center md:w-auto"
                id="menu"
            >
                <ul
                    className="
                        pt-4
                        text-base text-gray-700
                        md:flex
                        md:justify-between
                        md:pt-0 space-x-2"
                >
                    <li>
                        <Link href="/" className="md:p-2 py-2 block hover:text-purple-400">Home</Link>
                    </li>
                    <li>
                        <Link href="/rpgs" className="md:p-2 py-2 block hover:text-purple-400">Rpgs</Link>
                    </li>
                    {!loading && (
                        <li>
                            {user ? (
                                <Link href="#" className="md:p-2 py-2 block hover:text-purple-400" onClick={logout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </Link>
                            ) : (
                                ''
                            )}
                        </li>
                    )}

                    {!loading && !user ? (
                        <>
                            <li>
                                {/* Login form */}
                                <form onSubmit={handleSubmit} className="from-inline">
                                    <input
                                        type="text"
                                        name="identifier"
                                        onChange={handleChange}
                                        placeholder="Username"
                                        className="md:p-2 form-input py-2 rounded mx-2"
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="md:p-2 form-input py-2 rounded mx-2"
                                        required
                                    />

                                    <button
                                        className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                </form>
                            </li>
                        </>
                    ) : (
                        ''
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
