/*
export default function ({ $axios, app, store, redirect }) {
  $axios.defaults.baseURL = "http://35.177.24.171/wp-json/";
  
  $axios.onRequest(config => {
    if (store.state.authToken) {
      config.headers.common['Content-Type'] = 'application/json';
      config.headers.common['Access-Control-Allow-Origin'] = '*';
    }
  });
  
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  });
  
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect('/400');
    }
    if(code === 500) {
      redirect('/sorry');
    }
  });
}
*/
