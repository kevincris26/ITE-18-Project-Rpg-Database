import Router from 'next/router';
import Cookies from 'js-cookie';
import { fetcher } from './api';

// SetToken function to store user data in cookies and reload the page.
export const setToken = (data) => {
    if (typeof window === 'undefined') {
        return;
    }
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);

    if (Cookies.get('username')) {
        Router.reload('/');
    }
};

// UnsetToken function to remove user data from cookies and reload the page.
export const unsetToken = () => {
    if (typeof window === 'undefined') {
        return;
    }
    Cookies.remove('id');
    Cookies.remove('jwt');
    Cookies.remove('username');

    Router.reload('/');
};

// Get user's username from cookies and fetch user data from the Strapi API.
export const getUserFromLocalCookie = () => {
    const jwt = getTokenFromLocalCookie();
    if (jwt) {
        return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((data) => {
                return data.username;
            })
            .catch((error) => console.error(error));
    } else {
        return;
    }
};

// Get user's id from cookies and fetch user data from the Strapi API.
export const getIdFromLocalCookie = () => {
    const jwt = getTokenFromLocalCookie();
    if (jwt) {
        return fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }).then((data) => {
            return data.id;
        });
    } else {
        return;
    }
};

// Get JWT token from cookies (client-side).
export const getTokenFromLocalCookie = () => {
    return Cookies.get('jwt');
};

// Get JWT token from cookies (server-side).
export const getTokenFromServerCookie = (req) => {
    if (!req.headers.cookie || '') {
        return undefined;
    }
    const jwtCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('jwt='));
    if (!jwtCookie) {
        return undefined;
    }
    const jwt = jwtCookie.split('=')[1];
    return jwt;
};

// Get user's id from cookies (server-side).
export const getIdFromServerCookie = (req) => {
    if (!req.headers.cookie || '') {
        return undefined;
    }
    const idCookie = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('id='));
    if (!idCookie) {
        return undefined;
    }
    const id = idCookie.split('=')[1];
    return id;
};
