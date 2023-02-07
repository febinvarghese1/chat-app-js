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

const API = "https://api.adviceslip.com/advice";





chatButton.addEventListener("click", () => {
  const chatInputVal = chatInput.value;
  addInputs(chatInputVal);
  chatInput.value="";
  setTimeout(()=>{
      fetchAPI(API);
  },1000)
});

const addInputs = (value) => {
  const para = document.createElement("p");
  const paraValue = document.createTextNode(value);
  para.appendChild(paraValue);


const chatContainer = document.querySelector(".main__chat_div_contain");


  const divElement = document.createElement("div");
  divElement.appendChild(para);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  console.log(chatContainer.scrollHeight);
  divElement.classList.add("main__chat_div_contain_val")
  chatContainer.appendChild(divElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};



const fetchAPI = async API =>{
    const data = await fetch(API);
    const jsonData = await data.json();
    let value = jsonData.slip.advice;
    console.log(value);
    value = value.length > 100 ? value.slice(0,100) : value;
    addInputs(value);
}




//toggle menus


const mainChatToggle = document.querySelector(".main__chat_toggle");
const mainChatDiv = document.querySelector(".main__chat_div");

const mainChatIcon = document.querySelector(".main__chat_icon");
const showChatIcon = document.querySelector(".main__chat_toggle--btn");

const sparrowIcon = document.querySelector(".main__chat_icon--sparrow");
const chatClose = document.getElementById("chatclose");


sparrowIcon.addEventListener("click",()=>{
    
    mainChatToggle.classList.add("show_toggle_class");

    sparrowIcon.style.display ="none";
    chatClose.classList.add("show_close_icon");
    checkToggleIcon()

})

showChatIcon.addEventListener("click",()=>{
    mainChatToggle.classList.remove("show_toggle_class");
    mainChatDiv.classList.add("show_chat_class");

    
    checkToggleIcon()
    
  })
  
  
  chatClose.addEventListener("click",()=>{
    mainChatDiv.classList.remove("show_chat_class");
    mainChatToggle.classList.remove("show_toggle_class");

    
    checkToggleIcon()
});



const checkToggleIcon =() =>{
if(mainChatToggle.classList.contains("show_toggle_class") || mainChatDiv.classList.contains("show_chat_class")){

    sparrowIcon.style.display ="none";
    chatClose.style.display="block";
}else{

    sparrowIcon.style.display ="block";
    chatClose.style.display="none";
}
}