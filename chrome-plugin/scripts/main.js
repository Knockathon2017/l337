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
    overallMood: ""
  },
});

$.ajax({
  method: 'GET',
  url: 'http://172.16.1.128:8989/v1/getTodayMood/atmarams@exzeo.com',
}).done((response) => {
  console.log('Response', response)
  app.moods = response.Moods;
  app.overallMood = response.overAllMood;
  console.log(app.overallMood);
});