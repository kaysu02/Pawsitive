// Use the keys to access the data
var storage = localStorage.getItem("StorageKey");
var moniesStorage = localStorage.getItem("money");
var unlockedStorage = localStorage.getItem("unlockedKey");

//if storage is not empty/if there is something in storage
if (storage !== null) {
  //converting JSON String -> Javascript object
  var data = JSON.parse(storage);
  loadData(data);
  var id = data.length;
}
else {
  // initialize the id to 0 and initialize data if null
  id = 0;
  data = [];
}

if (moniesStorage !== null) {
    var coins = JSON.parse(moniesStorage);
    document.getElementById("moni").innerHTML = "coins: " + coins;
}
else {
    coins = 0;
    document.getElementById("moni").innerHTML = "coins: " + coins;
}

if(unlockedStorage !== null){
    var unlockedPets = JSON.parse(unlockedStorage);
}
else{
    unlockedPets = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    localStorage.setItem("unlockedKey", JSON.stringify(unlockedPets));
}

// function to load the storage
function loadData(array) {
  array.forEach(function(todo) {
    newItem(todo.name, todo.id);
  });
}

// when the user hits the enter key, run this function
document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
    // get the text of the input box after the user hits enter
    var todo = document.getElementById("input").value;
    // adding the todo to the front end with our new information
    newItem(todo, id);
    // adding it to the back end
    data.push({
      name: todo,
      id: id
    });
    id = data.length;
    // set storage equal to newest changes
    localStorage.setItem("StorageKey", JSON.stringify(data));
  }
};

// function that creates the front-end HTML
function newItem(todo, id) {
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

// remove the item in the list that was clicked
function removeItem(event) {
  //FRONT END BELOW
  element = event.target;
  element.remove();

  //BACKEND BELOW
  console.log(element.id);
  var ul = document.getElementById("list");
  var items = ul.getElementsByTagName("li");
  if(data.length > 1){
    data.splice(element.id, 1);
    for(var i = 0; i < data.length; i++){
      data[i].id = i;
      items[i].setAttribute("id", i);
    }
  }
  else{
    data = [];
  }
  id = data.length;

  coins += 10;
  document.getElementById("moni").innerHTML = "coins: " + coins;

  // set storage equal to newest changes
  localStorage.setItem("StorageKey", JSON.stringify(data));
  localStorage.setItem("money", coins);
}

//if you have enough money, unlock the clicked pet
function unlockPet(petNum)
{
    var count = 0;
    for(var i = 0; i < unlockedPets.length; i++)
    {
        if(unlockedPets[i] == 1)
        {
            count++;
        }
    }
    
    var price = 150 + (count * 50);
    if(coins >= price && unlockedPets[petNum-1] == 0){
        coins -= price;
        document.getElementById("moni").innerHTML = "coins: " + coins;
        
        unlockedPets[petNum-1] = 1;

        document.getElementById("item" + petNum).style.backgroundColor = "#d3e0dc";
        var names = document.getElementsByName("price");
        for(var i = 0; i < names.length; i++){
            if(unlockedPets[i] == 1){
                names[i].innerHTML = "You already own this pet!";
            }
            else{
                names[i].innerHTML = "$" + price;
            }
        }
        // set storage equal to newest changes
        localStorage.setItem("money", coins);
        localStorage.setItem("unlockedKey", JSON.stringify(unlockedPets));
    }
}

//upon loading the shop, set the backgrounds and prices to reflect previous purchases
function loadBought(petNum)
{
    for(var i = 1; i <= 9; i++){
        if(unlockedPets[i-1] == 1){
<<<<<<< HEAD
            document.getElementById("item" + i).style.backgroundColor = #d3e0dc;
=======
            document.getElementById("item" + i).style.backgroundColor = "#d3e0dc";
>>>>>>> main
        }
    }
    var count = 0;
    for(var i = 0; i < unlockedPets.length; i++)
    {
        if(unlockedPets[i] == 1)
        {
            count++;
        }
    }
    var price = 150 + (count * 50);
    var names = document.getElementsByName("price");
    for(var i = 0; i < names.length; i++){
        if(unlockedPets[i] == 1){
            names[i].innerHTML = "You already own this pet!";
        }
        else{
            names[i].innerHTML = "$" + price;
        }
    }
}