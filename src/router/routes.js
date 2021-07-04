import store from '@/state/store'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'home' })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('auth/logOut')
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.push('/login')
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
            },
        },
    },
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/index')
    },
    {
        path: '/documents/',
        name: 'documents',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/documents/index'),
    },
    {
        path: '/documents/create',
        name: 'create-document',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/documents/create'),
    },
    {
        path: '/documents/:id',
        name: 'document',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/documents/show'),
    },
    {
        path:'/documents/:id/edit',
        name:'edit-document',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/dashboard/documents/edit'),
    },
    {
        path: '/users/',
        name: 'users',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/users/index'),
    },
    {
        path: '/users/create',
        name: 'create-user',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/users/create'),
    },
    {
        path: '/users/:id',
        name: 'user',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/users/show'),
    },
    {
        path:'/users/:id/edit',
        name:'edit-user',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/users/edit'),
    },
    {
        path:'/users/:id/documents',
        name:'user-documents',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/userdocuments/index'),
    },
    {
        path:'/users/:userID/documents/:documentID',
        name:'read-user-document',
        meta: {
            adminRequired: true,
        },
        component: () => import('../views/pages/dashboard/userdocuments/show'),
    }
]
