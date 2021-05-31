let quotes = ["Fools ignore complexity. Pragmatists suffer it. Some can avoid it. Geniuses remove it.", 
"Dealing with failure is easy: Work hard to improve. Success is also easy to handle: You've solved the wrong problem. Work hard to improve.",
"You think you know when you learn, are more sure when you can write, even more when you can teach, but certain when you can program.",
"Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter.",
"Students should be evaluated on how well they can achieve the goals they strived to achieve within a realistic context. Students need to learn to do things, not know things.", 
"Talk is cheap. Show me the code. -Linus",
"Programs must be written for people to read, and only incidentally for machines to execute.",
"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live",
"Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
"The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly. A programmer is ideally an essayist who works with traditional aesthetic and literary forms as well as mathematical concepts, to communicate the way that an algorithm works and to convince a reader that the results will be correct.",
"“I'm not a great programmer; I'm just a good programmer with great habits. - Kent Beck",
"Truth can only be found in one place: the code. - Robert C.Martin",
"The most important property of a program is whether it accomplishes the intention of its user.",
"Remember that code is really the language in which we ultimately express the requirements. We may create languages that are closer to the requirements. We may create tools that help us parse and assemble those requirements into formal structures. But we will never eliminate necessary precision—so there will always be code.",
"Some of the best programming is done on paper, really. Putting it into the computer is just a minor detail.",
"Don't gloss over a routine or piece of code involved in the bug because you 'know' it works. Prove it. Prove it in this context, with this data, with these boundary conditions.",
"The issue of finding the best possible answer or achieving maximum efficiency usually arises in industry only after serious performance or legal troubles.",
"i am committed to push my branch to the master",
"Take time to learn the closest thing that we have to a SUPERPOWER - Code",
"Web development is difficult, only then it is fun to do. You just have to set your standards. If it were to be easy, would anyone do it?",
"Code is there to explain the comments to the computer.",
"Programming is learned by writing programs.",
"No matter which field of work you want to go in, it is of great importance to learn at least one programming language.",
"If you optimize everything, you will always be unhappy.",
"Coding is not just code, that is a live thing to serve everyone!",
"There are many terrible mistakes to make in program design, and you should go ahead and make them so that you understand them. A sense of what a good program looks like is developed in practice, not learned from a list of rules.",
"Tests shouldn’t verify units of code. Instead they should verify units of behavior: something that is meaningful for the problem domain and ideally something that a business person can recognize as useful. The number of classes it takes to implement such a unit of behavior is irrelevant. The unit could span across multiple classes or only one class, or even take up just a tiny method. [...] A test should tell a story about the problem your code helps to share, and this story should be cohesive and meaningful to a non-programmer.",
"Theory is when you know something, but it doesn't work. Practice is when something works, but you don't know why. Programmers combine theory and practice: Nothing works and they don't know why.",
"It's not a bug; it's an undocumented feature.",
"Code is read more than it is written.",
"For years, coders have been programming computers so that they perform repetitive tasks for us. Now they automate our repetitive thoughts.",
"Everybody in this country should learn to program a computer, because it teaches you how to think",
"The only way to go fast, is to go well.",
"I'm a programmer. I like programming. And the best way I've found to have a positive impact on code is to write it.",
"Happiness should be a function without any parameters."];

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
        statusEle.innerHTML = `Congratulations!!!! You took ${typedTimeInSeconds} seconds to complete. This is equivalent to WPM <span id="wpm"> ${pwm}</span>`;
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
