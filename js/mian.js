document.addEventListener('DOMContentLoaded', function () {
    class CatalogItem {
        constructor(src, title, parentSelector) {
            this.src = src;
            this.title = title;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <a href="#" class="catalog__item">
                <div class="catalog__item-img">
                    <img src="${this.src}" alt="catalogIcon">
                </div>
                <div class="catalog__item-text">${this.title}</div>
            </a>
            `;
            this.parent.append(element);
        }
    }
    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch${url} status : ${res.status}`);
        }
        return await res.json();
    };
    // атрибутом передаю ссылку которую генерирует json-server для имитации БД
    getResource('http://localhost:3000/menu').then((data) => {
        data.forEach(({ img, title }) => {
            new CatalogItem(img, title, '.catalog .catalog__items').render();
        });
    });

    // Всплывающий инпут
    if (document.querySelector('.header__search')) {
        let searchIcon = document.querySelector('.header__item-search');
        let searchInput = document.querySelector('.header__search');

        searchIcon.addEventListener('click', function () {
            if (searchInput.style.display == 'flex') {
                searchInput.style.display = 'none';
            } else {
                searchInput.style.display = 'flex';
            }
        });
    }

    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', function () {
        document.body.classList.toggle('nav-is-toggled');
        document.body.classList.toggle('no-scroll');
        this.classList.toggle('is-active');
    });

    const navExpand = [].slice.call(document.querySelectorAll('.nav-expand'));
    const backLink = `<li class="nav-item">
        <a class="nav-link nav-back-link bb" href="javascript:;">
            Назад
        </a>
    </li>`;

    navExpand.forEach((item) => {
        item.querySelector('.nav-expand-content').insertAdjacentHTML(
            'afterbegin',
            backLink
        );
        item.querySelector('.nav-link').addEventListener('click', () =>
            item.classList.add('active')
        );
        item.querySelector('.nav-back-link').addEventListener('click', () =>
            item.classList.remove('active')
        );
    });

    
});
