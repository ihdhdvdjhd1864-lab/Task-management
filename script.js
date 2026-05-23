let Task = document.querySelector(".Task");
let input = document.querySelector("input");
let dilidAll = document.querySelector(".dilid");
let ul = document.querySelector("ul");

// البيانات الأساسية
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// حفظ البيانات
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// رسم المهام على الصفحة
function renderTasks() {
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    let div = document.createElement("div");

    div.classList.add("divv");
    span.classList.add("span11");

    span.textContent = task.text;

    // حالة الانتهاء
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.fontSize = "14px";
      span.style.color = "white";
    }

    // buttons
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let doneBtn = document.createElement("button");

    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    deleteBtn.classList.add("DiliD");
    editBtn.classList.add("tadal");
    doneBtn.classList.add("mktamll");

    // Delete
    deleteBtn.addEventListener("click", () => {
      if (confirm("هل انت متاكد من حذف هذه المهمه؟")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        checkAllButton();
      }
    });

    // Edit
    editBtn.addEventListener("click", () => {
      let newTask = prompt("اكتب المهمه الجديده", task.text);

      if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
      }
    });

    // Done
    doneBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    div.appendChild(doneBtn);

    li.appendChild(span);
    li.appendChild(div);
    ul.appendChild(li);
  });

  checkAllButton();
}

// إضافة مهمة
Task.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    tasks.push({
      text: input.value,
      completed: false,
    });

    input.value = "";
    saveTasks();
    renderTasks();
  } else {
    alert("اكتب مهام الاول ؟");
  }
});

// Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    Task.click();
  }
});

// زر حذف الكل
dilidAll.addEventListener("click", () => {
  if (confirm("هل انت متاكد مسح جميع مهام؟")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// إظهار / إخفاء زر الحذف الكلي
function checkAllButton() {
  if (tasks.length > 0) {
    dilidAll.style.display = "block";
  } else {
    dilidAll.style.display = "none";
  }
}

// أول تشغيل
renderTasks();