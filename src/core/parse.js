export function parse(value = '') {
  if (value.startsWith('=')) {
    // было return value;
    try {
      return eval(value.slice(1));
      // Это не всегда работает, обернём в try catch
    } catch (e) {
      return value;
      // console.warn('Skipping parse error', e.message);
    }
  }
  return value;
}
