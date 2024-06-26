import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'Compras',
        icon: 'fa fa-box-open',
        label: 'Compras',
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
                routeLink: 'Sistema/tabela',
                label: 'Sistema Financeiro'
            },
            {
                routeLink: 'Categoria/tabela',
                label: 'Categoria'
            },
            {
                routeLink: 'Despesa/tabela',
                label: 'Despesa'
            },
        ]
    },
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
                routeLink: 'Usuario/tabela',
                label: 'Usuarios'
            },
            {
                routeLink: 'settings/Banco',
                label: 'Banco'
            }
        ]
    },
];