/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-cond-assign */
/* eslint-disable import/extensions */

import Modal from './Modal/index.js';
import style from './style.js';

class PrettierWhatsappLink {
    constructor(el) {
        this.id = el.getAttribute('id');
        this.phone = el.getAttribute('data-phone');
        this.msg = el.getAttribute('data-message');
        this.body = this.createBody();

        el.addEventListener('click', () => this.handleClick());
    }

    createBody() {
        const modalBoxBody = document.createElement('div');
        modalBoxBody.classList.add('modal-body');

        const form = document.createElement('form');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = this.createInputs();

        const confirm = document.createElement('input');
        confirm.type = 'submit';
        confirm.value = 'Confirmar';
        confirm.title = 'Confirmar';

        for (const input of inputs) {
            const label = document.createElement('label');
            label.appendChild(
                document.createTextNode(
                    `${this.nameFormat(input.name)}${
                        input.required ? '*' : ''
                    }:`
                )
            );

            form.appendChild(label);
            form.appendChild(input);
        }

        form.appendChild(confirm);

        modalBoxBody.appendChild(form);

        return modalBoxBody;
    }

    createInputs() {
        const regex1 = /\{\{([a-z]{0,})([:a-zA-Z]{0,})?!?(\[([\wÀ-ú]{0,} ?,?){0,}\]!?)?\}\}/g;
        const str = this.msg;
        let array1;
        const inputs = [];

        while ((array1 = regex1.exec(str)) !== null) {
            let param;
            let name;
            let type;
            let opts;
            let required = false;

            const typesHTML = ['text', 'email', 'message', 'select'];

            const cod = array1[0].replace(/\{\{/gi, '').replace(/\}\}/gi, '');
            param = cod;

            // Required
            if (param.indexOf('!') > 0) {
                param = param.replace('!', '');
                required = true;
            }

            // Type
            if (param.indexOf(':') > 0) {
                const r = param.split(':');
                [name, type] = r;

                if (type.indexOf('[') > 0) {
                    const WithOptions = type.split('[');
                    [type, opts] = WithOptions;
                    opts = opts
                        .replace(']', '')
                        .split(',')
                        .map((opt) => opt.trim());
                } else if (typesHTML.indexOf(type.toLowerCase()) > 0) {
                    type = type.toLowerCase();
                } else {
                    type = 'text';
                }
            } else {
                name = param;
                type = 'text';
            }

            let input;
            if (type === 'select') {
                input = document.createElement('select');
                input.name = name;
                input.required = required;

                const optionDefault = document.createElement('option');
                input.appendChild(optionDefault);

                for (const i in opts) {
                    const option = document.createElement('option');
                    option.value = opts[i];
                    option.appendChild(document.createTextNode(opts[i]));
                    input.appendChild(option);
                }
            } else {
                input = document.createElement('input');
                input.type = type;
                input.name = name;
                input.required = required;
            }

            this.msg = this.msg.replace(`{{${cod}}}`, `{{${name}}}`);
            inputs.push(input);
        }

        return inputs;
    }

    handleClick() {
        this.modal = Modal(this.id, this.body, {
            title: 'WhatsApp Link',
            style,
        });
    }

    handleSubmit(el) {
        el.preventDefault();

        const inputs = el.target.querySelectorAll(
            'input:not([type=submit]), select'
        );
        for (const input of inputs) {
            this.msg = this.msg.replace(
                `{{${input.name}}}`,
                this.formatInput(input)
            );
        }

        const msg = window
            .encodeURIComponent(this.msg)
            .replace(/%5Cn%20/g, '%5Cn')
            .replace(/%5Cn/g, '%0A');

        const href = `https://api.whatsapp.com/send?phone=${this.phone}&text=${msg}`;

        el.target.reset();
        this.modal.destroy();
        window.open(href, '_blank');
    }

    nameFormat(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    formatInput(input) {
        if (input.type === 'email') {
            if (input.value !== '') {
                return input.value.trim().toLowerCase();
            }
        }

        let value = input.value.trim();
        value = value !== '' ? value : 'Não informado';

        const names = value.split(' ');
        const formated = [];
        for (const name of names) {
            formated.push(this.nameFormat(name));
        }
        return formated.join(' ');
    }
}

export default (el) => new PrettierWhatsappLink(el);
