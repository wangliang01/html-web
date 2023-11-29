"use strict";

var btn = document.querySelector('.btn');

btn.onclick = function _callee() {
  var itor;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(showDirectoryPicker());

        case 2:
          itor = _context.sent;
          //  const itor =  await showOpenFilePicker() 
          console.log(itor);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};