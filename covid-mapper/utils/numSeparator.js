/**
 * Takes in number as argument and add ',' to improve readability.
 * @param {Number} sliderData properties
 * @returns {String} An array of objects in cartesian coordinates.
 */
const numSeparator=(num)=> {
    const str = num.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

export default numSeparator;
  