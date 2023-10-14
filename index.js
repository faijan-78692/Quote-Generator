const container = document.getElementById('container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const twitterBtn = document.getElementById('twitter-btn');
const facebookBtn = document.getElementById('fb-btn');
const newQuoteBtn = document.getElementById('quote-btn');
const loader = document.getElementById('loader');

let apiQuotes = [];

function newQuotes() {
    loading();

    const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (apiQuotes.length > 50) {
        quoteText.classList.add("long-quote");
    }
    else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = newQuote.text;

    if (newQuote.author == null) {
        authorText.textContent = "Unknown";
    }
    else {
        authorText.textContent = newQuote.author;
    }

    complete();
}

function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweeterUrl, '_blank');
}

function fbQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const fbUrl = `https://facebook.com/intent/post?text=${quote} - ${author}`;
    window.open(fbUrl, '_blank');
}
    twitterBtn.addEventListener('click', tweetQuote);
    facebookBtn.addEventListener('click', fbQuote);
    newQuoteBtn.addEventListener('click', getQuote);



  async function getQuote() {
    loading();
    try {
        const apiUrl = 'https://type.fit/api/quotes';
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
        newQuotes();
    } 
    catch (error) {
        console.log(error);
    }
  }

  function loading() {
    loader.hidden = false;
    container.hidden = true;
  }
  function complete() {
    container.hidden = false;
    loader.hidden = true;
  }
 
  getQuote();  