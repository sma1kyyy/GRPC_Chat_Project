// Use WebSocket transport endpoint.
const client = new Centrifuge('ws://127.0.0.1:8080/centrifugo/connection/websocket', {
    data: {
       username: "alex",
       password: "qwerty"
    }
 });
 
 // Trigger actual connection establishement.
 client.connect();
 
 const pos = document.getElementById("pos")
 const username = document.getElementById("username")
 const chat = document.getElementById("chat")
 const message = document.getElementById("message")
 const list = document.getElementById("list")
 
 const subBtn = document.getElementById("sub")
 const sendBtn = document.getElementById("send")
 
 subBtn.addEventListener("click", (ev) =>
 {
    const chatSub = client.newSubscription(chat.value)
    chatSub.on('publication', (ctx) =>
    {
       let line = "<p><b>" + ctx.data.from + ":</b> " + ctx.data.message + "</p>"
       list.innerHTML += line
    })
    chatSub.subscribe()
 })
 
 sendBtn.addEventListener("click", (ev) =>
 {
    client.publish(chat.value, {
       from: username.value,
       message: message.value
    })
 
    message.value = ""
 })
 
 document.addEventListener("mousemove", (ev) =>
 {
    client.publish("mousepos", {
       x: ev.clientX,
       y: ev.clientY
    })
 })
 
 const mouseSub = client.newSubscription("mousepos")
 mouseSub.on('publication', (ctx) =>
 {
    pos.innerText = "X: " + ctx.data.x + ", Y: " + ctx.data.y
 })
 mouseSub.subscribe()