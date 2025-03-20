import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},

    {path:'',loadComponent:()=>import('./layouts/main-layout/main-layout.component').then((c)=>c.MainLayoutComponent),
      canActivate:[authGuard],
        children:[
          {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent),title:'Home'},
          {path:'gallery',loadComponent:()=>import('./pages/gallery/gallery.component').then((c)=>c.GalleryComponent),title:'Gallery'},
          {path:'notes',loadComponent:()=>import('./pages/notes/notes.component').then((c)=>c.NotesComponent),title:'Notes'},
          
    ]},

    {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),canActivate:[loggedGuard],
        children:[
          {path:'register',loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
          {path:'login',loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent),title:'Login'},
          {path:'**',loadComponent:()=>import('./pages/not-found/not-found.component').then((c)=>c.NotFoundComponent),title:'Not Found'}
    ]},
];
