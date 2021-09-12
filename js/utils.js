/**
 * Utils is a Class that loads generic functions
 */
 class Utils {
  /**
   * Updates HTML in an specific id
   * 
   * @param {string} id 
   * @param {string} html 
   */
  updateHTMLById(id, html) {
      document.getElementById(id).innerHTML = html;
  }

  /**
   * Dividing an array based on an specific number of items
   * 
   * @param {array} array
   * @param {number} items
   * @return {array}
   */
  divideArray(array, items) {
      // Useful documentation:
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
      // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

      return new Array(Math.ceil(array.length / items))
      .fill()
      .map(() => array.splice(0, items));
  }

  /**
   * Get parameter from URL
   * 
   * @param {string} param Parameter that I'm looking for at the URL
   * @returns {string} Parameter gotten
   */
  getURLParam(param) {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get(param);
  }
}