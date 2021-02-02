import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PlayersModule } from '../components/players/players.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
	CommonModule,
	PlayersModule
  ],
  exports: [HomeComponent ]
})
export class HomeModule { }
