function assignNonnull(target, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (source[key] !== null && source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
export default assignNonnull;
