import * as Utils from '../utils';
var names = [
  'Estell Rockhill',
  'Eliz Wahlstrom',
  'Nadia Kierstead',
  'Brittny Bowersox',
  'Keli Sobotka',
  'Otha Eves',
  'Orpha Kinsel',
  'Aurora Sprinkle',
  'Stewart Slavin',
  'Jolie Garrison',
  'Twila Reames',
  'Billie Mikus',
  'Peter Brunt',
  'Marcell Luzier',
  'Brad Becher',
  'Dawn Siqueiros',
  'Felton Esperanza',
  'Larissa Riddles',
  'Lavone Ton',
  'Hiram Netzer'
];

const invoicesTestDataHelper = function() {
  var result = [];
  for (let i = 0; i < names.length; i++) {
    var inv = {
      id: Utils.randomString(16),
      clientName: names[i],
      amount: Utils.getRandomInt(-5000, 10000),
      status: 0
    };
    //
    var d = new Date();
    d.setDate(d.getDate() - Utils.getRandomInt(0, 40));
    inv.created = d.getTime();
    result.push(inv);
  }
  // sort by date in descending order
  return result.sort((a, b) => (a.created < b.created ? 1 : -1));
};

export default invoicesTestDataHelper;
