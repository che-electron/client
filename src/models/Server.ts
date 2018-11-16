export default interface IServer {
    name : string,
    url : string,
    status : string // reachable, unreachable 
    workspacesFetchError : boolean,
    workspacesIsFetching : boolean, 
}