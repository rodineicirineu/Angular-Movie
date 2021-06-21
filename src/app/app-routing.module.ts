import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';


const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch:"full"},
  {path: "home", component: HomeComponent},
  {path: ":id", component: OverviewComponent},
  {path: ":id/:id", component: OverviewComponent},
  {path: ":id/:id/:id", component: OverviewComponent},
  {path: ":id/:id/:id/:id", component: OverviewComponent},
  {path: "**", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
