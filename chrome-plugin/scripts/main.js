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
    shouldTrack: false
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
  app.shouldTrack = response.shouldTrack;
});

$.ajax({
  method: 'GET',
  url: 'http://172.16.1.128:8989/v1/getTodayMood/atmarams@exzeo.com',
}).done((response) => {
  app.moods = response.Moods;
  app.overallMood = response.overAllMood;
});