(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const chapterpage = require('chapter-page')

const colors = {
  color0: '#43409a', // darkBlue,
  color1: '#3022bb', // blue,
  color2: '#6f68ae', // lightBlue,
  color3: '#f989ff', // lightPink,
  color4: '#730d61', // darkPink,
  color5: '#080707', // black,
  color6: '#2e3f41', // grey,
  color7: '#f7da8b', // skinYellow,
  color8: '#ffffff', // white,
  color9: 'rgba(255, 255, 255, .0)',
}
const theme = { colors }
// <script type="text/javascript" src="https://embed.typeform.com/embed.js"></script>
//     <iframe id="typeform-full" width="100%" height="100%" frameborder="0" src="https://ninabreznik.typeform.com/to/RnddyU"></iframe>
const data = {
  title: 'Nashville',
  logo: 'assets/wizard3.png',
  home: 'http://wizardamigos.com/',
  tabs: [{
    title: 'workshop',
    url: 'https://slides.com/ninabreznik/deck-11-12-16/embed'
  }],
  chat: 'https://gitter.im/wizardamigosinstitute/program/~embed',
  chapters: []
}

const { title, logo, home, tabs, chat, chapters } = data
document.body.innerHTML = `<h1> Loading data - please wait ... </h1>`
var meetup_api = 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=WizardAmigos&photo-host=public&page=20&fields=&order=time&desc=false&status=upcoming&sig_id=35240262&sig=0ec0705819f4127f8d9396d29db27c58b3f1bb50'
var url = 'https://cors-anywhere.herokuapp.com/' + meetup_api
try {
  var { place, time, event } = JSON.parse(localStorage.lastEvent)
  var old = new Date(time)
  var now = new Date()
  var timeDiff = now.getTime() - old.getTime()
  var diffDays = timeDiff / (1000 * 3600 * 24)
  if (diffDays < 0) throw new Error('cached event is over')
  data.place = place
  data.time = time
  data.event = event
  init(data)
} catch (e) {
  fetch(url)
  .then(response => response.json())
  .then(res => {
    for (var i = 0; i < res.results.length; i++) {
      var place = res.results[i].venue.city
      if (place === title) {
        var event = res.results[i].event_url
        var number = res.results[i].time
        var time = new Date(number).toString()
        break
      }
    }
    localStorage.lastEvent = JSON.stringify({ place, event, time })
    data.place = place
    data.time = time
    data.event = event
    init(data)
  })
}
function init (data) {
  const {
    head,
    body,
  } = chapterpage({ data, theme })
  document.head.innerHTML = head
  document.body.innerHTML = body
}

},{"chapter-page":2}],2:[function(require,module,exports){
module.exports = chapterpage

function chapterpage ({ data = {}, theme = {} }) {
  const {
    color0 = '',
    color1 = '',
    color2 = '',
    color3 = '',
    color4 = '',
    color5 = '',
    color6 = '',
    color7 = '',
    color8 = '',
    color9 = '',
  } = theme.colors || {}
  const {
    fontsize0 = '',
    fontsize1 = '',
    fontsize2 = '',
    fontsize3 = '',
    fontsize4 = '',
    fontsize5 = '',
    fontsize6 = '',
    fontsize7 = '',
    fontsize8 = '',
    fontsize9 = '',
  } = theme.fontsizes || {}
  const { title, place, time, event, home, logo, tabs = [], chat, chapters } = data
  const head = `
    <title> WizardAmigos Chapter - ${title} </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <style>
      html          {
        box-sizing  : border-box;
        display     : table;
        min-width   : 100%;
        margin      : 0;
        font-size   : 18px;
      }
      *,*:before,*:after { box-sizing  : inherit; }
      @font-face    {
        font-family : C64;
        src         : url(assets/C64_Pro-STYLE.woff);
      }
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        height: 100vh;
        width: 100vw;
        background-color: #43409a;
      }
      h3 {
        color: ${color8};
      }
      .tabs {
        display: flex;
        background-color: ${color8};
      }
      .tab {
        font-size: 20px;
        font-weight: bold;
        flex-grow: 1;
        color: ${color5};
        background-color: pink;
        border: 1px solid black;
        cursor: pointer;
      }
      .active {
        color: ${color8};
        background-color: violet;
        border: 1px solid black;
      }
      .iframe {
        display: flex;
        flex-direction: column;
        border: 10px solid ${color8};
        width: 100%;
        height: 100%;
        flex-grow: 1;
      }
      .content {
        display: flex;
        width: 100%;
        height: 100%;
      }
      .input {
        width: 100%;
      }
      .address {
        width: 400px;
      }
      a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
      }
      .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100vw;
        height: 220px;
      }
      .logo {
        margin-left: 20px;
        margin-top: 10px;
        width: 120px;
        height: 120px;
      }
      .title1 {
        color: ${color8};
        font-family: C64;
        margin-left: 10vw;
        font-size: 30px;
      }
      .title1 > span {
        color: ${color3};
      }
      .title2 {
        color: ${color3};
        font-family: C64;
        margin-left: 10vw;
        font-size: 20px;
      }
      .title2 > span {
        color: ${color8};
        text-shadow: ${color3} 0 0 20px;
        animation: pulsate 4s ease-in-out;
        animation-iteration-count: infinite;
        opacity: 0.1
      }
      .webring {
        text-decoration: underline;
        color: ${color4};
        font-family: C64;
        font-size: 30px;
      }
      .chapter {
        color: ${color3};
        font-family: C64;
        font-size: 15px;
      }
      .chapter-list {
        list-style-image: url(assets/wai-icon1.png)
      }
      @keyframes pulsate {
          0% { transform: scale(0.1, 0.1); opacity: 0.1;}
          50% {opacity: 1.0;}
          100% { transform: scale(1.2, 1.2); opacity: 0.1;}
      }
    </style>
  `
  const body = `
    <div class="header">
    <a href="${home}"><img class="logo" src="${logo}"></a>
    <div>
      <h1 class="title1">WizardAmigos Chapter: <span>${title}</span></h1>
      ${(event || '') && `<h2 class="title2"> next event: <span> <a href="${event}" target="_blank"> ${time} </a> </span></h2>`}
    </div>
    </div>
    <div class="content">
      <div class="iframe">
        <div class="tabs">
          ${tabs.length > 1 ? tabs.map(({ title, url }, i) => `
            <button url="${url}" class="${i ? 'tab' : 'tab active'}">${title}</button>`).join('\n') : ''
        }</div>
        <iframe id="tab" width="100%" height="100%" frameborder="0"
          src="${tabs[0].url}"
          allow="geolocation; microphone; camera; autoplay; encrypted-media" allowfullscreen="true">
        </iframe>
      </div>
      <iframe class="iframe" src="${chat}"></iframe>
    </div>
    <h3 class="webring"> other chapters </h3>
    <ul class="chapter-list">${
      chapters.map(({ title, url }) => `<li class="chapter"><a href="${url}">${title}</a></li>`).join('\n')
    }</ul>
  `
  var id = setInterval(() => {
    var buttons = [...document.querySelectorAll('.tab')]
    if (buttons.length) {
      clearInterval(id)
      buttons.forEach(button => {
        button.addEventListener('click', e => {
          var button = e.currentTarget
          if (button.classList.contains('active')) return
          buttons.forEach(btn => {
            if (btn.classList.contains('active')) btn.classList.remove('active')
          })
          button.classList.add('active')
          window.tab.src = button.getAttribute('url')
        })
      })
    }
  }, 100)
  return { head, body }
}

},{}]},{},[1]);
