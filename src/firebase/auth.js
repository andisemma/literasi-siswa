import { firebaseApp } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

/**
 * Console Debuger
 * @param {*} judul judul debug
 * @param {*} data data
 * @param {*} isJudul Boolean
 */
function debug(judul, data, isJudul) {
    if (isJudul) {
        const style = "color: red; font-size: 30px ";
        console.log('%c' + judul + '()', style);
    } else {
        console.log(judul + ' => ', data);
    }
}

/**
 * Google Auth
 * @returns data profile
 */
async function googleLogin() {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    const data = await signInWithPopup(auth, provider)

        .then((result) => {

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;

            return { token: token, displayName: user.displayName, email: user.email, photoURL: user.photoURL }

        }).catch((error) => {

            console.log(error)
        });
    debug('googleLogin', null, true)
    debug('profile', data, false)
    return data
}

/**
 * Google Auth SignOut
 */
function fireSignOut() {
    debug('fireSignOut', null, true)
    const auth = getAuth(firebaseApp);
    signOut(auth).then(() => {
        return true
    }).catch((error) => {
        debug('profile', error, false)
        return false
    });
}


export { googleLogin, fireSignOut, debug }