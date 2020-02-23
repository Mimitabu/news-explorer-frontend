// import { now, past } from '../constants/constants';
const data = new Date();
const previous = new Date();
previous.setDate(previous.getDate() - 7);
const now = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
const past = previous.getFullYear()+'-'+(previous.getMonth()+1)+'-'+previous.getDate();

export default class NewsApi {
  constructor(baseUrl, apikey) {
    this.baseUrl = baseUrl;
    this.apikey = apikey;
  }

  getNews(keyWord) {
    return fetch(`${this.baseUrl}q=${keyWord}&from=${now}&to=${past}3&language=ru&sortBy=popularity&pageSize=100&apiKey=${this.apikey}`, {
      headers: {
        authorization: `Bearer ${this.apikey}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.regect(res.status);
      });
  }
}
