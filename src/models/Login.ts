export default interface ILogin {
    fetching : boolean,
    authenticated : boolean,
    authError : string,
    loginRequired : boolean
}