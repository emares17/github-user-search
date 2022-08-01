const body = document.querySelector('body');
const toggle = document.querySelector('theme-toggle');
const formError = document.querySelector('.form-error-hide');
const socialLinks = document.querySelectorAll('.user-social-links');

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const avatar = document.getElementById('avatar');
const name = document.getElementById('name');
const username = document.getElementById('username');
const date = document.getElementById('date');
const bio = document.getElementById('bio');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const location = document.getElementById('location');
const website = document.getElementById('website');
const twitter = document.getElementById('twitter');
const company = document.getElementById('company');

let githubUrl = `https://api.github.com/users/:username`;

