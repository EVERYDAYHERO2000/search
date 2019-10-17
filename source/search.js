"use strict";
window.substringSearch = function (options) {

  options = options || {

  };

  let _this = this,
      results = [],
      proto ={
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
        result = [];

    if (substr.length) {

        if (str.indexOf(' ') + 1){

          let fullMatch = search(substr, str);

          if (fullMatch.weight) fullMatch.weight = fullMatch.weight * words.length;

          result = fullMatch;

        }
      
      

      for (var i = wordsSearch.length; i--;) {

        result = result.concat(search(wordsSearch[i], str));

      }

      result = result.sort(compare);

    } else {
      
      let tempItem = copyObject(proto);
          tempItem.search = substr;
          tempItem.res = str;

      result.push(tempItem);

    }

    return result;

  }

  this.inObject = function (substr, data, getKey) {

    if (getKey) {
      getKey(e)
    }

  }


  function search(substr, str) {

    let search = substr.toLowerCase().trim(),
        normalStr = str.toLowerCase(),
        pos = normalStr.indexOf(search),
        length = substr.length * 10,
        result = [];

    while (true) {

      let tempItem = copyObject(proto);
          tempItem.search = substr;
          tempItem.res = str;
      
      let foundPos = normalStr.indexOf(search, pos);

      if (foundPos == -1) break;

      if (normalStr.length >= search.length && normalStr.indexOf(search, pos) + 1) {

        tempItem.weight += (normalStr.length / search.length * 100 > 50) ? 100 + length : normalStr.length / search.length * 100 + length;
        tempItem.in = foundPos;
        tempItem.out = tempItem.in + search.length;
        tempItem.length = search.length;

        if (normalStr.length === search.length) tempItem.weight += 200;

        if (normalStr[0] === search[0]) tempItem.weight += 100;
        
        

      }

      result.push(tempItem);

      pos = foundPos + 1;

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