import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag'; // crea la query desde el front




const RANKINGS_QUERY = gql `
 query rankings($rank:Int!){
	 rankings(rank: $rank) {
		 date
		 rank
		 points
		 player {
			 first_name
			 last_name
			 birthday
		 }
	 }
 }
`;

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.less']
})
export class RankingsComponent implements OnInit {
	public rank: number = 1;
	public rankings: any[] = [];
	private query: QueryRef<any> | undefined

  constructor(
	  private apollo: Apollo
  ) { }

  ngOnInit(): void {
	  this.getRankings();
   }


   public getRankings() {
	   this.query = this.apollo.watchQuery<any>({
		   query: RANKINGS_QUERY,
		   variables: { rank: Math.round(this.rank) }
	   });
	   this.query.valueChanges.subscribe((result:any) => {
		   console.log('result', result);
		   if(result) {
			   this.rankings = result.data.rankings;
		   }
	   })
   }

}
