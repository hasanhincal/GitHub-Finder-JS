import { elements } from "./helprs.js";

export class UI {
  constructor() {
    this.profile = elements.profile;
    this.button = elements.btnClear;
    this.input = elements.searchInput;
    this.btnDark = elements.btn;
    this.body = elements.body;
    this.repoArea = elements.repos;
    // * olay izleyicileri;
    this.button.addEventListener("click", this.clearProfile.bind(this));
    this.btnDark.addEventListener("click", this.darkMode.bind(this));
  }
  renderProfile(res) {
    console.log(res);
    const created_at = new Date(res.created_at).toLocaleDateString();
    this.profile.innerHTML = ` <div class="row border border-2 border-dark-subtle rounded-3 p-4 my-4 ">
    <div class="col-md-3 ">
      <img class="img-fluid rounded shadow img " src="${res.avatar_url}" alt="">
      <a href="${res.html_url}" class="btn btn-primary w-100 mt-4" target="_blank">Profili Göster</a>
    </div>
    <div class="col-md-9 mt-md-0 mt-sm-3 mt-lg-0" id="profileButton">
      
       <div class="d-sm-flex d-md-flex d-lg-inline-block flex-column row-gap-2 mt-md-0 mt-sm-4 mt-lg-0">
        <span class="badge bg-primary fs-6 d-inline-block">Acık Repolar:${res.public_repos}</span>
        <span class="badge bg-secondary fs-6 d-inline-block">Acik Gistler:${res.public_gists}</span>
        <span class="badge bg-success fs-6 d-inline-block">Takipciler:${res.followers}</span>
        <span class="badge bg-info fs-6 d-inline-block">Takip Edilenler:${res.following}</span>
       </div>
      
      <ul class="list-group mt-4">
        <li class="list-group-item">Hakkımda: ${res.bio}</li>
        <li class="list-group-item">Şirket: ${res.company}</li>
        <li class="list-group-item">Website: ${res.blog}</li>
        <li class="list-group-item">Konum: ${res.location}</li>
        <li class="list-group-item">Hesap Oluşturma: ${created_at}</li>
      </ul>

    </div>
</div>`;
  }
  //* uyarı mesajı oluşturma
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = message;
    elements.warning.appendChild(div);
    console.log(elements.warning);
    // * uyarıyı ekrandan silme fonk. showAlert fonk. çaliştıktan 3 sn. sonra calısır.
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  //   * uyarıyı ekrandan silme
  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  // * ekranı temizleme ve bildirim basma;
  clearProfile(e) {
    if (this.input.value == "" ) {
      return (value);
      }else if (confirm("Silmek İstediğinize Eminmisiniz!")){
        this.profile.innerHTML = "";
        this.input.value = "";
        this.showAlert("Bütün Veriler Silindi!", "alert alert-info");
        this.repoArea.innerHTML = "";
    }
  }
  //  * dark mode;
  darkMode() {
    if (this.body.classList.contains("bg-dark")) {
      this.body.className = "bg-light text-bg-light";
      this.btnDark.className = "btn btn-dark";
      this.btnDark.textContent = "Dark Mode";
      // this.title.className = "navbar-brand text-bg-light m-auto mx-0";
    } else if (this.body.classList.contains("bg-light")) {
      this.body.className = "bg-dark text-bg-dark";
      this.btnDark.className = "btn btn-light";
      this.btnDark.textContent = "Light Mode";
      // this.title.className = "navbar-brand text-bg-dark m-auto mx-0";
    }
    elements.title.classList.toggle("text-dark");
  }
  renderProjects(data){
    // projeler dizisindeki her bir eleman icin kart olustur ve ekrana bas 
    data.forEach((repo) =>{
        this.repoArea.innerHTML += `
      <div class="row rounded-3 border border-2 p-3 border-dark-subtle mb-3">
          
          <div class="col-6"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
  
          <div class="col-6 d-flex justify-content-end align-items-center column-gap-2">
            <span class="badge bg-secondary ">Yıldız:${repo.stargazers_count}</span>
            <span class="badge bg-primary ">Fork:${repo.forks_count}</span>
            <span class="badge bg-success ">İzleyenler:${repo.watchers}</span>
          </div>
        </div>`
      }) 
    //*map ilede bu işlemi yapabiliriz;
    // data.map((repo)=>{
    //   this.repoArea.innerHTML += `
    //     <div class="row rounded-3 border border-2 p-3 border-dark-subtle mb-3">
            
    //         <div class="col-6"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
    
    //         <div class="col-6 d-flex justify-content-end align-items-center column-gap-2">
    //           <span class="badge bg-secondary ">Yıldız:${repo.stargazers_count}</span>
    //           <span class="badge bg-primary ">Fork:${repo.forks_count}</span>
    //           <span class="badge bg-success ">İzleyenler:${repo.watchers}</span>
    //         </div>
    //       </div>`
    // })  
  }
}
