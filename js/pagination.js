/**
 * Pagination is class that helps me to manage content divided by pages.
 */
 class Pagination {
  constructor(utils) {
      this.utils = utils;
  }

  /**
   * Get Active page based on URL parameters
   * 
   * @return {number}
   */
  getActivePage() {
      // Documentation at:
      // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
      const page = this.utils.getURLParam('page');
      return Number(page) || 1;
  };

  /**
   * Creating pagination links
   * 
   * @param {number} length
   * @param {number} activePage
   * @returns {string}
   */
  loadPagination(length, activePage){
      let links = '';

      for (let i = 1; i <= length; i++) {
          links += `<li class="page-item ${activePage === i ? 'active' : ''}">
              <a class="page-link" href="${window.location.origin}${window.location.pathname}?page=${i}">${i}</a>
          </li>`;
      }

      return links;
  }
}