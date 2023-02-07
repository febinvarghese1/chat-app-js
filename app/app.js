//sidebar navigator
const sidebar = document.querySelector(".header__menu_sidebar");
const menuIcon = document.querySelector(".header__menu_icon");
const lightIcon = document.getElementById("light");
const darkIcon = document.getElementById("black");

const checkIcon = () => {
  if (menuIcon.classList.contains("dark")) {
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
  } else {
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
  }
};

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  menuIcon.classList.toggle("dark");
  checkIcon();
});
checkIcon();

//chatting functionality

const chatButton = document.getElementById("chat_icon");
const chatInput = document.querySelector(".main__chat_div_input_field");
const chatForm = document.querySelector(".main__chat_div_input_form");
const API = "https://api.adviceslip.com/advice";

const addValueFunc = () => {
  const chatInputVal = chatInput.value;
  if (chatInputVal.length == 0) {
    return false;
  }
  addInputs(chatInputVal);
  chatInput.value = "";
  setTimeout(() => {
    fetchAPI(API);
  }, 800);
};

["click", "submit"].forEach((event) => {
  if (event == "submit") {
    chatForm.addEventListener(
      event,
      (e) => {
        e.preventDefault();
        addValueFunc();
      },
      false
    );
  } else {
    chatButton.addEventListener(
      event,
      (e) => {
        e.preventDefault();
        addValueFunc();
      },
      false
    );
  }
});

const addUserInputs = (value) => {
  const para = document.createElement("p");
  const paraValue = document.createTextNode(value);
  para.appendChild(paraValue);

  const chatContainer = document.querySelector(".main__chat_div_contain");

  //the div element which is appended
  const divElement = document.createElement("div");
  divElement.appendChild(para);
  divElement.classList.add("main__chat_div_contain_val--user");

  chatContainer.appendChild(divElement);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    divElement.classList.add("chat-animation");
  }, 0);

  return;
};


const addApiInputs = (value) =>{
  const para = document.createElement("p");

  let paraValue = document.createTextNode("Typing...");
    para.appendChild(paraValue);
    setTimeout(() => {
      let newparaValue = document.createTextNode(value);
      para.replaceChild(newparaValue, paraValue);
    }, 1600);

    //chat container
  const chatContainer = document.querySelector(".main__chat_div_contain");

  //the div element which is appended
  const divElement = document.createElement("div");
  divElement.appendChild(para);
  divElement.classList.add("main__chat_div_contain_val--api");

  chatContainer.appendChild(divElement);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    divElement.classList.add("chat-api-animation");
  }, 0);
}

const addInputs = (value, api = false) => {

    api ? addApiInputs(value) : addUserInputs(value);
 
};

//fetching the api

const fetchAPI = async (API) => {
  const data = await fetch(API);
  const jsonData = await data.json();
  let value = jsonData.slip.advice;
  console.log(value);
  value = value.length > 100 ? value.slice(0, 100) : value;
  addInputs(value, true);
};

//toggle menus

const mainChatToggle = document.querySelector(".main__chat_toggle");
const mainChatDiv = document.querySelector(".main__chat_div");

const mainChatIcon = document.querySelector(".main__chat_icon");
const showChatIcon = document.querySelector(".main__chat_toggle--btn");

const sparrowIcon = document.querySelector(".main__chat_icon--sparrow");
const chatClose = document.getElementById("chatclose");

sparrowIcon.addEventListener("click", () => {
  mainChatToggle.classList.add("show_toggle_class");

  sparrowIcon.style.display = "none";
  chatClose.classList.add("show_close_icon");
  checkToggleIcon();
});

showChatIcon.addEventListener("click", () => {
  mainChatToggle.classList.remove("show_toggle_class");
  mainChatDiv.classList.add("show_chat_class");

  checkToggleIcon();
});

chatClose.addEventListener("click", () => {
  mainChatDiv.classList.remove("show_chat_class");
  mainChatToggle.classList.remove("show_toggle_class");

  checkToggleIcon();
});

const checkToggleIcon = () => {
  if (
    mainChatToggle.classList.contains("show_toggle_class") ||
    mainChatDiv.classList.contains("show_chat_class")
  ) {
    sparrowIcon.style.display = "none";
    chatClose.style.display = "block";
  } else {
    sparrowIcon.style.display = "block";
    chatClose.style.display = "none";
  }
};
