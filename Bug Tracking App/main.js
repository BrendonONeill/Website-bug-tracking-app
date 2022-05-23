'use strict';
class Bug{
    constructor(name,detail,codename)
    {
        this.name = name;
        this.detail = detail;
        this.codename = codename;
    }
}

class User{
    constructor(name,pos,password,email,bugs = [])
    {
        this.name = name;
        this.pos = pos;
        this.password = password;
        this.email = email;
        this.bugs = bugs
    }
}

//This is just a draft of a bugtracking app to create the basic functions in CRUD in the console and without a backend.
//The login system is just there to help me get a understanding of logining in with different users 

//Creates a user in the system
function createUser()
{
    let nameUser = window.prompt("What is your name");
    let posUser= window.prompt("What is your pos");
    let emailUser = window.prompt("What is your Email");
    let passwordUser = window.prompt("What is your Password");
    users.push(new User(nameUser,posUser,passwordUser,emailUser))
    localStorage.setItem("users", JSON.stringify(users));

}

//Creates a new bug in the users bugs list
function createBug()
{
    let nameBug = window.prompt("What is bug");
    let detailBug= window.prompt("What is your bug details");
    let codenameBug = window.prompt("What is your code");
    console.log(userLogined)
    users[userloginedIn].bugs.push(new Bug(nameBug,detailBug,codenameBug))
    localStorage.setItem("users", JSON.stringify(users)); 
}

//The user can update their bugs information
function updateBug()
{
    console.log(users[userloginedIn].bugs)
    let number = window.prompt("what bug do you want to edit");

    let nameBug = window.prompt("What is bug");
    let detailBug= window.prompt("What is your bug details");
    let codenameBug = window.prompt("What is your code");
    users[userloginedIn].bugs[number].name = nameBug
    users[userloginedIn].bugs[number].detail = detailBug
    users[userloginedIn].bugs[number].codename = codenameBug
}

//The user can delete their bugs from their list
function deleteBug()
{
    console.log(users[userloginedIn].bugs)
    let number = window.prompt("what bug do you want to edit");
    users[userloginedIn].bugs.splice(number,1)
}

//Allows the users look at their bugs
function viewBug()
{
    console.log(users[userloginedIn].bugs)
}

//This allows the user to login
function login()
{
    while(!loginUser){
    let nameUser = window.prompt("What is your name");
    let jam = ""
    users.forEach(name => {
        if(name.name === nameUser)
        {
            loginUser = true
            let loginName = name
            passwordLogin(loginName)
            console.log("you have returned")
            jam = name.name
        }
    })
    return jam
    alert("No user with that name in our system")
}
}

// If the user is in the system this function is run
function passwordLogin(user)
{
    while(!passwordUser)
    {
        let passUser = window.prompt("What is your password");
        
            if(user.password === passUser)
            {
                passwordUser = true
                console.log(user.name)
                return
            }
            else
            {
                alert("password is wrong")
            } 
    }
}

// This checks the local storage for the array of users
function checkStorage()
{
    if("users" in localStorage){
        console.log("old")
        return JSON.parse(localStorage.getItem("users"));
        
        
     } else {
        firstTime()
     }
}

 /// If the users doesnt have a local storage of the array it creates a new array
function firstTime()
{
    let users = []
    users.push(new User("Anne","Admin","password","anne@gmail.com"))
    localStorage.setItem("users", JSON.stringify(users)); 
}

// This helps to find who is logined and to filter out the information not used
function waw(username)
{
    console.log(username)
    const index =users.findIndex(user => user.name === username)
    console.log(index)
    return index
    
}


let loginUser = false
let passwordUser = false
const users = checkStorage()
let userLogined = login()
console.log(userLogined)
let userloginedIn = waw(userLogined)
console.log(users)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



