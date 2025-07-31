import Vistas from './vistas';
import PreviewView from './previewView';
import icons from 'url:../../img/icons.svg';


class resultVista extends Vistas{
    _parentElem = document.querySelector('.results');
    _errorMessage = "We don't found your query recipe. Please try again!!";
  _message = '';

    _generateHtml(){
        return this._data.map(result => PreviewView.render(result, false)).join('');
    }



}
export default new resultVista();