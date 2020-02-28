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


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"tools", component:ToolsComponent},
  {path:"solutionsServices", component:SolutionsServicesComponent},
  {path:"stories", component:StoriesComponent},
  {path:"bestPractices", component:BestPracticesComponent},
  {path:"oneClickDeployment", component:OneClickDeploymentComponent},
  {path:"multiCloudDeployment", component:MultiCloudDeploymentComponent},
  {path:"integrationPatterns", component: IntegrationPatternsComponent},
  {path:"assessmentToolkit", component:AssesmentToolkitComponent},
  {path:"signin", component:SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"about", component:AboutComponent},
  {path:"contact", component:ContactComponent},
  {path:"", redirectTo:"/home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
