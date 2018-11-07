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
