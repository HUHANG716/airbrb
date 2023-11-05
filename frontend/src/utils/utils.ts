const lsSave = (key: string, target: unknown) => {
  localStorage.setItem(key, JSON.stringify(target));
};
const lsGet = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};
const lsRm = (key: string) => {
  localStorage.removeItem(key);
};
const isEquivalent = (a: string | number, b: string | number) => {
  return a.toString() === b.toString();
};

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export const fileToDataUrl = (file: any) => {
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

export { lsSave, lsGet, lsRm, isEquivalent };
