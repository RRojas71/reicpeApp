import { Handler } from 'leaflet';
import PreviewView from './previewView.js';
import Vistas from './vistas.js';
import icons from 'url:../../img/icons.svg';


class bookmarkView extends Vistas{
    _parentElem = document.querySelector('.bookmarks__list');
    _errorMessage = "We don't find the recipe. Try again!";
  _message = '';

  addHandlerBookmark(handler){
    window.addEventListener('load', handler);
  }

    _generateHtml(){
        return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
    }


}
export default new bookmarkView();