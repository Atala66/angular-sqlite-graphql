import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersComponent } from './players.component';



@NgModule({
  declarations: [PlayersComponent],
  imports: [
	CommonModule,
  ],
  exports: [PlayersComponent]
})
export class PlayersModule { }
