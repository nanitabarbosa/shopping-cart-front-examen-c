function logout() {
    localStorage.removeItem('token')
    location.href = '../index.html'
}
tokenValidate()

function tokenValidate(){
    const TOKEN=localStorage.getItem('token')
    console.log(TOKEN)
    if(TOKEN === null){
        location.href = '../index.html'
    }
    console.log("autenticado",TOKEN)
}

