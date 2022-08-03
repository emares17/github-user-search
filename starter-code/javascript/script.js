const body = document.querySelector('body');
const toggle = document.querySelector('theme-toggle');
const formError = document.querySelector('.form-error-hide');
const socialLinks = document.querySelectorAll('.user-social-links');

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const avatar = document.getElementById('avatar');
const fullname = document.getElementById('name');
const username = document.getElementById('username');
const date = document.getElementById('date');
const userBio = document.getElementById('bio');
const repos = document.getElementById('repos');
const userfollowers = document.getElementById('followers');
const userfollowing = document.getElementById('following');
const userlocation = document.getElementById('location');
const website = document.getElementById('website');
const twitter = document.getElementById('twitter');
const usercompany = document.getElementById('company');

let githubUrl = `https://api.github.com/users/:username`;

function startSearch() {
    return search.value.trim() || 'octocat';
}

function dataFetch(githubUrl) {
    fetch(githubUrl.replace(':username', startSearch()))
        .then(res => {
            return res.json();
        }).then(responseParsed => {
            userValidation(responseParsed);
        }).catch(err => {
            alert('Error loading data');
            console.log(err);
        })
}

function userValidation(data) {
    if (data.message === 'Not Found') {
        formError.innerText = data.message;
        formError.classList.replace('form-error-hide', 'form-error-show');
    } else {
        formError.classList.replace('form-error-show', 'form-error-hide');
        profileData(data);
    }
}

function profileData(data) {
    let {
        login, 
        avatar_url, 
        html_url, 
        name, 
        company, 
        blog, 
        location, 
        bio, 
        twitter_username, 
        public_repos, 
        followers, 
        following, 
        created_at
    } = data;
    
    let dateCreated = new Date(created_at);
    let dateJoined = dateCreated.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

    avatar.setAttribute('src', avatar_url);

    fullname.textContent = name || login;
    username.textContent = `@${login}`;
    username.setAttribute('href', html_url);
    date.textContent = `Joined ${dateJoined}`;
    userBio.textContent = bio || `This profile has no bio`;
    repos.textContent = public_repos;
    userfollowers.textContent = followers;
    userfollowing.textContent = following;
    userlocation.textContent = location || `Not Available`;
    website.textContent = blog || `Not Available`;
    twitter.textContent = (twitter_username) ? `@${twitter_username}` : `Not Available`;
    usercompany.textContent = company || `Not Available`;
    
    for (let i = 0; i < socialLinks.length; i++) {
        socialLinks[i].firstElementChild.classList.remove('user-social-links-error');
        socialLinks[i].firstElementChild.classList.remove('user-svg-error');
    }

    if (!location) {
        userlocation.previousElementSibling.classList.add('user-svg-error')
        userlocation.classList.add('user-social-links-error')
    }

    if (blog) {
        website.setAttribute('href', blog);
    } else {
        website.previousElementSibling.classList.add('user-svg-error')
        website.classList.add('user-social-links-error')
    }

    if (twitter_username) {
        twitter.setAttribute('href', `https://twitter.com/${twitter_username}`);
    } else {
        twitter.previousElementSibling.classList.add('user-svg-error')
        twitter.classList.add('user-social-links-error')
    }

    if (company) {
        usercompany.setAttribute('href', `https://github.com/${company}`);
    } else {
        usercompany.previousElementSibling.classList.add('user-svg-error')
        usercompany.classList.add('user-social-links-error')
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (search.value) dataFetch(githubUrl);
})

dataFetch(githubUrl);