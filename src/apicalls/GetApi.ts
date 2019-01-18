export function workspacesApi(currentServer : string, id : string, token : string) {
    return 'http://' + currentServer + '/api/workspace/' + id + '?token=' + token;
}

export function workspaceApi(currentServer : string, token : string) {
    return 'http://' + currentServer + '/api/workspace?token=' + token;
}

export function cheKeycloakSettingsApi(cheServerURL : string) {
    return 'http://' + cheServerURL + '/api/keycloak/settings'
}

export function startWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '/runtime?token=' + token;
}

export function stopWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '/runtime?token=' + token;
}

export function reloadWorkspaceApi(currentServer : string, workspaceId : string, token : string) {
    return 'http://' + currentServer + '/api/workspace' + workspaceId + '?token=' + token;
}
