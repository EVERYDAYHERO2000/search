"use strict";
window.substringSearch = function (options) {

  options = options || {}
  
  options.weight = options.weight || 100;
  options.multiply = options.multiply || true;
  options.similar = options.similar || [];

  let _this = this,
    results = [],
    proto = {
      weight: 0,
      search: '',
      res: '',
      in: -1,
      out: -1,
      length: 0
    };


  this.inString = function (substr, str) {

    substr = '' + substr;

    let wordsSearch = (substr.length) ? substr.trim().split(' ') : [''],
      words = (str.length) ? str.trim().split(' ') : [''],
      _res = {
        str: str
      },
      result = [];

    if (substr.length) {

      if (substr.indexOf(' ') + 1) {

        let fullMatch = search(substr, _res);

        if (fullMatch.weight) fullMatch.weight = fullMatch.weight * words.length;

        result = fullMatch;

      }

      for (var i = wordsSearch.length; i--;) {

        result = result.concat(search(wordsSearch[i], _res));

      }

      result = result.sort(compare);

    } else {

      let tempItem = copyObject(proto);
      tempItem.search = substr;
      tempItem.res = _res;

      result.push(tempItem);

    }

    return result;

  }

  this.inArray = function (substr, arr, getKey) {

    substr = '' + substr;

    let result = [];

    for (var i = arr.length; i--;) {

      let str = getKey(arr[i]),
        _res = {
          obj: arr[i],
          str: str,
          index: i
        },
        _result = _this.inString(substr, str);

      for (var r = _result.length; r--;) {
        
        if (_result[r]) _result[r].res = _res;

      }

      if (_result.length) result = result.concat(_result);

    }

    result = result.sort(compare);

    return result;

  }

  function search(substr, _res) {

    let search = substr.toLowerCase().trim(),
      str = _res.str,
      normalStr = str.toLowerCase(),
      pos = normalStr.indexOf(search),
      length = substr.length * (options.weight / 10),
      result = [];

    while (true) {

      let tempItem = copyObject(proto);
      tempItem.search = substr;
      tempItem.res = _res;

      let foundPos = normalStr.indexOf(search, pos);

      if (foundPos == -1) break;

      if (normalStr.length >= search.length && normalStr.indexOf(search, pos) + 1) {

        tempItem.weight += (normalStr.length / search.length * 100 > 50) ? options.weight + length : normalStr.length / search.length * options.weight + length;
        tempItem.in = foundPos;
        tempItem.out = tempItem.in + search.length;
        tempItem.length = search.length;

        if (normalStr.length === search.length) tempItem.weight += options.weight * 2;

        if (normalStr[0] === search[0]) tempItem.weight += options.weight;

      }

      result.push(tempItem);

      pos = foundPos + 1;

    }
    
    if (!options.multiply){
      result = result.sort(compare);
      result = [result[0]];
    }

    return result;
  }

  function compare(a, b) {

    a = a.weight;
    b = b.weight;

    let comparison = 0;

    if (a < b) {
      comparison = 1;
    } else if (a > b) {
      comparison = -1;
    }
    return comparison;
  }

  function copyObject(src) {
    return Object.assign({}, src);
  }

  return this;

};