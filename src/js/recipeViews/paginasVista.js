import { state } from '../module';
import Vistas from './vistas';
import icons from 'url:../../img/icons.svg';


class paginasVista extends Vistas{
    _parentElem = document.querySelector('.pagination');

    addHandlerClik(handler){
      this._parentElem.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;
        const goToPage = +btn.dataset.goto;

        handler(goToPage);



      })
    }

    _generateHtml(){
        const nuPages = Math.ceil(this._data.results.length / this._data.pageForResult);
        
        const currentPage = this._data.page;

        if(currentPage === 1 && nuPages > 1){
            return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span> page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
             `;
        }
        if(currentPage === nuPages && nuPages > 1 ){
            return`<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> page ${currentPage -1}</span>
          </button>
            `
        }
        if(currentPage < nuPages){
            return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> page ${currentPage -1}</span>
          </button>
          <button  data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span> page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
        }
        return '';
    }


}
export default new paginasVista();