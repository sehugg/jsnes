export function copyArrayElements(src, srcPos, dest, destPos, length) {
  for (let i = 0; i < length; ++i) {
    dest[destPos + i] = src[srcPos + i];
  }
}

export function copyArray(src) {
  return src.slice(0);
}

// Save states hold copies of arrays, never the live ones, so running on
// after a save or a load doesn't change the saved state.
export function fromJSON(obj, state) {
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const current = obj[prop];
    const value = state[prop];
    if (
      ArrayBuffer.isView(current) &&
      (Array.isArray(value) || ArrayBuffer.isView(value))
    ) {
      // Typed arrays: copy data in-place instead of replacing the array.
      // The state may hold typed arrays, or plain arrays from JSON.parse.
      current.set(value);
    } else if (Array.isArray(value)) {
      obj[prop] = value.slice(0);
    } else {
      obj[prop] = value;
    }
  }
}

export function toJSON(obj) {
  const state = {};
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = obj[prop];
    // Copy arrays. Typed arrays stay typed, which is faster and smaller;
    // JSON.stringify() callers must convert them to plain arrays.
    state[prop] =
      Array.isArray(value) || ArrayBuffer.isView(value)
        ? value.slice(0)
        : value;
  }
  return state;
}
