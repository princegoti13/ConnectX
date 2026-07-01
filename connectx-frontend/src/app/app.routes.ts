import { Routes } from '@angular/router';

import { Landing } from './features/landing/landing/landing';

import { AuthLayout } from './layouts/auth-layout/auth-layout';

import { MainLayout } from './layouts/main-layout/main-layout';

import { Login } from './features/auth/login/login';

import { Register } from './features/auth/register/register';

import { Dashboard } from './features/home/dashboard/dashboard';

import { Friends } from './features/friends/friends/friends';

import { Chat } from './features/chat/chat/chat';

import { Profile } from './features/profile/profile/profile';

import { Settings } from './features/settings/settings/settings';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',

    component: Landing,
  },

  {
    path: '',

    component: AuthLayout,

    children: [
      {
        path: 'login',

        component: Login,
      },

      {
        path: 'register',

        component: Register,
      },
    ],
  },

  {
    path: '',

    component: MainLayout,

    canActivate: [authGuard],

    children: [
      {
        path: 'dashboard',

        component: Dashboard,
      },

      {
        path: 'friends',

        component: Friends,
      },

      {
        path: 'chat',

        component: Chat,
      },

      {
        path: 'profile',

        component: Profile,
      },

      {
        path: 'settings',

        component: Settings,
      },
    ],
  },

  {
    path: '**',

    redirectTo: '',
  },
];
