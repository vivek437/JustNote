import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchiveComponent } from './home/archive/archive.component';
import { DashboardContainerComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RemindersComponent } from './home/reminders/reminders.component';
import { TaggedComponent } from './home/tagged/tagged.component';
import { TrashComponent } from './home/trash/trash.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardContainerComponent,
      },
      {
        path: 'reminder',
        component: RemindersComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
      {
        path: 'tagged/:label',
        component: TaggedComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
