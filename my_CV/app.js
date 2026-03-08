function changeLang(lang) {
    document.querySelectorAll('.uz, .ru, .en').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.' + lang).forEach(el => el.style.display = 'block');
}