import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MenumasterService } from './services/menumaster.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ToolsComponent } from './tools/tools.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SolutionsServicesComponent } from './solutions-services/solutions-services.component';
import { BestPracticesComponent } from './best-practices/best-practices.component';
import { StoriesComponent } from './stories/stories.component';
import { AuthService } from './services/auth.service';
import { AssesmentToolkitComponent } from './assesment-toolkit/assesment-toolkit.component';
import { IntegrationPatternsComponent } from './integration-patterns/integration-patterns.component';
import { OneClickDeploymentComponent } from './one-click-deployment/one-click-deployment.component';
import { MultiCloudDeploymentComponent } from './multi-cloud-deployment/multi-cloud-deployment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    ToolsComponent,
    AboutComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
    SolutionsServicesComponent,
    BestPracticesComponent,
    StoriesComponent,
    AssesmentToolkitComponent,
    IntegrationPatternsComponent,
    OneClickDeploymentComponent,
    MultiCloudDeploymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService,MenumasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
