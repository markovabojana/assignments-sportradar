import React from "react";
import "./Card.css"

export default class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        realcategory: {
            name: ''
        },
        status: {
            _id: 0,
            name: ''
        },
        teams: {
            home: {
                uid: 0,
                abbr: '',
                name: ''
            },
            away: {
                uid: 0,
                abbr: '',
                name: ''
            }
        },
        tournament: {
            name: '',
            seasontypename: ''
        },
        _dt: {
            date: '',
            time: ''
        },
        match: {
            result: {
                home: 0,
                away: 0
            }
        }
    }

    render() {
        const { tournament, realcategory, match, teams, status, _dt } = this.props;

        let resultHtml

        if (status._id === 0) {
            resultHtml = <div className="match-dt">
                <p>VS</p>
                <p>{_dt.time}</p>
                <p>{_dt.date}</p>
            </div>
        } else {
            resultHtml = <div className="result">
                {match.result.home}:{match.result.away}
            </div>
        }

        return (
            <div>
                <div className="bg-opacity">
                    <div className="match-card">
                        <h2>{tournament.name} - {tournament.seasontypename}</h2>
                        <h4>{realcategory.name}</h4>
                        <div className="row match-countries">
                            <div className="country">
                                <img src={`http://ls.betradar.com/ls/crest/big/${teams.home.uid}.png`} alt={`Flag of ${teams.home.name}`}/>
                                <h1>{teams.home.name}</h1>
                            </div>
                            { resultHtml }
                            <div className="country">
                                <img src={`http://ls.betradar.com/ls/crest/big/${teams.away.uid}.png`} alt={`Flag of ${teams.away.name}`}/>
                                <h1>{teams.away.name}</h1>
                            </div>
                        </div>
                        <div className="row match-status">
                            <span className={
                                status._id === 0 ? 'notstarted' : status._id === 100 ? 'ended' : 'live'
                            }>{status.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
