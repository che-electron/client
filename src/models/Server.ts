import Workspace from './Workspace'

export default interface IServer {
    url : string,
    authToken : string
    workspaces : Workspace[]
}
