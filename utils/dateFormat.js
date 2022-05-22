module.exports = (datetime) => {
  return new Date(datetime).toLocalString('en-US', {
    hourCycle: 'h12',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
