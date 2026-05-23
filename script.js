let Task = document.querySelector(".Task");
let input = document.querySelector("input");
let dilidAll = document.querySelector(".dilid");
let ul = document.querySelector("ul");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  let allTasks = [];

  document.querySelectorAll("li").forEach((li) => {
    let span = li.querySelector("span");

    allTasks.push({
      text: span.textContent,
      completed: span.style.textDecoration === "line-through",
    });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

Task.addEventListener("click", function () {
  if (input.value !== "") {
    let li = document.createElement("li");
    let span = document.createElement("span");
    let div = document.createElement("div");
    div.classList.add("divv");
    span.classList.add("span11");
    let tadal = document.createElement("button");
    tadal.classList.add("tadal");
    let mktamll = document.createElement("button");
    mktamll.classList.add("mktamll");
    let DiliD = document.createElement("button");
    DiliD.classList.add("DiliD");

    li.appendChild(span);
    div.appendChild(DiliD);
    div.appendChild(tadal);
    div.appendChild(mktamll);
    li.appendChild(div);
    span.textContent = input.value;
    ul.appendChild(li);
    saveTasks();

    DiliD.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    mktamll.innerHTML = `<i class="fa-solid fa-check"></i>`;
    tadal.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    input.value = "";

    All();
    DiliD.addEventListener("click", function () {
      if (confirm("هل انت متاكد من حذف هذه المهمه؟")) {
        li.remove();
        saveTasks();
        All();
      }
    });
    tadal.addEventListener("click", function () {
      let newTask = prompt("اكتب المهمه الجديده", span.textContent);
      if (newTask !== null && newTask.trim() !== "") {
        span.textContent = newTask;
        saveTasks();
        span.style.cssText = `
font-size: 20px;
transition: 0.5s;
color: rgb(255, 255, 255);
  `;
      }
    });
    mktamll.addEventListener("click", function () {
      span.style.cssText = `
text-decoration: line-through;
font-size: 14px;
transition: 0.5s;
    color: white;
  `;
      saveTasks();
    });
  } else {
    alert("اكتب مهام الاول ؟");
  }
});
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    Task.click();
  }
});
function All() {
  if (ul.children.length > 0) {
    dilidAll.style.cssText = `
  display: block;
`;
  } else {
    dilidAll.style.cssText = `
          display: none;
        `;
  }
}
dilidAll.addEventListener("click", function () {
  if (confirm("هل انت متاكد مسح جميع مهام؟")) {
    ul.innerHTML = "";
    saveTasks();
    input.value = "";
    All();
  }
});
window.onload = function () {
  tasks.forEach((task) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.classList.add("span11");

    let tadal = document.createElement("button");
    tadal.classList.add("tadal");

    let mktamll = document.createElement("button");
    mktamll.classList.add("mktamll");

    let DiliD = document.createElement("button");
    DiliD.classList.add("DiliD");

    span.textContent = task.text;

    if (task.completed) {
      span.style.cssText = `
text-decoration: line-through;
font-size: 14px;
transition: 0.5s;
color: white;
`;
    }

    DiliD.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    mktamll.innerHTML = `<i class="fa-solid fa-check"></i>`;
    tadal.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    let div = document.createElement("div");
    div.classList.add("divv");

    div.appendChild(DiliD);
    div.appendChild(tadal);
    div.appendChild(mktamll);

    li.appendChild(span);
    li.appendChild(div);

    ul.appendChild(li);

    DiliD.addEventListener("click", function () {
      li.remove();
      saveTasks();
      All();
    });

    tadal.addEventListener("click", function () {
      let newTask = prompt("اكتب المهمه الجديده", span.textContent);

      if (newTask !== null && newTask.trim() !== "") {
        span.textContent = newTask;
        saveTasks();
        span.style.cssText = `
font-size: 20px;
transition: 0.5s;
font-weight: 700;
color: rgb(255, 255, 255);
`;

      }
    });

    mktamll.addEventListener("click", function () {
      span.style.cssText = `
text-decoration: line-through;
font-size: 14px;
transition: 0.5s;
color: white;
`;
      saveTasks();
    });
  });

  All();
};
