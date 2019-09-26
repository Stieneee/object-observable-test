module.exports = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].cast.push('Nicholas Cage');
    data[i].sub = {};
    data[i].sub.deep = {};
    data[i].sub.deep.x = [];
  }
};
