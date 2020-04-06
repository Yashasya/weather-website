console.log("script tag is been connected")


var weatherForm = document.querySelector("form")
var inp = document.querySelector("input")
const msg1 = document.querySelector("#msg-1")
const msg2 = document.querySelector("#msg-2")
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    msg1.textContent = "loading..."
    msg2.textContent = ''
    if(!inp.value){
        return msg1.textContent= "you have to type an address"
    }
    fetch('http://localhost:3000/weather?address='+inp.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
             msg1.textContent = data.error
        }
        else{
            msg2.textContent = data.forecast
            msg1.textContent = data.location
        }
        
    })
})

})