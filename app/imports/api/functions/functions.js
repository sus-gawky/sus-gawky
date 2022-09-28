class Functions {
  static timeDisplay = (date) => {
    const currentTime = new Date();
    const hours = Math.floor((currentTime - date) / 1000 / 60 / 60);
    const minutes = Math.floor((currentTime - date) / 1000 / 60) % 60;
    let returnString = '';
    if (hours > 1) {
      returnString += `${hours} hours`;
    } else if (hours === 1) {
      returnString = `${hours} hour`;
    }
    if (minutes > 1) {
      returnString += ` and ${minutes} minutes`;
    } else if (minutes === 1) {
      returnString += ` and ${minutes} minute`;
    }
    returnString += ' ago';
    return returnString;
  };
}

export default Functions;
