const app = new Vue({
  el: '#face-trace',
  data: {
    moods: {},
    overallMood: ""
  },
});

$.ajax({
  method: 'GET',
  url: 'http://172.16.1.128:8989/v1/getTodayMood/diptii86@gmail.com',
}).done((response) => {
  console.log('Response', response)
  app.moods = response.Moods;
  app.overallMood = response.overAllMood;
  console.log(app.overallMood);
});