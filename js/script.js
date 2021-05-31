let quotes = ["Fools ignore complexity. Pragmatists suffer it. Some can avoid it. Geniuses remove it.", 
"Dealing with failure is easy: Work hard to improve. Success is also easy to handle: You've solved the wrong problem. Work hard to improve.",
"You think you know when you learn, are more sure when you can write, even more when you can teach, but certain when you can program.",
"Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter.",
"Students should be evaluated on how well they can achieve the goals they strived to achieve within a realistic context. Students need to learn to do things, not know things."];

let textContent = document.getElementById("text-content");

let typingContent = document.getElementById("typing-content");

let statusEle = document.getElementById("status-content");

let startBtn = document.getElementById("start-btn");
getRandomValue = function(maxValue)
{
    return Math.floor(Math.random() * maxValue);
}


let spannedWords = [];
let words = [];
let currentWord = 0;
let typingStartTime;
let selectedQuote;
startBtn.addEventListener("click", ()=> {
    currentWord = 0;
    let currentIndex = getRandomValue(quotes.length);
    selectedQuote =  quotes[currentIndex];
    typingContent.disabled = false;

    words = selectedQuote.split(" ");

    spannedWords  = words.map(word => `<span>${word} </span>`)
    textContent.innerHTML = spannedWords.join(' ');
    console.log(spannedWords);
    textContent.childNodes[currentWord].className = 'highlight';
    typingContent.focus();
    typingStartTime = new Date();

    statusEle.innerHTML = '';

});

typingContent.addEventListener("input", () => {
    let typedWord = typingContent.value;
    if (currentWord == words.length - 1 && typedWord.trim() == words[currentWord])
    {
        typingContent.value = '';
        typingContent.disabled = true;
        console.log(`Success!!! currentWord ${currentWord}: words length : ${words.length}`);
        let completedTime = new Date();
        let typedTimeInSeconds = (completedTime - typingStartTime) / 1000 ;
        let pwm = selectedQuote.length * 60 / (4.7 * typedTimeInSeconds);
        pwm = pwm.toFixed(2);
        statusEle.innerHTML = `Congratulations!!!! You took ${typedTimeInSeconds} seconds to complete. This is equal to WPM <span id="wpm"> ${pwm}</span>`;
        textContent.getElementsByTagName('span')[currentWord].className = '';
    }
    else if (typedWord.endsWith(' ') && typedWord.trim() == words[currentWord].trim())
    {
        textContent.getElementsByTagName('span')[currentWord].className = '';
        currentWord++;
        typingContent.value = '';
        if (currentWord < words.length)
        {
            textContent.getElementsByTagName('span')[currentWord].className = 'highlight';
        }
    }
    else if (words[currentWord].startsWith(typedWord))
    {
        typingContent.className = '';
    }
    else
    {
        typingContent.className = 'error';
    }
});
