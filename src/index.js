window.onbeforeunload = closingCode;

class Task {
  createContainers() {
    this.mainContainer = document.createElement("div");

    this.mainContainer.classList = "d-flex bd-highlight";
    this.check = document.createElement("checkbox");
    this.deletebtn = document.createElement("button");
    this.deletebtn.classList =
      "btn-close btn-danger invisible p-2 bd-highlight";

    this.task = document.createElement("span");
  }
  print(parent) {
    parent.appendChild(this.mainContainer);
    this.task.innerText = this.txt;
  }

  appendContainers() {
    this.mainContainer.appendChild(this.check);
    this.mainContainer.appendChild(this.task);
    this.mainContainer.appendChild(this.deletebtn);
  }
  constructor(id, txt, isCheked = false) {
    this.isCheked = isCheked;
    this.txt = txt;
    this.id = Number(id);

    this.createContainers();
    this.appendContainers();

    this.check.innerHTML = `<input class="form-check-input bd-highlight" type="checkbox" value="" id="flexCheckIndeterminate">`;
    this.checkbox = this.check.getElementsByClassName("form-check-input")[0];
    this.checkbox.checked = this.isCheked;
    this.task.classList =
      "text-start flex-grow-1 ps-3 bd-highlight text-break ";

    if (this.isCheked) {
      this.task.classList.add("text-muted");
    }
    this.checkbox.addEventListener("click", () => {
      
      this.task.classList.toggle("text-muted");
      

      if(this.isCheked && P.condition === 'completed'){
        this.mainContainer.classList = 'd-flex justify-content-between d-none'
      }
      if(!(this.isCheked) && P.condition === 'active'){
        this.mainContainer.classList = 'd-flex justify-content-between d-none'
      }
      this.isCheked = !this.isCheked;

      P.objArr[this.id].isCheked = this.isCheked;
      if (this.checkbox.checked) {
        P.isDone++;
        P.count--;
      } else {
        P.isDone--;
        P.count++;
      }
      P.isShown();
      console.log("P.objArr");
      console.log(P.objArr);
      P.itemsLft.innerText = "items left " + P.count;
    });

    this.mainContainer.addEventListener("mouseover", (e) => {
      this.deletebtn.classList.toggle("invisible");
    });
    this.mainContainer.addEventListener("mouseout", (e) => {
      this.deletebtn.classList.toggle("invisible");
    });
    this.deletebtn.addEventListener("click", (e) => {
      P.itemsArr.splice(this.id, 1, 0);
      P.objArr.splice(this.id, 1, 0);

      P.taskContainer.removeChild(this.mainContainer);

      console.log("JSON.parse(P.storage.getItem('myTasks'))");
      console.log(JSON.parse(P.storage.getItem("myTasks")));
      console.log("P.itemsArr");
      console.log(P.itemsArr);
      if (!this.checkbox.checked) {
        P.count--;
      }

      P.itemsLft.innerText = "items left " + P.count;
    });
  }
}

class App {
  isShown() {
    if (this.isDone > 0) {
      this.clearComplited.classList = "btn btn-outline-danger btn-sm";
    } else {
      this.clearComplited.classList = "btn btn-outline-danger btn-sm invisible";
    }
  }
  createControls() {
    this.itemsLft = document.createElement("span");
    this.all = document.createElement("button");
    this.active = document.createElement("button");
    this.completed = document.createElement("button");
    this.clearComplited = document.createElement("button");

    this.clearComplited.classList = "btn btn-outline-danger btn-sm invisible";
    this.active.classList = "btn btn-outline-dark btn-sm";
    this.completed.classList = "btn btn-outline-dark btn-sm";
    this.all.classList = "btn btn-outline-dark btn-sm";
    this.itemsLft.classList = "myborder";
  }
  findPlace() {
    //let tmp = false;
    if (this.objArr.length === 0) {
      return 0;
    } else {
      for (let i = 0; i < this.objArr.length; i++) {
        if (this.objArr[i] === 0) {
          console.log(i);
          //tmp = true;
          return i;
        }
      }
    }

    return this.objArr.length;
  }
  createContainers() {
    this.main = document.createElement("div");
    this.main.classList =
      " justify-content-center d-flex align-items-center flex-column";
    this.main.style.minHeight = "600px";

    this.mainContainer = document.createElement("div");
    this.mainContainer.style.width = "40%";
    this.mainContainer.classList =
      "d-flex align-content-between flex-column mystyle ";

    this.logo = document.createElement("div");
    this.logo.style.minHeight = "150px";
    this.logoName = document.createElement("p");
    this.logoName.textContent = "ToDos";
    this.logo.classList = "fs-1";

    this.taskContainer = document.createElement("div");
    this.taskContainer.classList = "container mytaskcontainer";
    this.taskContainer.minHeight = "50%";

    this.taskList = document.createElement("div");
    this.taskList.classList = "row";

    this.taskContainer.appendChild(this.taskList);

    this.input = document.createElement("input");
    this.input.classList = "rounded-pill shadow-lg  bg-body rounded";

    this.controller = document.createElement("div");
    this.controller.classList = "d-flex justify-content-between";
  }

