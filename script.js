const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = 'https://dummyjson.com/quotes'
    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        // console.log(data.quotes[Math.floor(Math.random() * 31)]);

        const qData = data.quotes[Math.floor(Math.random() * 31)];
        // If Author is blank, add 'Unknown'
        if (qData.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = qData.author;
        }
        // Reduce font size for long quotes
        if (qData.quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = qData.quote;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

