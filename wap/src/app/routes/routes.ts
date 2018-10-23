import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {FindPwdComponent} from './login/find-pwd/find-pwd.component';
import {TabComponent} from './tab/tab.component';

export const routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    // {path: 'admin', canActivate: [LoginService], loadChildren: './admin/admin.module#AdminModule'},
    {path: 'login', component: LoginComponent},
    {path: 'find-pwd', component: FindPwdComponent},
    {
        path: 'tab', 
        component: TabComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {path:'home', loadChildren: '../module/home/home.module#HomeModule'},
            {path: 'work-order', loadChildren: '../module/work-order/work-order.module#WorkOrderModule'},
        ]
    },
    {path: '**', redirectTo: 'login'}
];
