export class Github {
  constructor() {
    this.client_id = "9f7140a5449d7703c92f";
    this.client_secret = "8d48e46060c4d694332cdd89480191e3e66ff4c9";
    this.per_page = 10;
    this.sort = "asc"
  }
  //* api'den kullanıcı bilgilerini alma;
  async fetchUserDate(username) {
    // parametre olarak gelen kullanıcı adına göre istek attık
    const profileRes = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    // * Kullanıcı repolarını almak icin istek attık
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`
    )

    // api'den aldığımız cevabı json yapısına çevirdik
    const data = await profileRes.json();
    const repos = await repoRes.json()
    console.log(repos)
    // fonksiyonun çağrildığı yere bilgileri gönderdik
    return {data,repos};
  }
}
