// required on every page
const every = document.getElementById("every");

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (document.cookie) {
    const cookieValue = getCookie("uid");
    let cookieExists = cookieValue ? true : false;
    if (cookieExists) {
        fetch(`/api/users/${cookieValue}`)
            .then(res => res.json())
            .then((res) => {

                let eve = `<li class="nav-item"><a class="nav-link" id ="logout">Logout</a></li><li class="nav-item" id ="username"><a class="nav-link" >Hi, ${res.firstname}</a></li>`
                every.innerHTML = eve;

                let logout = document.getElementById("logout");
                function handleLogout(event) {
                    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.replace('index.html');
                }
                logout.addEventListener("click", handleLogout)
            })
            .catch(e => console.log(e))
    }
}

// register page
if (window.location.href.includes('register.html')) {
    window.onload = function () {
        const select = document.getElementById("program");

        async function setState() {
            try {
                const progRes = await fetch("/api/programs")
                const programs = await progRes.json()
                let options = programs.map(program => {
                    return `<option value=${program}>${program}</option>`
                })
                options = options.join("")
                select.innerHTML = options
            } catch (e) {
                console.log(e)
            }
        }
        setState();

        const graduationYear = document.getElementById("graduationYear");

        // <option value="2013">2013</option>

        fetch("/api/graduationYears")
            .then(response => response.json())
            .then((data) => {
                let options = data.map(item => `<option value="${item}">${item}</option>`)
                return options;
            })
            .then(res => res.join(""))
            .then(res => graduationYear.innerHTML = res)
            .catch(err => console.log(err))


        const myAlert = document.getElementById("myAlert")
        myAlert.style.display = "none";

        const signupForm = document.getElementById("signupForm");

        function handleSubmit(event) {
            event.preventDefault();
            // const data = new FormData(event.target);
            // const value = Object.fromEntries(data.entries());

            let regInfo = {
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                matricNumber: document.getElementById("matricNumber").value,
                program: document.getElementById("program").value,
                graduationYear: document.getElementById("graduationYear").value,
            }

            // const boss = JSON.stringify(value, null, '  ');
            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(regInfo), // All form data
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((response) => {
                    if (response.status === "ok") {
                        document.cookie = `uid=${response.data.id}; domain=; path=/ `;
                        window.location.replace('index.html'); // redirect user to index.html page
                    }
                    else {
                        myAlert.style.display = "block"
                        let errorData = response.errors.map((item) => {
                            return `${item}<br>`
                        })
                        let errDa = errorData.join("");
                        myAlert.innerHTML = errDa;
                    }
                })
                .catch(e => console.log(e));
        }
        signupForm.addEventListener('submit', handleSubmit);

    }
}

// login page
if (window.location.href.includes('login.html')) {
    window.onload = function () {

        const loginForm = document.getElementById("loginForm");
        const myAlert = document.getElementById("myAlert")
        myAlert.style.display = "none";

        function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries());

            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(value), // All form data
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((response) => {
                    if (response.status === "ok") {
                        document.cookie = `uid=${response.data.id}; domain=; path=/ `;
                        window.location.replace('index.html');
                    }
                    else {
                        myAlert.style.display = "block";
                        let errorData = `<b>Invalid email/password</b>`
                        myAlert.innerHTML = errorData;
                    }
                })
                .catch(e => console.log(e));
        }
        loginForm.addEventListener('submit', handleSubmit);
    }
}

// create project page
if (window.location.href.includes('createproject.html')) {
    window.onload = function () {

        let cookieCheck = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
        if (!cookieCheck) {
            window.location.replace('login.html'); // redirect user to login.html page if cookie doesn't exist
        }

        const createProjectForm = document.getElementById("createProjectForm");
        const myAlert = document.getElementById("myAlert")
        myAlert.style.display = "none";

        function handleSubmit(event) {
            event.preventDefault();
            let tagsInput = (document.getElementById("tags").value).split(",");
            let authorsInput = (document.getElementById("authors").value).split(",");
            let projectInfo = {
                name: document.getElementById("name").value,
                abstract: document.getElementById("abstract").value,
                tags: tagsInput,
                authors: authorsInput,
            }

            fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify(projectInfo), // All form data
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((response) => {
                    if (response.status === "ok") {
                        window.location.replace('index.html'); // redirect user to index.html page
                    }
                    else {
                        myAlert.style.display = "block"
                        let errorData = response.errors.map((item) => {
                            return `${item}<br>`
                        }).join("");
                        myAlert.innerHTML = errorData;
                    }
                })
                .catch(e => console.log(e));
        }
        createProjectForm.addEventListener('submit', handleSubmit);

    }
}

//index page
if (window.location.href.includes('index.html')) {
    window.onload = function () {


        let showcase = document.querySelector(".showcase");
        showcase.innerHTML = "";

        fetch("/api/projects")
            .then(res => res.json())
            .then((response) => {
                for (let i = 0; i < 4; i++) {
                    // Create card contents
                    let projectTitle = document.createElement('a');
                    projectTitle.href = `viewproject.html?id=${response[i].id}`;
                    projectTitle.className = "card-title";
                    projectTitle.textContent = response[i].name;
                    let projectAuthor = document.createElement('h6')
                    projectAuthor.className = "card-subtitle";
                    projectAuthor.textContent = response[i].authors
                    let projectAbstract = document.createElement('p')
                    projectAbstract.className = "card-text";
                    projectAbstract.textContent = response[i].abstract
                    let projectTags = document.createElement('p')
                    projectTags.className = "card-text";
                    projectTags.textContent = response[i].tags
                    // Create card body div
                    let cardBody = document.createElement('div');
                    cardBody.className = "card-body";
                    // Create card main div
                    let cardMain = document.createElement('div');
                    cardMain.className = "card";
                    cardMain.classList.add("col");
                    // Append all appendables
                    cardMain.appendChild(cardBody);
                    cardBody.appendChild(projectTitle);
                    cardBody.appendChild(projectAuthor);
                    cardBody.appendChild(projectAbstract);
                    cardBody.appendChild(projectTags);
                    document.getElementsByClassName("showcase")[0].appendChild(cardMain);
                }
            })
    }
}

// view page
if (window.location.href.includes('viewproject.html')) {
    window.onload = function () {

        let params = new URLSearchParams(document.location.search.substring(1));
        let pId = params.get("id");

        fetch(`/api/projects/${pId}`)
            .then(res => res.json())
            .then((res) => {
                const project_name = document.getElementById("project_name");
                project_name.innerHTML = `<h3>${res.name}</h3>`;

                const project_abstract = document.getElementById("project_abstract");
                project_abstract.textContent = `${res.abstract}`;

                const project_authors = document.getElementById("project_authors");

                let authors = res.authors.map((item) => {
                    return `<p class="card-text">${item}</p>`
                }).join("");
                project_authors.innerHTML = authors;


                let projectTags = res.tags;
                document.getElementById("project_tags").innerHTML = projectTags


                let project_author = document.getElementById("project_author");

                fetch(`/api/users/${res.createdBy}`)
                    .then(res => res.json())
                    .then((res) => {
                        project_author.textContent = `${res.firstname} ${res.lastname} `
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))

    }
}