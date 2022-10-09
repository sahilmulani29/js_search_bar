
(function(){
    let users = [];
    window.onload = init;

    function init(){
        const searchInput = document.getElementById("search_bar");
        searchInput.addEventListener('input' , (evt)=>{
            let value = evt.target.value.toLowerCase().trim();
            if(users.length > 0){
                users.forEach(user => {
                    const visible = user.first_name.toLowerCase().includes(value);
                    user.element.classList.toggle('hide' , !visible)
                });
            }
        })
    }

    function getUsers(){
        fetch('https://reqres.in/api/users?page=2')
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            setUserList(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    function setUserList(userList){
        const userListContainer = document.getElementById('user_list');
        const searchInput = document.getElementById('search_bar');
        users = userList.map((user)=>{
            const mainDiv = document.createElement('div');
            const subDiv = document.createElement('div');
            const img = document.createElement('img');
            const h6 = document.createElement('h6');
            h6.textContent = user.first_name + ' ' + user.last_name;
            img.src = user.avatar;
            subDiv.appendChild(img);
            subDiv.appendChild(h6);
            mainDiv.appendChild(subDiv);
            userListContainer.appendChild(mainDiv);
            return {
                first_name : user.first_name,
                element : mainDiv
            }
        })
    }

    getUsers();
})()

