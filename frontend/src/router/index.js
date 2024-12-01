import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";

import AdminLayout from "../layout/Admin/AdminLayout.vue";
import Insurance_Layout from "../layout/Insurance_company/Insurance_Layout.vue";
import LossAccessorLayout from "../layout/LossAccessor/LossAccessorLayout.vue";


// Lazy-load layouts and pages
const AuthLayout = () =>
    import ("../layout/Admin/AuthLayout.vue");
const ProtectedLayout = () =>
    import ("../layout/Admin/ProtectedLayout.vue");

// Lazy-load layouts and pages
const Insurance_Auth = () =>
    import ("../layout/Insurance_company/Insurance_Auth.vue");
const Protected_insurance = () =>
    import ("../layout/Insurance_company/Protected_Insurance.vue");


const LossAccessor_Auth = () =>
    import ("../layout/LossAccessor/LossAccessorAuthLayout.vue");
const Protected_LossAccessor = () =>
    import ("../layout/LossAccessor/ProtectedAccessor.vue");
const PageNotFound = () =>
    import ("@/views/errorpage/404.vue");

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [


        // admin dahboard declaration and use start `
        {
            path: "/admin",
            component: AdminLayout,
              children: [{
                    path: "",
                    redirect: { name: "login" }, // Redirect to login as default
                },
                     {
                    path: "/",
                    component: AuthLayout,
                    children: [{
                            path: "",
                            name: "login",
                            component: () =>
                                import ("@/views/Admin/auth/Login.vue"),
                        },
                        {
                            path: "register",
                            name: "register",
                            component: () =>
                                import ("@/views/Admin/auth/Register.vue"),
                        },
                    ],
                },
                {
                    path: "dashboard",
                    component: ProtectedLayout,
                    children: [{
                            path: "review-module",
                            name: "review-module",
                            component: () =>
                                import ("@/views/Admin/permission/View_module.vue"),
                        },
                        {
                            path: "review-company",
                            name: "review-company",
                            component: () =>
                                import ("@/views/Admin/permission/View_company.vue"),
                        },
                        {
                            path: "review-company/:id",
                            name: "review-company_detail",
                            component: () =>
                                import ("@/views/Admin/permission/View_company_detail.vue"),
                            props: true,
                        },
                    ],
                },
            ],
        },

        {


            path: '/insurance_company',
            component: Insurance_Layout,
            children: [

                // Auth layout as a child of AdminLayout
                {
                    path: "/insurance_company",
                    component: Insurance_Auth,
                    children: [{
                        name: "insurancelogin",
                        path: "",
                        component: () =>
                            import ("@/views/insurance_company/auth/Login.vue"),
                    }],
                },

                {
                    path: "/insurance_company/dashboard",
                    component: Protected_insurance,
                    children: [{
                            path: "review-accessor",
                            name: "review-accessor",
                            component: () =>
                                import ("@/views/insurance_company/loss_accessor/Review_Accessor.vue"),
                        },

                        {
                            path: "quotations",
                            name: "review-quotations",
                            component: () =>
                                import ("@/views/insurance_company/Quotations/Review_quotation.vue"),
                        },
                        {
                            path: "quotations/:id",
                            name: "review-quotation_detail",
                            component: () =>
                                import ("@/views/insurance_company/Quotations/View_Quotation_detail.vue"),
                        },



                    ],
                }

            ],

        },



        {


            path: '/LossAccessor',
            component: LossAccessorLayout,
            children: [

                // Auth layout as a child of AdminLayout
                {
                    path: "/LossAccessor",
                    component: Insurance_Auth,
                    children: [{
                        name: "LossAccessorLogin",
                        path: "",
                        component: () =>
                            import ("@/views/LossAccessor/auth/Login.vue"),
                    }],
                },

                {
                    path: "/LossAccessor/dashboard",
                    component: Protected_LossAccessor,
                    children: [

                        {
                            path: "quotations",
                            name: "review-accessor-quotations",
                            component: () =>
                                import ("@/views/LossAccessor/Quotations/Review_quotation.vue"),
                        },
                        {
                            path: "quotations/:id",
                            name: "review-Accessor-quotation_detail",
                            component: () =>
                                import ("@/views/LossAccessor/Quotations/View_Quotation_detail.vue"),
                        },

                        {
                            path: "quotations/report/:id",
                            name: "review-Accessor-report",
                            component: () =>
                                import ("@/views/LossAccessor/Quotations/Quotation_report.vue"),
                        },
                    ],
                }

            ],

        },










        // insurance_company router declration 





        { path: "/:catchAll(.*)", component: PageNotFound },
    ],
});

export default router;
