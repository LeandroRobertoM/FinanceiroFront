import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'products',
        icon: 'fa fa-box-open',
        label: 'Produtos',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Nota Entrada',
                items: [
                    {
                        routeLink: 'products/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'products/level2.2',
                        label: 'Level 2.2',
                        items: [
                            {
                                routeLink: 'products/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'products/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ]
            },
            {
                routeLink: 'products/level1.2',
                label: 'Level 1.2',
            }
        ]
    },
    {
        routeLink: 'coupens',
        icon: 'fas fa-hand-holding-usd',
        label: 'Financeiro',
        items: [
            {
                routeLink: 'Sistema/formulario',
                label: 'Sistema Financeiro'
            },
            {
                routeLink: 'Categoria/formulario',
                label: 'Categoria'
            },
            {
                routeLink: 'Despesa/formulario',
                label: 'Despesa'
            },
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fal fa-file',
        label: 'Pages',
        items: [
            {
                routeLink: 'Pages/pages',
                label: 'pages'
            },
        ]
    },
   /* {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
    },*/
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Relatórios'
    },
    {
        routeLink: 'settings',
        icon: 'fal fa-cog',
        label: 'Configuração',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Profile'
            },
            {
                routeLink: 'settings/customize',
                label: 'Customize'
            }
        ]
    },
];