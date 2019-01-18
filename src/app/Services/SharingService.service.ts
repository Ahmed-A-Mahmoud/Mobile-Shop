export class SharingService {
  setData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  clearData(key: string) {
    sessionStorage.removeItem(key);
  }

  cleanAll() {
    sessionStorage.clear()
  }
  /* Session Keys */
  // selectedSmartphone
  // userId
  // userStatus
}