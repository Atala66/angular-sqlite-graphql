import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingsComponent } from './components/rankings/rankings.component';
import { PlayersComponent } from './components/players/players.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'player',
		component: PlayerComponent,
		loadChildren: () => import('../app/components/player/player.module').then(m => m.PlayerModule)

	}, 
	{
		path: 'players',
		component: PlayersComponent,
		loadChildren: () => import('../app/components/players/players.module').then(m => m.PlayersModule)

	}, 
	{
		path: 'rankings',
		component: RankingsComponent,
		loadChildren: () => import('../app/components/rankings/rankings.module').then(m => m.RankingsModule)

	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
