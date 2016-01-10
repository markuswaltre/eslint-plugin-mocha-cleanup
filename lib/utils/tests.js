var combos = [
  {SUITESKIP: 'describe.skip', TESTSKIP: 'it.skip', SUITE: 'describe', TEST: 'it'},
  {SUITESKIP: 'xcontext', TESTSKIP: 'it.skip', SUITE: 'context', TEST: 'it'},
  {SUITESKIP: 'xcontext', TESTSKIP: 'xspecify', SUITE: 'context', TEST: 'specify'},
  {SUITESKIP: 'xdescribe', TESTSKIP: 'xit', SUITE: 'describe', TEST: 'it' },
  {SUITESKIP: 'xcontext', TESTSKIP: 'xit', SUITE: 'context', TEST: 'it' },
  {SUITESKIP: 'suite.skip', TESTSKIP: 'test.skip', SUITE: 'suite', TEST: 'test' }
];

function replaceAllIn(str, replacers) {
  Object.keys(replacers).forEach(function (key) {
    str= str.replace(new RegExp(key, 'g'), replacers[key]);
  });
  return str;
}

module.exports = {

  getCombos: function (templates) {
    var toReturn = [];
    var stringifies = [];
    templates.forEach(function (template) {
      combos.forEach(function (combo) {
        var c = JSON.parse(JSON.stringify(template));
        c.code = replaceAllIn(c.code, combo);
        if (c.errors) {
          c.errors.forEach(function(error) {
            if (error.message) {
              error.message = replaceAllIn(error.message, combo);
            }
          });
        }

        // no duplicates
        var stringified = JSON.stringify(c);
        if (stringifies.indexOf(stringified) === -1) {
          toReturn.push(c);
          stringifies.push(stringified);
        }
      });
    });
    return toReturn;
  }

};