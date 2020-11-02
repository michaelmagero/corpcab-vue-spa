import axios from 'axios'


axios.defaults.url = 'https://corpcab.co.ke/safdaraja' // the prefix of the URL
axios.defaults.headers.get['Accept'] = 'application/json'   // default header for all get request