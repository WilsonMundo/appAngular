import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main.layout/main.layout.component';


export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'persons',
                loadChildren: () =>
                    import('../persons/persons.routes').then(m => m.PERSONS_ROUTES)
            },
            {
                path: 'items',
                loadChildren: () =>
                    import('../items/items.routes').then(m => m.ITEMS_ROUTES)
            },
            // {
            //     path: 'orders',
            //     loadChildren: () =>
            //         import('../orders/orders.routes').then(m => m.ORDERS_ROUTES)
            // }
        ]
    }
];