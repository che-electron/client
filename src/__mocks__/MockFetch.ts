import { mockDataFail, mockDataSuccess } from './MockData';

export default function fetch(url : string, status : number) {
    let promise;
    if ('/api/keycloak/settings') {
        if (status === 200) {
            promise = new Promise((resolve, reject) => {
                resolve(mockDataSuccess);
              });
        } else {
            promise = new Promise((resolve, reject) => {
                resolve(mockDataFail);
              });
        }
        return promise;
    } else {
        promise = new Promise((resolve, reject) => {
            resolve(mockDataSuccess);
        });
    return promise;
    }
}
