import React  from 'react';
import Moment from 'react-moment';

export default class CalenderMoment extends React.Component {
  render() {
    const calendarStrings = {
      lastDay : '[Yesterday at] LT',
      sameDay : '[Today at] LT',
      nextDay : '[Tomorrow at] LT',
      lastWeek : '[last] dddd [at] LT',
      nextWeek : 'dddd [at] LT',
      sameElse : 'L LT'
    };

    return (
      <Moment calendar={calendarStrings}>
        {this.props.time}
      </Moment>
    );
  }
}
