import icons from 'url:../../img/icons.svg';

export default class Vistas {
  _data;
  render(data, render = true) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
    this._data = data;
    const html = this._generateHtml();

    if(!render) return html;

    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }

  update(data){
    this._data = data;
    const newHtml = this._generateHtml();

    const nuevoDom = document.createRange().createContextualFragment(newHtml);
    const nuevoElement = Array.from(nuevoDom.querySelectorAll('*'));
    const elementactuales = Array.from(this._parentElem.querySelectorAll('*'));

    nuevoElement.forEach((newEl, i)=>{
     // actualizar valores
      const elemAct = elementactuales[i];
      if(!newEl.isEqualNode(elemAct) && newEl.firstChild?.nodeValue.trim() !== ''){
        elemAct.textContent = newEl.textContent;
      }
      //actualizar atributos 
      if(!newEl.isEqualNode(elemAct))
       Array.from(newEl.attributes).forEach(attr =>
          elemAct.setAttribute(attr.name, attr.value)
        )
      })

    }



  _clear() {
    this._parentElem.innerHTML = '';
  }
  renderSpinner() {
    const html = ` <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div> `;
                this._clear();
                this._parentElem.insertAdjacentHTML('afterbegin', html);
  }
  renderErrorMessage(message = this._errorMessage) {
    const html = `
            <div class="error">
            <div>
              <svg>
                <use ${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
            `;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(message = this._message) {
    const html = `
            <div class="message">
            <div>
              <svg>
                <use ${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
            `;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }
}
