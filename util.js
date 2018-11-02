module.exports = {
  getPorts: function() {
    var args = process.argv.slice(2);
    if(args === undefined || args[0] === undefined) {
      return (process.env.PORTS || '5000').split(',')
    } else {
      return args[0].split(',');
    }
  },
  getPort: function() {
    var args = process.argv.slice(2);
    if(args === undefined || args[0] === undefined) {
      return (process.env.PORT || '5000')
    } else {
      return parseInt(args[0]);
    }
  }
}
