/**
 * 1- Check IF Tasks Is Exists [done]
 * 2- Add Tasks To The Local Storage [In Progress]
 * 3- Use Sweet Alert If Input Is Empty [done]
 * 4- Create Delete All Tasks Button [done]
 * 5- Create Finish All Tasks Button [done]
 */
// Setting Up Variables
let theInput = document.querySelector(".add-task input"),
  addButton = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span"),
  deleteAll = document.querySelector(".delete-all"),
  finishAll = document.querySelector(".finish-all");

//Focus On Input Field
window.onload = () => {
  theInput.focus();
};

// Adding The Task
addButton.onclick = () => {
  //If Input is empty
  if (theInput.value === "") {
    swal("Warning!", "Can't be Empty", "warning");
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    //Check if span with no tasks message is exisit
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      //Remove No Tasks Message
      noTasksMsg.remove();
    }

    //Check if tasks is exists
    if (!checkExists()) {
      //Create Span Element
      let mainSpan = document.createElement("span");

      //Create Delete Button
      let deleteElement = document.createElement("span");

      //Create The main span text
      let text = document.createTextNode(theInput.value);

      //Create the text delete element
      let deleteText = document.createTextNode("Delete");

      //Add deleteText to the delete element
      deleteElement.appendChild(deleteText);

      //Add Text to the main span
      mainSpan.appendChild(text);

      //Add class to main span
      mainSpan.className = "task-box";

      //Add Class to delete span
      deleteElement.className = "delete";

      //Add delete Element To the main span
      mainSpan.appendChild(deleteElement);

      //Add main span to tasks container
      tasksContainer.appendChild(mainSpan);

      //empty the input
      theInput.value = "";

      //Focus On Input Field
      theInput.focus();

      calculateTasks();
    }
  }
};
document.addEventListener("click", (e) => {
  //Delete Task
  if (e.target.className == "delete") {
    //Remove Current Task
    e.target.parentNode.remove();
    if (tasksContainer.childElementCount == 0) {
      msgNoTask();
    }
    calculateTasks();
  }
  //Finish Task
  if (e.target.classList.contains("task-box")) {
    //Toggle Class Finished
    e.target.classList.toggle("finished");
    calculateTasks();
  }
});

function checkExists() {
  let alltasks = document.getElementsByClassName("task-box");

  for (let i = 0; i < alltasks.length; i++) {
    if (alltasks[i].textContent == `${theInput.value}Delete`) {
      swal("Error!", "The Task Exists", "error");
      return true;
    }
  }
}
deleteAll.onclick = () => {
  let alltasks = document.getElementsByClassName("task-box"),
    alltasks2 = Array.from(alltasks);
  alltasks2.forEach((element) => {
    element.remove();
  });
  msgNoTask();
  calculateTasks();
};
finishAll.onclick = () => {
  let alltasks = document.getElementsByClassName("task-box"),
    alltasks2 = Array.from(alltasks);
  alltasks2.forEach((element) => {
    if (!element.classList.contains("finished")) {
      element.classList.add("finished");
    }
  });
  calculateTasks();
};
//Functio To Create No tasks
function msgNoTask() {
  let spanMsg = document.createElement("span");
  let msgText = document.createTextNode("No Tasks To Show");

  spanMsg.appendChild(msgText);
  spanMsg.className = "no-tasks-message";
  tasksContainer.appendChild(spanMsg);
}

//Function to calculate tasks
function calculateTasks() {
  //Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Get All Tasks From Local Storage
// function getTaskFromLocal() {
//   if (localStorage.length) {
//     results.innerHTML = "";
//     let i = 1;
//     for (let [key, value] of Object.entries(localStorage)) {
//       results.innerHTML += `<span class="keys">${i} : ${key}</span>`;
//       i++;
//     }
//   } else {
//     results.innerHTML = `Local Storage is Empty`;
//   }
// }

// Add Task To Local Storage
// function SetTaskToLocalStorage(setValue) {
//   localStorage.setItem(setValue, "Test");
// }
