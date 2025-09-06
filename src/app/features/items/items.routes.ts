import { Routes } from '@angular/router';

export const ITEMS_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./pages/form/form.component').then(c => c.FormComponent)
            }
        ]
    }
];