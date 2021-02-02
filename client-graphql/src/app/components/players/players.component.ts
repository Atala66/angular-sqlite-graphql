import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef, Subscription } from 'apollo-angular';
import gql from 'graphql-tag'; // crea la query desde el front

/**
 * @TODO - extraer las queries e importarlo
 *  */
const PLAYERS_QUERY = gql`
  query players($offset:Int) {
    players(offset: $offset, limit: 10) {
      id
      first_name
      last_name
      hand
      birthday
      country
    }
  }
`;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.less'],
})
export class PlayersComponent implements OnInit {
  public page = 0;
  public players: any[] = [];
  private query: QueryRef<any> | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  public getPlayers() {
    this.query = this.apollo.watchQuery<any>({
      query: PLAYERS_QUERY,
      variables: { offset: 10 * this.page },
    });
    this.query.valueChanges.subscribe((result: any) => {
      if (result) {
        this.players = result.data.players;
      }
    });
  }

  public nextPage() {
    this.page++;
    this.update();
  }

  public prevPage() {
    if (this.page > 0) this.page--;
    this.update();
  }

  private update() {
	this.query?.refetch({ offset: 1 * this.page});
  }
}
