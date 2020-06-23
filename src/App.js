import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faCalendarAlt, faBackward } from '@fortawesome/free-solid-svg-icons';

import Calendar from 'react-calendar';
import './assets/styles/Calendar.css';

import League from './components/League';
import Loading from './components/Loading';
import DateNavBarBtn from './components/DateNavBarBtn';
import TickClock from './components/TickClock';
import {
  rearrangeMatches,
  getDayFromToday,
  getDateFromToday,
  isToday,
  getGameDay,
  formatDateForUrl
} from './utilities/utilities';
import reloader from './assets/images/reloader-24.gif';
import Footer from './components/Footer';
import { fetchMatches } from './api/footballData';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      leagues: [],
      error: null,
      navBtnId: 0, // possible values (-2, -1, 0 = today, 1, 2)
      calendarDate: new Date(),
      isShowingCalendar: false,
      usingCalendar: false
    };
    this.calendarRef = React.createRef();
  }

  componentDidMount() {
    this.refresh();
    this.TimerID = setInterval(() => this.refresh(), 30000);
    document.addEventListener('mousedown', this.clickOutsideCalendar);
  }

  componentWillUnmount() {
    clearInterval(this.TimerID);
    document.removeEventListener('mousedown', this.clickOutsideCalendar);
  }

  refresh = () => {
    this.fetchLeaguesMatches();
  };

  fetchLeaguesMatches = async (date = null) => {
    const resp = await fetchMatches(date);

    if (resp && resp.status === 200) {
      const { matches } = resp.data;
      console.log('fetch data Successfully....');
      const res = rearrangeMatches(matches);

      this.setState({
        leagues: res.leagues,
        error: null,
        isLoading: false
      });
    } else {
      this.setState({ error: 'Network Error! Please, be patient. App will reload.', isLoading: false });
    }
  };

  setNewDate = (dayCount) => {
    const A_DAY = 86400000; // 1000mills * 60s * 60m * 24hr;
    const date = getDateFromToday(A_DAY * dayCount);
    this.fetchLeaguesMatches(date);
    this.setState({
      isLoading: true, navBtnId: dayCount
    });

    if (!isToday(date)) {
      clearInterval(this.TimerID);
    } else {
      this.TimerID = setInterval(() => this.refresh(), 10000);
    }
  };

  setNewDateFromCalendar = (newDate) => {
    const date = formatDateForUrl(newDate);
    this.fetchLeaguesMatches(date);
    this.setState({
      isLoading: true
    });

    if (!isToday(date)) {
      clearInterval(this.TimerID);
    } else {
      this.TimerID = setInterval(() => this.refresh(), 10000);
    }
  };

  onChangeCalendar = (date) => {
    this.setState({
      calendarDate: date,
      isShowingCalendar: false,
      usingCalendar: true
    });
    this.setNewDateFromCalendar(date);
  }

  showCalendar = () => {
    this.setState({ isShowingCalendar: true });
  }

  backToMainview = () => {
    const { navBtnId } = this.state;

    this.setState({
      usingCalendar: false
    });
    this.setNewDate(navBtnId);
  }

  clickOutsideCalendar = (e) => {
    const { isShowingCalendar } = this.state;
    if (!isShowingCalendar) return;

    if (this.calendarRef && !this.calendarRef.current.contains(e.target)) {
      this.setState({ isShowingCalendar: false, usingCalendar: false });
    }
  }

  render() {
    const {
      leagues, isLoading, error, navBtnId,
      calendarDate, isShowingCalendar, usingCalendar
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
          date={dayId === 0 ? 'Today' : getDayFromToday(dayId)}
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
        <div className="date-nav-bar">
          {usingCalendar ? (
            <>
              <button
                type="button"
                className="date-nav-bar-btn back-btn"
                onClick={this.backToMainview}
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <div className="selected-date">
                {getGameDay(calendarDate)}
              </div>
            </>
          ) :
            <div className="nav-btns">{navBarBtns}</div>}
          <button
            type="button"
            className="date-nav-bar-btn calendar-icon"
            onClick={this.showCalendar}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
        </div>
        {error ? (
          <div className="error">
            {error}
            {navBtnId === 0 ? <img src={reloader} alt="Reloading App..." /> : ''}
          </div>
        ) : null}
        <div className="container">
          {!isLoading ?
            (leaguesComponent.length && leaguesComponent) || <p className="center-text">No match for today</p> :
            <Loading />}
        </div>
        <Footer />
        {isShowingCalendar &&
        (
          <div className="overlay">
            <div ref={this.calendarRef}>
              <Calendar
                onChange={this.onChangeCalendar}
                value={calendarDate}
                className="calendar"
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
