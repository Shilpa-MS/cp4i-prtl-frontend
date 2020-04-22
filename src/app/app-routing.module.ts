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
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:"home" , canActivate:[AuthGuardService], component:HomeComponent},
  {path:"tools" , canActivate:[AuthGuardService], component:ToolsComponent},
  {path:"solutionsServices" , canActivate:[AuthGuardService], component:SolutionsServicesComponent},
  {path:"stories" , canActivate:[AuthGuardService], component:StoriesComponent},
  {path:"bestPractices" , canActivate:[AuthGuardService], component:BestPracticesComponent},
  {path:"oneClickDeployment" , canActivate:[AuthGuardService], component:OneClickDeploymentComponent},
  {path:"multiCloudDeployment" , canActivate:[AuthGuardService], component:MultiCloudDeploymentComponent},
  {path:"integrationPatterns" , canActivate:[AuthGuardService], component: IntegrationPatternsComponent},
  {path:"assessmentToolkit" , canActivate:[AuthGuardService], component:AssesmentToolkitComponent},
  {path:"signin", component:SignInComponent},
  {path:"signup", component:SignUpComponent},
  {path:"about" , canActivate:[AuthGuardService], component:AboutComponent},
  {path:"contact" , canActivate:[AuthGuardService], component:ContactComponent},
  {path:"faq" , canActivate:[AuthGuardService], component:FaqComponent},
  {path:"admin", canActivate:[AuthGuardService], component:AdminComponent},
  {path:"", redirectTo:"/signin", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
