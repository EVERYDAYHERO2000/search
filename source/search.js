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
        _res = {str: str},
        result = [];

    if (substr.length) {

        if (str.indexOf(' ') + 1){

          let fullMatch = search(substr, _res);

          if (fullMatch.weight) fullMatch.weight = fullMatch.weight * words.length;

          result = fullMatch;

        }
      
      

      for ( var i = wordsSearch.length; i--; ) {

        result = result.concat( search( wordsSearch[i], _res ) );

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

  this.inObject = function (substr, data, getKey) {
    
    substr = '' + substr;
    
    let result = [];
    
    for ( var i = data.length; i--; ){
      
      let str = getKey(data[i]),
          _res = {obj: data[i], str: str},
          _result = _this.inString(substr, str);
      
        _result.res = _res;
      
      result = result.concat(_result);
          
    }
    
    result = result.sort(compare);
    
    return result;

  }


  function search(substr, _res) {

    let search = substr.toLowerCase().trim(),
        str = _res.str,
        normalStr = str.toLowerCase(),
        pos = normalStr.indexOf(search),
        length = substr.length * 10,
        result = [];

    while (true) {

      let tempItem = copyObject(proto);
          tempItem.search = substr;
          tempItem.res = _res;
      
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