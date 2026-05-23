let Task = document.querySelector(".Task");
let input = document.querySelector("input");
let dilidAll = document.querySelector(".dilid");
let ul = document.querySelector("ul");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// فنكشن الحفظ
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

// إضافة مهمة جديدة
Task.addEventListener("click", function () {
  if (input.value.trim() !== "") {
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

    // وضع الداتا والترتيب الصحيح
    span.textContent = input.value;
    DiliD.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    mktamll.innerHTML = `<i class="fa-solid fa-check"></i>`;
    tadal.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    li.appendChild(span);
    div.appendChild(DiliD);
    div.appendChild(tadal);
    div.appendChild(mktamll);
    li.appendChild(div);
    ul.appendChild(li);
    
    saveTasks(); // الحفظ شغال صح هنا
    input.value = "";
    All();

    // حذف مهمة
    DiliD.addEventListener("click", function () {
      if (confirm("هل انت متاكد من حذف هذه المهمه؟")) {
        li.remove();
        saveTasks();
        All();
      }
    });

    // تعديل مهمة
    tadal.addEventListener("click", function () {
      let newTask = prompt("اكتب المهمه الجديده", span.textContent);
      if (newTask !== null && newTask.trim() !== "") {
        span.textContent = newTask;
        span.style.fontSize = "20px"; // تغيير الخاصية دي بس عشان ما نمسحش خط الـ line-through لو موجود
        span.style.color = "white";
        saveTasks();
      }
    });

    // اكتمال مهمة
    mktamll.addEventListener("click", function () {
      span.style.textDecoration = "line-through";
      span.style.fontSize = "14px";
      span.style.color = "white";
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
  dilidAll.style.display = ul.children.length > 0 ? "block" : "none";
}

dilidAll.addEventListener("click", function () {
  if (confirm("هل انت متاكد مسح جميع مهام؟")) {
    ul.innerHTML = "";
    saveTasks();
    input.value = "";
    All();
  }
});

// تحميل الداتا عند فتح الصفحة
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
      span.style.textDecoration = "line-through";
      span.style.fontSize = "14px";
      span.style.color = "white";
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
        span.style.fontSize = "20px";
        span.style.color = "white";
        saveTasks();
      }
    });

    mktamll.addEventListener("click", function () {
      span.style.textDecoration = "line-through";
      span.style.fontSize = "14px";
      span.style.color = "white";
      saveTasks();
    });
  });

  All();
};
