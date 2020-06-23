/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import style from './style.js';

class Modal {
    constructor(id, body, props) {
        const defaultProps = {
            title: '',
            lock: false,
            style: '',
        };

        this.id = `modal-${id}`;
        this.body = body;
        this.props = { ...defaultProps, ...props };

        this.create();
    }

    create() {
        const modal = document.createElement('div');
        modal.setAttribute('id', this.id);

        const styleModal = document.createElement('style');
        styleModal.setAttribute('id', `style-${this.id}`);
        styleModal.appendChild(
            document.createTextNode(
                style
                    .replace(/%MODAL%/g, `#${this.id}`)
                    .concat(this.props.style.replace(/%MODAL%/g, `#${this.id}`))
            )
        );

        const modalBox = document.createElement('div');
        modalBox.classList.add('modal-box');

        // Modal Header
        const modalBoxHeader = document.createElement('div');
        modalBoxHeader.classList.add('modal-header');
        const headerTitle = document.createElement('span');
        headerTitle.appendChild(document.createTextNode(this.props.title));
        const headerClose = document.createElement('button');
        headerClose.appendChild(document.createTextNode('X'));
        headerClose.addEventListener('click', () => this.destroy());
        modalBoxHeader.appendChild(headerTitle);
        modalBoxHeader.appendChild(headerClose);

        // Modal Body
        modalBox.appendChild(modalBoxHeader);
        modalBox.appendChild(this.body);
        modal.appendChild(modalBox);

        document
            .querySelector('body')
            .children[0].parentNode.insertBefore(
                modal,
                document.querySelector('body').children[0]
            );
        document
            .querySelector('body')
            .children[0].parentNode.insertBefore(
                styleModal,
                document.querySelector('body').children[0]
            );

        if (!this.props.lock) {
            modal.addEventListener('click', (e) => {
                if (e.target.getAttribute('id') === this.id) this.destroy();
            });
        }
    }

    destroy() {
        if (document.getElementById(this.id))
            document.getElementById(this.id).remove();
        if (document.getElementById(`style-${this.id}`))
            document.getElementById(`style-${this.id}`).remove();
    }
}

export default (id, body, props) => new Modal(id, body, props);
