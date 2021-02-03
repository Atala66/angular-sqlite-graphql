const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('tennis.db');
const { graphqlHTTP } = require('express-graphql'); // responder peticiones GRAPH
const { buildSchema } = require('graphql'); // crear el schema de la entidad


const schema = buildSchema(
    `
	type Query {
	  players(offset:Int = 0, limit:Int = 10): [Player]
	  player(id:ID!): Player
	  rankings(rank:Int!): [Ranking]
	}
  
	type Player {
	  id: ID
	  first_name: String
	  last_name: String
	  hand: String
	  birthday: Int
	  country: String
	}
  
	type Ranking {
	  date: Int
	  rank: Int
	  player: Player
	  points: Int
	}`)

/**
 * 
 * @param { busqueda } queryString 
 * @param { devuelve uno o mas resultados } singleSearch 
 */
function queryData(queryString, singleSearch) {
    return new Promise((resolve, reject) => {
        var callback = (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        };

        if (singleSearch) db.get(queryString, callback);
        else db.all(queryString, callback);
    });
}

const app = express().use(cors());

const root = {
    players: args => { // cada una de estas se corresponde con los métodos de la QUERY
        return queryData(`SELECT * FROM players LIMIT ${args.offset}, ${args.limit}`, false);
    },
    player: args => {
        return queryData(`SELECT * FROM players WHERE id='${args.id}'`, true);

    },
    rankings: args => {
        return queryData(
            `SELECT r.date, r.rank, r.points,
				  p.id, p.first_name, p.last_name, p.hand, p.birthday, p.country
		  FROM players AS p
		  LEFT JOIN rankings AS r
		  ON p.id=r.player
		  WHERE r.rank=${args.rank}`,
            false
        ).then(rows =>
            rows.map(result => {
                return {
                    date: result.date,
                    points: result.points,
                    rank: result.rank,
                    player: {
                        id: result.id,
                        first_name: result.first_name,
                        last_name: result.last_name,
                        hand: result.hand,
                        birthday: result.birthday,
                        country: result.country
                    }
                };
            })
        );
    }
};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


const PORT = 4201;
app.listen(PORT, error => {
    if (error) { return console.log(error); }
    return console.log(`App listen on PORT ${PORT}`);
})