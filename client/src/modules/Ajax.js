import Auth from '../modules/Auth';

function ajax(opts) {
    const url = opts.url;
    const method = opts.method || 'get';
    const body = opts.body || undefined;
    const headers = opts.headers || {};
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        if (Auth.isUserAuthenticated()) {
            // User is authenticated so automatically add auth token
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        }
        for (const name of Object.keys(headers)) {
            xhr.setRequestHeader(name, headers[name]);
        }
        xhr.responseType = 'json';
        xhr.onerror = function (err) {
            reject(new Error(xhr.statusText));
        }
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        }
        xhr.send(body);
    });
}

export default ajax;

