// Use the StorageKey to access the data
var storage = localStorage.getItem("StorageKey");

//if storage is not empty/if there is something in storage
if (storage !== null) {
  //converting JSON String -> Javascript object
  var data = JSON.parse(storage);
  // load all data from the backend to the frontend.
  loadData(data);
  //preparing the next todo item's index
  var id = data.length;
}

// if there is nothing in storage
else {
  // initialize the id to 0 and initialize data
  id = 0;
  data = [];
}

// function to load the storage
function loadData(array) {
  array.forEach(function(todo) {
    newItem(todo.name, todo.trash, todo.id);
  });
}

// when the user hits the enter key, run this function
document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    // get the text of the input box after the user hits enter
    var todo = document.getElementById("input").value;
    // adding the todo to the front end with our new information
    newItem(todo, false, id);
    // adding it to the back end
    data.push({
      name: todo,
      trash: false,
      id: id
    });
    // set storage equal to newest changes
    localStorage.setItem("StorageKey", JSON.stringify(data));
  }
};

// function that creates the front-end HTML
function newItem(todo, trash, id) {
  // if it's in the trash, do absolutely nothing
  if (trash == true) {
    return;
  }
  var ul = document.getElementById("list");

  var li = document.createElement("li");

  li.appendChild(document.createTextNode("-" + todo));

  // for the li tag, set an attribute named id, set the value equal to id variable
  li.setAttribute("id", id);

  ul.appendChild(li);

  // reset whatever is in the box. don't want last to do's text to be in there.
  todo = document.getElementById("input").value = "";

  // li.onclick --> event listener, removeItem is telling it what to do when you click
  li.onclick = removeItem;
}

// function to remove the todo from the frontend and backend
function removeItem(event) {
  // THIS IS ALL FRONT END BELOW

  // get the html code for what you have clicked
  element = event.target;

  //remove the html element after you click it
  element.remove();

  // THIS IS BACKEND BELOW
  // get the HTML id, find the trash in the backend, set trash property in data to true.
  data[element.id].trash = true;

  // set storage equal to newest changes
  localStorage.setItem("StorageKey", JSON.stringify(data));
}