import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';

import League from './components/League';
import Loading from './components/Loading';
import DateNavBarBtn from './components/DateNavBarBtn';
import TickClock from './components/TickClock';
import {
  rearrangeMatches,
  // getGameDay,
  getDay,
  getDate,
  isToday
} from './utilities/utilities';
import reloader from './assets/images/reloader-24.gif';
import Footer from './components/Footer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      leagues: [],
      error: null,
      navBtnId: 0, // possible values (-2, -1, 0 = today, 1, 2)
      fetchUrl: 'https://api.football-data.org/v2/matches'
    };
  }

  componentDidMount() {
    this.refresh();
    this.TimerID = setInterval(() => this.refresh(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.TimerID);
  }

  refresh = () => {
    const { fetchUrl } = this.state;
    this.fetchLeagueMatches(fetchUrl);
  };

  fetchLeagueMatches = (url) => {
    const options = {
      headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN }
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((response) => {
        console.log('fetch data Successfully....');
        const res = rearrangeMatches(response.matches);

        this.setState({
          leagues: res.leagues,
          error: null,
          isLoading: false
        });
      })
      .catch((err) => {
        this.setState({ error: err, isLoading: false });
      });
  };

  setNewDate = (dayCount) => {
    const A_DAY = 86400000; // 1000mills * 60s * 60m * 24hr;
    const date = getDate(A_DAY * dayCount);
    const url = `https://api.football-data.org/v2/matches?dateFrom=${date}&dateTo=${date}`;
    this.fetchLeagueMatches(url);
    this.setState({
      fetchUrl: url, isLoading: true, navBtnId: dayCount, error: null
    });

    if (!isToday(date)) {
      clearInterval(this.TimerID);
    } else {
      this.TimerID = setInterval(() => this.refresh(), 10000);
    }
  };

  render() {
    const {
      leagues, isLoading, error, navBtnId
    } = this.state;
    const leaguesComponent = leagues
      .sort((a, b) => a.competitionId - b.competitionId)
      .map((league) => (
        <League
          key={league.competitionId}
          league={league}
          competitionId={league.competitionId}
          competitionName={league.competitionName}
          matches={league.matches}
          matchday={league.matchday}
          rand={league.rand}
        />
      ));

    let navBarBtns = [];
    for (let i = 0; i < 5; i++) {
      const dayId = i - 2;
      let classes = 'date-nav-bar-btn';
      classes += navBtnId === dayId ? ' current-day-btn' : '';
      navBarBtns.push(
        <DateNavBarBtn
          styleClasses={classes}
          btnClick={() => this.setNewDate(dayId)}
          date={dayId === 0 ? 'Today' : getDay(dayId)}
          key={i}
        />
      );
    }
    return (
      <>
        <div className="app-header">
          <span className="app-name">
            F
            <FontAwesomeIcon icon={faFutbol} />
            <FontAwesomeIcon icon={faFutbol} />
            tball Score
          </span>
          <TickClock />
        </div>
        <div className="date-nav-bar">{navBarBtns}</div>
        {error ? (
          <div className="error">
            Error! Check your internet connection.
            {navBtnId === 0 ? <img src={reloader} alt="Reloading App..." /> : ''}
          </div>
        ) : null}
        <div className="container">
          {!isLoading ? leaguesComponent : <Loading />}
        </div>
        <Footer />
      </>
    );
  }
}
