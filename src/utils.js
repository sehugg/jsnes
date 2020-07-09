module.exports = {
  copyArrayElements: function(src, srcPos, dest, destPos, length) {
    for (var i = 0; i < length; ++i) {
      dest[destPos + i] = src[srcPos + i];
    }
  },

  copyArray: function(src) {
    return src.slice(0);
  },

  fromJSON: function(obj, state) {
    for (var i = 0; i < obj.JSON_PROPERTIES.length; i++) {
      var key = obj.JSON_PROPERTIES[i];
      if (obj[key] !== null && obj[key].buffer && obj[key].set)
        obj[key].set(state[key]); // set array elements
      else
        obj[key] = state[key]; // replace
    }
  },

  toJSON: function(obj) {
    var state = {};
    for (var i = 0; i < obj.JSON_PROPERTIES.length; i++) {
      var key = obj.JSON_PROPERTIES[i];
      state[key] = obj[key];
    }
    return state;
  }
};
