/**
 * @param {string} currentServer
 * @param {string} id
 * @param {string} token
 * @return {string}
 */
export function workspacesApi(currentServer : string, id : string, token : string) {
    return 'http://' + currentServer + '/api/workspace/' + id + '?token=' + token;
}

/**
 * @param {string} currentServer
 * @param {string} token
 * @return {string}
 */
export function workspaceApi(currentServer : string, token : string) {
    return 'http://' + currentServer + '/api/workspace?token=' + token;
}

/**
 * @param {string} cheServerURL
 * @return {string}
 */
export function cheKeycloakSettingsApi(cheServerURL : string) {
    return 'http://' + cheServerURL + '/api/keycloak/settings'
}

/**
 * @param {string} currentServer
 * @param {string} id
 * @param {string} token
 * @return {string}
 */
export function startWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '/runtime?token=' + token;
}

/**
 * @param {string} currentServer
 * @param {string} id
 * @param {string} token
 * @return {string}
 */
export function stopWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '/runtime?token=' + token;
}

/**
 * @param {string} currentServer
 * @param {string} id
 * @param {string} token
 * @return {string}
 */
export function reloadWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '?token=' + token;
}
