import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MusicaComponent } from './components/musica/musica.component';
import { CineComponent } from './components/cine/cine.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path:'inicio', component: InicioComponent},
    {path:'musica', component: MusicaComponent},
    {path:'cine', component: CineComponent},
    {path:'cine/:genero', component: CineComponent},
    {path:'libros', component: LibrosComponent},
    {path:'podcasts', component: PodcastsComponent},
    {path:'contacto', component: ContactoComponent},
    {path:'**', component: ErrorComponent}

];
