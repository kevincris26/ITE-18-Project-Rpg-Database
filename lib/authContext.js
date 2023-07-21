import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFromLocalCookie } from '../lib/auth';

let userState;

// User context to manage user data and loading state.
const User = createContext({ user: null, loading: false });

// UserProvider component wraps the content with User context provider.
export const UserProvider = ({ value, children }) => {
    const { user } = value;

    useEffect(() => {
        if (!userState && user) {
            userState = user;
        }
    }, []);

    return <User.Provider value={value}>{children}</User.Provider>;
};

// useUser hook to access user data and loading state from the context.
export const useUser = () => useContext(User);

// useFetchUser hook to fetch user data and manage loading state.
export const useFetchUser = () => {
    const [data, setUser] = useState({
        user: userState || null,
        loading: userState === undefined,
    });

    useEffect(() => {
        if (userState !== undefined) {
            return;
        }

        let isMounted = true;
        const resolveUser = async () => {
            const user = await getUserFromLocalCookie();
            if (isMounted) {
                setUser({ user, loading: false });
            }
        };
        resolveUser();

        return () => {
            isMounted = false;
        };
    }, []);

    return data;
};
