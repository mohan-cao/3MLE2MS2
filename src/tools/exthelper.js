
/**
 * Constants
 */
export const mmlExtension = "mml";
export const ms2Extension = "ms2mml";

export const getMMLExtension = (file) => {
  if (!file || !file.name) return
  return [mmlExtension, ms2Extension].filter(x => x === file.name.split('.')[1].toLowerCase())[0];
}
export function getHandlerBuilder(mmlHandler, ms2Handler) {
  return function(type) {
    if (type === mmlExtension) return mmlHandler;
    if (type === ms2Extension) return ms2Handler;
  }
}
const toValidExtension = (ext) => {
  return `.${ext.toLowerCase()},.${ext.toUpperCase()}`;
}
export const validMMLs = toValidExtension(mmlExtension)
export const validMS2MMLs = toValidExtension(ms2Extension)
export const allValidMMLs = toValidExtension(mmlExtension) + ',' + toValidExtension(ms2Extension)