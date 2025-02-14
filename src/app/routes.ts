import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { authGuard } from './auth/auth.guard';

const routeConfig: Routes = [
    { 
        path: '', redirectTo: 'login', pathMatch: 'full' // Agora a página inicial redireciona para o login
    },
    { 
        path: 'login', component: LoginComponent, title: 'Login'
    },
    { 
        path: 'register', component: RegisterComponent, title: 'Cadastro' 
    },
    { 
        path: 'home', component: HomeComponent, canActivate: [authGuard], title: 'Home Page' 
    },
    { 
        path: 'details/:id', component: DetailsComponent, canActivate: [authGuard], title: 'Details Page' 
    },
    { 
        path: '**', redirectTo: 'login' // Qualquer rota inválida também vai para o login
    }
]; 

export default routeConfig;


