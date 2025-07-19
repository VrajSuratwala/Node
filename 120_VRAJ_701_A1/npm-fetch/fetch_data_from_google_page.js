import fetch from 'node-fetch';
async function fetch_data_from_google_page(){
    const res = await fetch('https://www.google.com');

    const html = await res.text();
    console.log("Google homepage HTML fetched:");
    console.log(html.slice(0, 500));
}

fetch_data_from_google_page();