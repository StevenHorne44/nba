from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app) 
api = Api(app)

class UserModel(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    TeamName = db.Column(db.String(80), unique=True, nullable=False)
    Players = db.Column(db.Text, nullable=False)  # store list of player objects

    def get_players(self):
        return json.loads(self.Players)

    def set_players(self, players_list):
        self.Players = json.dumps(players_list)



team_args = reqparse.RequestParser()
team_args.add_argument('TeamName', type=str, required=True, help="Name cannot be blank")
team_args.add_argument('Players', type=list, location='json', required=True, help="Players cannot be blank")


userFields = {
    'id':fields.Integer,
    'TeamName':fields.String,
    'Players':fields.Raw,
    
}

class Teams(Resource):
    def get(self):
        teams = UserModel.query.all()
        return  [
            {"Id": t.id, "TeamName": t.TeamName, "Players": t.get_players()} 
            for t in teams
        ]

    def post(self):
        args = team_args.parse_args()
        team = UserModel(TeamName=args["TeamName"])
        team.set_players(args["Players"])
        db.session.add(team)
        db.session.commit()
        return {"TeamName": team.TeamName, "Players": team.get_players()}, 201


class Team(Resource):
    def get(self, id):
        team = UserModel.query.filter_by(id=id).first()
        if not team:
            abort(404, message="Team not found")
        return {"TeamName": team.TeamName, "Players": team.get_players()}

    def patch(self, id):
        args = team_args.parse_args()
        team = UserModel.query.filter_by(id=id).first()
        if not team:
            abort(404, message="Team not found")
        team.TeamName = args["TeamName"]
        team.set_players(args["Players"])
        db.session.commit()
        return {"TeamName": team.TeamName, "Players": team.get_players()}

    def delete(self, id):
        team = UserModel.query.filter_by(id=id).first()
        if not team:
            abort(404, message="Team not found")
        db.session.delete(team)
        db.session.commit()
        return {"message": "Team deleted successfully"}
    
class EspnTeams(Resource):
    def get(self):
        try:
            headers = {"User-Agent": "Mozilla/5.0"}
            response = requests.get(
                'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams',
                headers=headers,
                timeout=10
            )
            response.raise_for_status()  
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}, 500
        
class EspnPlayerStats(Resource):
    def get(self, athlete_id):
        try:
            headers = {"User-Agent": "Mozilla/5.0"}
            url = f'https://site.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/{athlete_id}/stats'
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}, 500
    
api.add_resource(Teams, '/api/teams/')
api.add_resource(Team, '/api/teams/<int:id>')
api.add_resource(EspnTeams, '/api/espn-teams/')
api.add_resource(EspnPlayerStats, '/api/player-stats/<string:athlete_id>')


@app.route('/')
def home():
    return '<h1>Flask REST API</h1>'

if __name__ == '__main__':
    app.run(debug=True)