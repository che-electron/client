export function workspacesApi()
{
     return 'https://che.openshift.io/api/workspace?token=' + localStorage.OSIOAuthToken;
    // return "http://che-mini-che..nip.io/api/workspace";
}

export function workspaceApi(id : string)
{
     return 'https://che.openshift.io/api/workspace/' + id + '?token=' + localStorage.OSIOAuthToken;
    // return "http://che-mini-che..nip.io/api/workspace"+id;
}

export function startWorkspaceApi(id : string)
{
     return 'https://che.openshift.io/api/workspace/' + id + '/runtime+?token=' + localStorage.OSIOAuthToken;
    // return "http://che-mini-che..nip.io/api/workspace/"+id+"/runtime";
}

export function stopWorkspaceApi(id : string)
{
     return 'https://che.openshift.io/api/workspace/' + id + '/runtime+?token=' + localStorage.OSIOAuthToken;
    // return "http://che-mini-che..nip.io/api/workspace/"+id+"/runtime";
}
