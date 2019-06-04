const getTimeString = (lastUpdate) => {
  const timeDiff = (+new Date()) - lastUpdate;
  let timeString = '';

  const timeSpan = {
    oneMin: 60000,
    oneHour: 3600000,
    oneDay: 86400000
  };

  if ( timeDiff < timeSpan.oneMin ) {
    timeString = 'seconds ago';
  }
  else if ( timeDiff < timeSpan.oneHour ) {
    const minutes = Math.floor(timeDiff / timeSpan.oneMin);
    const minStr = minutes === 1 ? 'minute' : 'minutes';
    timeString = `${minutes} ${minStr} ago`;
  }
  else if ( timeDiff < timeSpan.oneDay ) {
    const hours = Math.floor(timeDiff / timeSpan.oneHour);
    const hourStr = hours === 1 ? 'hour' : 'hours';
    timeString = `${hours} ${hourStr} ago`;
  }
  else if ( lastUpdate < 0 ) { // Value not yet retrieved from server
    timeString = '...';
  }
  else {
    timeString = '+1 day';
  }

  return timeString;
}

export default getTimeString;
