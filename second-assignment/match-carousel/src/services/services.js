const MATCH_API_URL = 'https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074';

export const getSportById = (sportId) => {
    return getAllSports()
        .then((sports) => {
            return [sports.find(sport => sport._id === sportId)]
        })
}

export const getAllSports = () => {
    return getFullFeed()
        .then((fullFeed) => {
            return fullFeed.data
        })
}

export const getAllMatches = (sportId, max) => {
    const ourMatches = []

    let sports = sportId != null ? getSportById(sportId) : getAllSports()

    let numOfMatches = 0
    return sports.then((sports) => {
        sports.forEach((sport) => {
            sport.realcategories.forEach((category) => {
                category.tournaments.forEach((tournament) => {
                    tournament.matches.forEach((match) => {
                        if (++numOfMatches > max) {
                            return ourMatches
                        }

                        const ourMatch = {
                            realcategory: {
                                name: category.name
                            },
                            tournament: {
                                name: tournament.name,
                                seasontypename: tournament.seasontypename
                            },
                            status: {
                                _id: match.status._id,
                                name: match.status.name
                            },
                            _dt: {
                                time: match._dt.time,
                                date: match._dt.date
                            },
                            teams: {
                                home: {
                                    uid: match.teams.home.uid,
                                    abbr: match.teams.home.abbr,
                                    name: match.teams.home.name
                                },
                                away: {
                                    uid: match.teams.away.uid,
                                    abbr: match.teams.away.abbr,
                                    name: match.teams.away.name
                                }
                            },
                            match: {
                                result: {
                                    home: match.result.home,
                                    away: match.result.away
                                }
                            }
                        };

                        ourMatches.unshift(ourMatch)
                    })
                })
            })
        })
        return ourMatches
    })
}

export const getFullFeed = async () => {
    const response = await fetch(MATCH_API_URL);
    const jsonData = await response.json()
    return jsonData.doc.find(doc => doc.event === "event_fullfeed")
}