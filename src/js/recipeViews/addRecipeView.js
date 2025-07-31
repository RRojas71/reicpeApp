
import Vistas from './vistas';
import icons from 'url:../../img/icons.svg';


class addRecipeView extends Vistas{
    _parentElem = document.querySelector('.upload');
    _message = 'successfully uploaded'
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this._addHandlerWindowShow()
        this._removeWindowShow()
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden'); 
    }

    _addHandlerWindowShow(){
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _removeWindowShow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
         this._overlay.addEventListener('click', this.toggleWindow.bind(this)) 
    }

    addhandlerUpload(handler){
        this._parentElem.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr = [... new FormData(this)];
            const data = Object.fromEntries(dataArr)
            handler(data);
        })
    }


}
export default new addRecipeView();