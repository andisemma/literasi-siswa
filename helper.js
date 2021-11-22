/**
 * Console Debuger
 * @param {*} judul judul debug
 * @param {*} data data
 * @param {*} isJudul Boolean
 */
export function debug(judul, data, isJudul) {
    if (isJudul) {
        const style = "color: red; font-size: 30px ";
        console.log('%c' + judul + '()', style);
    } else {
        console.log(judul + ' => ', data);
    }
}