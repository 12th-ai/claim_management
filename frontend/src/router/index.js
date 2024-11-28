import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';

import AdminLayout from '../layout/AdminLayout.vue';


// Lazy-load layouts and pages
const AuthLayout = () =>
    import ('../layout/SubLayout/AuthLayout.vue');
const ProtectedLayout = () =>
    import ('../layout/SubLayout/ProtectedLayout.vue');
const PageNotFound = () =>
    import ('@/views/errorpage/404.vue');
const ComingSoonPage = () =>
    import ('@/views/errorpage/ComingSoonPage.vue');

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            component: AdminLayout, // Admin layout
            children: [
                // Auth layout as a child of AdminLayout
                {
                    path: '/',
                    component: AuthLayout,
                    children: [{
                            name: 'login',
                            path: '',
                            component: () =>
                                import ('@/views/auth/Login.vue'),
                        },
                        {
                            path: 'register',
                            name: 'register',
                            component: () =>
                                import ('@/views/auth/Register.vue'),
                        },
                        {
                            path: 'auth-logout',
                            name: 'auth-logout',
                            component: () =>
                                import ('@/views/auth/Logout.vue'),
                        },
                    ],
                },
                // Protected layout as a child of AdminLayout
                {
                    path: '/dashboard',
                    component: ProtectedLayout,
                    children: [{
                            path: 'profile',
                            name: 'profile',
                            component: () =>
                                import ('@/views/auth/Profile.vue'),
                        },
                        {

                            path: 'review-module',
                            name: 'review-module',
                            component: () =>
                                import ('@/views/permission/view_module.vue')

                        },
                        {

                            path: 'review-company',
                            name: 'review-company',
                            component: () =>
                                import ('@/views/permission/view_company.vue')

                        },
                        {
                            path: 'review-company/:id',
                            name: 'review-company_detail',
                            component: () =>
                                import ('@/views/permission/view_company_detail.vue'),
                            props: true, // Pass route params as props to the component
                        }
                    ],
                },
            ],
        },
        {
            path: '/comingsoon',
            component: ComingSoonPage,
        },
        { path: '/:catchAll(.*)', component: PageNotFound },
    ],
});


export default router;