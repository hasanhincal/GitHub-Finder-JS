import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helprs.js";
import { UI } from "./scripts/ui.js";

// * Github clasın örneğini alma(miras alma);
const github = new Github();
// UI clas'ın örneği
const ui = new UI();

const getInput = (e) => {
  const value = elements.searchInput.value;
  if (value == "") {
    ui.showAlert("Form Alanını Doldurunuz!", "alert alert-warning")
    return;
  }
  if (value) {
    github.fetchUserDate(value).then((res) => {
      //  eger kullanıcı bulunamadıysa
      if (res.message === "Not Found") {
        ui.showAlert("Kullanıcı Bulunamadı!", "alert alert-danger");
      } else {
        // kullanıcı bulunduysa
        ui.showAlert("Kullanıcı Bulundu.", "alert alert-success");
        ui.renderProfile(res.data);
        console.log(res)
        ui.renderProjects(res.repos)
      }
    })
    .catch((err) => console.log(err));
    return;
  }
};

// ! Olay İzleyicileri;
elements.searchBtn.addEventListener("click", getInput);
