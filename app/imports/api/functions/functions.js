class Functions {
  static timeDisplay = (date) => {
    const currentTime = new Date();
    const hours = Math.floor((currentTime - date) / 1000 / 60 / 60);
    const minutes = Math.floor((currentTime - date) / 1000 / 60) % 60;
    let returnString = '';
    if (hours > 0) {
      returnString += `${hours} hour`;
    }
    if (hours > 1) {
      returnString += 's';
    }
    if (minutes > 0) {
      if (hours > 0) {
        returnString += ' and';
      }
      returnString += ` ${minutes} minute`;
    }
    if (minutes > 1) {
      returnString += 's';
    }
    returnString += ' ago';
    if (hours === 0 && minutes === 0) {
      returnString = 'now';
    }
    return returnString;
  };

  static avPoints = (zipCode, users) => {
    let result = users.filter(user => user.zipCode === zipCode);
    result = result.map((user) => user.points).reduce((a, b) => a + b, 0) / result.length;
    return result;
  };

  static avFoodScore = (zipCode, users) => {
    let result = users.filter(user => user.zipCode === zipCode);
    result = result.map((user) => user.foodScore).reduce((a, b) => a + b, 0) / result.length;
    return result;
  };

  static avMiscScore = (zipCode, users) => {
    let result = users.filter(user => user.zipCode === zipCode);
    result = result.map((user) => user.miscScore).reduce((a, b) => a + b, 0) / result.length;
    return result;
  };

  static avTransportationScore = (zipCode, users) => {
    let result = users.filter(user => user.zipCode === zipCode);
    result = result.map((user) => user.transportationScore).reduce((a, b) => a + b, 0) / result.length;
    return result;
  };

  static avFullScore = (zipCode, users) => {
    let result = users.filter(user => user.zipCode === zipCode);
    result = result.map((user) => user.fullScore).reduce((a, b) => a + b, 0) / result.length;
    return result;
  };

  static topFoodScores = (users) => users.sort(function (a, b) { return b.foodScore - a.foodScore; }).slice(0, 10);

  static topTravelScores = (users) => users.sort(function (a, b) { return b.transportationScore - a.transportationScore; }).slice(0, 10);

  static topTotalScores = (users) => users.sort(function (a, b) { return b.fullScore - a.fullScore; }).slice(0, 10);
}

export default Functions;
