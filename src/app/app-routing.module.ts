import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToolsComponent } from './tools/tools.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SolutionsServicesComponent } from './solutions-services/solutions-services.component';
import { StoriesComponent } from './stories/stories.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { OneClickDeploymentComponent } from './one-click-deployment/one-click-deployment.component';
import { MultiCloudDeploymentComponent } from './multi-cloud-deployment/multi-cloud-deployment.component';
import { IntegrationPatternsComponent } from './integration-patterns/integration-patterns.component';
import { AssesmentToolkitComponent } from './assesment-toolkit/assesment-toolkit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FaqComponent } from './faq/faq.component';


const routes: Routes = [
  {path:"home", component:HomeComponent, canActivate:[AuthGuardService]},
  {path:"tools", component:ToolsComponent, canActivate:[AuthGuardService]},
  {path:"solutionsServices", component:SolutionsServicesComponent, canActivate:[AuthGuardService]},
  {path:"stories", component:StoriesComponent, canActivate:[AuthGuardService]},
  {path:"bestPractices", component:BestPracticesComponent, canActivate:[AuthGuardService]},
  {path:"oneClickDeployment", component:OneClickDeploymentComponent, canActivate:[AuthGuardService]},
  {path:"multiCloudDeployment", component:MultiCloudDeploymentComponent, canActivate:[AuthGuardService]},
  {path:"integrationPatterns", component: IntegrationPatternsComponent, canActivate:[AuthGuardService]},
  {path:"assessmentToolkit", component:AssesmentToolkitComponent, canActivate:[AuthGuardService]},
  {path:"signin", component:SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"about", component:AboutComponent, canActivate:[AuthGuardService]},
  {path:"contact", component:ContactComponent, canActivate:[AuthGuardService]},
  {path:"faq", component:FaqComponent, canActivate:[AuthGuardService]},
  {path:"", redirectTo:"/signin", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
