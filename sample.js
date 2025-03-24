let username=document.querySelector('.username')
let email=document.querySelector('.email');
let peronalname=document.querySelector('.personalname'),
register=document.querySelector('.register-btn');
let login=document.querySelector('.login-btn')
let obj={};
let arr=JSON.parse(localStorage.getItem('username'))||[];

register.addEventListener('click',(e)=>{
    e.preventDefault();
    inputValidation(username,email,peronalname)
})

// window.onload=()=>{
//     if(JSON.parse(localStorage.getItem('displayName'))!=""){
//         window.location.href='dashboard.html'
//     }
// }

function inputValidation(user,mail,n){
let emailCheck= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|in)$/.test(mail.value)
    if(user.value.trim()==""){alertMsg('error','Input is empty')}
    else if(!emailCheck){alertMsg('error','Invalid email format')}
    else if(n.value.trim()==""){alertMsg('error','Name field is empty')}
    else{alertMsg('success',"Data success");
    obj={'username':username.value,'email':email.value,'personalname':peronalname.value}    
    success() }
}

login.addEventListener('click',(e)=>{
    e.preventDefault()
    let loginName=document.querySelector('.loginName'),
    loginEmail=document.querySelector('.loginEmail');
    let some=arr.some((x)=>{return loginName.value===x.username && loginEmail.value===x.email; })
    if(some){sessionStorage.setItem('user',JSON.stringify(loginName.value)); window.location.href='dashboard.html'}else{alert('Invalid details'); return;}
    })    

function success(){
    arr.push(obj)
    localStorage.setItem('username',JSON.stringify(arr))
    window.location.href='index.html';
}

function alertMsg(clssName,msg){
    let span=document.querySelector('span')
    span.classList.add(clssName);span.textContent=msg
    setTimeout(() => {
        span.classList.remove(clssName);span.textContent=''
    }, 1500);
}
console.log(displayName);

