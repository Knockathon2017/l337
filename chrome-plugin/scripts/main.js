const dateString = new Date().toString();
const app = new Vue({
  el: '#face-trace',
  data: {
    moods: {
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0
    },
    overallMood: "",
    shouldTrack: false,
    messages: {
      anger: {
        title: 'Hey, I think you are angry',
        description: 'They say meditation helps to calm you down. Give it a try maybe?'
      },
      contempt: {
        title: 'You seem to be contempt today',
        description: 'Lorem Ipsum Dolor Sit Amet'
      },
      disgust: {
        title: 'Are you digsusted with something?',
        description: 'How about some feel good classics?'
      },
      fear: {
        title: '',
        description: 'They say meditation helps to calm you down. Give it a try maybe?'
      },
      happiness: {
        title: 'Hey, I think you\'re happy.',
        description: 'It\'s all the little things in life that makes you happy.'
      },
      neutral: 0,
      sadness: {
        title: 'Why the blues today?',
        description: 'Let\'s turn that frown upside down.'
      },
      surprise: 0
    },
    currentDate: dateString.slice(4, 11)
  },
  methods: {
    toggleTrack: function() {
      chrome.runtime.sendMessage({
        type: this.shouldTrack ? 'startCamera' : 'stopCamera'
      });
    }
  }
});

chrome.storage.local.get('shouldTrack', (response) => {
  console.log('Track', response.shouldTrack);
  app.shouldTrack = response.shouldTrack;
});

$.ajax({
  method: 'GET',
  url: 'http://172.16.1.128:8989/v1/getTodayMood/atmarams@exzeo.com',
}).done((response) => {
  app.moods = response.Moods;
  app.overallMood = response.overAllMood;
});