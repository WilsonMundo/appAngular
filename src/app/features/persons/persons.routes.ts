import { Routes } from '@angular/router';

export const PERSONS_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                loadComponent: () =>
                    import('./pages/list/list.component').then(c => c.ListComponent)
            },
            {
                path: '',
                loadComponent: () =>
                    import('./pages/form/form.component').then(c => c.FormComponent)
            },
            {
                path: ':id',
                loadComponent: () =>
                    import('./pages/detail/detail.component').then(c => c.DetailComponent)
            }
        ]
    }
];