  updateStorage() {
    this.storage.setItem("myTasks", JSON.stringify(this.objArr));
  }
  constructor() {
    this.count = 0;
    this.itemsArr = [];
    this.condition = ''
    this.storage = window.localStorage;
    this.isDone = 0;
    this.objArr = [];
    
    //create elems
    this.createContainers();
    this.createControls();
    document.body.appendChild(this.main);

    this.all.innerText = "All";
    this.active.innerText = "Active";
    this.completed.innerText = "Completed";
    this.clearComplited.innerText = "clearComplited";

    //append elems
    this.logo.appendChild(this.logoName);
    this.main.appendChild(this.logo);
    this.mainContainer.appendChild(this.input);
    this.mainContainer.appendChild(this.taskContainer);
    this.mainContainer.appendChild(this.controller);
    this.main.appendChild(this.mainContainer);

    this.controller.appendChild(this.itemsLft);

    this.controller.appendChild(this.all);
    this.controller.appendChild(this.active);
    this.controller.appendChild(this.completed);
    this.controller.appendChild(this.clearComplited);

    this.itemsLft.innerText = "items left " + this.count;

    this.active.addEventListener("click", (e) => {
      window.location.hash = '/active'
      this.condition = 'active'
      this.itemsArr.forEach((el) => {
        if (el.isCheked && el != 0) {
          el.mainContainer.classList = "d-flex justify-content-between d-none";
        } else if (!el.isCheked && el != 0) {
          el.mainContainer.classList = "d-flex justify-content-between";
        }
      });
    });

    this.completed.addEventListener("click", (e) => {
      window.location.hash = '/completed'
      this.condition = 'completed'
      this.itemsArr.forEach((el) => {
        if (!el.isCheked && el != 0) {
          el.mainContainer.classList = "d-flex justify-content-between d-none";
        } else if (el.isCheked && el != 0) {
          el.mainContainer.classList = "d-flex justify-content-between";
        }
      });
    });

    this.clearComplited.addEventListener("click", (e) => {
      this.condition = ''
      this.itemsArr.forEach((el) => {
        if (el.isCheked) {
          this.itemsArr.splice(el.id, 1, 0);
          this.objArr.splice(el.id, 1, 0);
          if (!el.checkbox.checked) {
            this.count--;
          }
          this.isDone--;
          this.itemsLft.innerText = "items left " + this.count;
          this.taskContainer.removeChild(el.mainContainer);
        }
      });
      this.isShown();
      this.itemsLft.innerText = "items left " + this.count;
    });

    this.all.addEventListener("click", () => {
      window.location.hash = ''
      this.condition = ''
      this.itemsArr.forEach((el) => {
        if (el != 0) {
          el.mainContainer.classList = "d-flex justify-content-between";
        }
      });
    });

    this.input.addEventListener("change", (e) => {
      if (!(this.input.value.replaceAll(" ", "").length === 0)) {
        this.updateStorage();
        let tmpObj = {
          id: P.findPlace(),
          isCheked: false,
          text: this.input.value
        };
        this.objArr[tmpObj.id] = tmpObj;

        let a = new Task(tmpObj.id, tmpObj.text);
        
        if(this.condition ==='completed'){
          a.mainContainer.classList.toggle('d-none')
        }
        
        a.print(this.taskContainer);
        a.print(this.taskContainer);

        this.itemsArr[tmpObj.id] = a;
        this.storage.setItem("myTasks", JSON.stringify(this.objArr));
        this.input.value = "";

        this.count++;
        this.itemsLft.innerText = "items left " + this.count;
      }
    });
    this.check();
  }
  check() {
    if (JSON.parse(this.storage.getItem("myTasks"))) {
      let tmp = JSON.parse(this.storage.getItem("myTasks"));

      tmp.forEach((el) => {
        if (el != 0) {
          if (el.isCheked != 0) {
            this.isDone++;
          }
          let a = new Task(el.id, el.text, el.isCheked);
          a.print(this.taskContainer);
          this.itemsArr[el.id] = a;
          if (!el.isCheked) {
            console.log(el);
            this.count++;
          }
        }
      });
      this.objArr = tmp;
    }

    this.itemsLft.innerText = "items left " + this.count;
    this.isShown();
  }
}
let P = new App();
function closingCode() {
  P.updateStorage();
  return null;
}
