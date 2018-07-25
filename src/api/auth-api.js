import httpServise from './http-service';

const authApi = {
    signIn: (email, password) => {
        return new Promise((resolve, reject) => {
            httpServise.post('/api/auth/sign_in', {email: email, password: password}).then(
                res => {
                    if (res.data && res.data.auth_token) {
                        window.localStorage.setItem('auth_headers', JSON.stringify({ 'access-token': res.data.auth_token}));
                        resolve(res.data.data);
                    } else reject({status: 401});
                }, err => reject(err)
            );
        });
    },
    checkUser: () => {
        return new Promise((resolve, reject) => {
            httpServise.get('/api/auth/validate_token').then(
                res => {
                    if (res.data.data) {
                        resolve(res.data.data);
                    } else {
                        window.localStorage.removeItem('auth_headers');
                        reject({status: 401});
                    }
                }, err => {
                    window.localStorage.removeItem('auth_headers');
                    reject(err);
                }
            );
        });
    },
    signOut: () => {
        return new Promise((resolve, reject) => {
            httpServise.delete('/api/auth/sign_out').then(
                res=> {
                    window.localStorage.removeItem('auth_headers');
                    resolve(res.data);
                }, err => {
                    window.localStorage.removeItem('auth_headers');
                    resolve();
                }
            );
        });
    }
}
export default authApi;