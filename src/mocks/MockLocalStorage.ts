export default class MockLocalStorage {
    private store = {};
    public setItem = (key : string, val : string) => (this.store[key] = val);
    public getItem = (key : string) => this.store[key];
    // removeItem = (key : string=> { delete this.store[key]; };
    public clear = () => (this.store = {});
}