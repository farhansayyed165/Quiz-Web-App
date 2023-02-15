const content = [
    {question:"1. Name the lightest gas on earth.", a:"Oxygen",b:"Hydrogen",c:"Nitrogen",d:"Helium", answer:"Hydrogen"},
    {question:"2. What is the largest desert in the world?", a:"Antarctica",b:"Sahara",c:"Arabian Desert",d:"Gobi Desert", answer:"Antarctica"},
    {question:"3. What is a material that will not carry an electrical charge called?", a:"Conductor",b:"Semicondoctor",c:"Insulator",d:"None of the above", answer:"Insulator"},
    {question:"4. Roughly how long does it take for the Sun’s light to reach Earth?", a:"8 Days",b:"8 Hours",c:"8 minutes",d:"8 seconds", answer:"8 minutes"},
    {question:"5. How many bones do sharks have in their bodies?", a:"0 Bones",b:"201 Bones",c:"400 Bones",d:"98 Bones", answer:"0 Bones"}
]

const questions = document.querySelectorAll(".question");
let index = 1;

for(let i = 0;i<=(questions.length-1);i++){
    questions[i].innerHTML = content[i].question;
    
    let option_a = document.getElementById("a"+index+"_text")
    let option_b = document.getElementById("b"+index+"_text")
    let option_c = document.getElementById("c"+index+"_text")
    let option_d = document.getElementById("d"+index+"_text")
    
    index++;
    
    option_a.innerHTML=content[i].a
    option_b.innerHTML=content[i].b
    option_c.innerHTML=content[i].c
    option_d.innerHTML=content[i].d
}




// Getting elements from DOM
const form = document.querySelector("#form");
const track = document.querySelector('.AllTemplates');
const slides = Array.from(track.children);
const base = document.querySelector('.base');

const progress = document.querySelector('.carousel-progress-bar');

const start = document.querySelector(".startDiv");
const startButton = document.getElementById("start");

const next = document.querySelector('.next');
const prev = document.querySelector('.previous');

const yes = document.querySelector(".yes");
const no = document.querySelector(".no");
const submit = document.querySelector('.Submit');

const ok = document.querySelector(".warning button");
const warning = document.querySelector(".warning");

const score = document.querySelector(".score");

const restart = document.querySelector(".restart");


//Calculating what width the Progress Bar will have depending on the child elements i.e. Number of Questions
const baseWidth = base.offsetWidth;
const addToProgress =  (baseWidth/(slides.length-1));//Important Constant we will use in the Eventlisteners
let progressW = progress.offsetWidth;
progress.style.width = 0+'px';


const lastlast = slides[slides.length-2];
const firstSlide = slides[1];
const SecondSlide = slides[2];


let nextMult = 2;
let prevMult = nextMult-1


// Now, actual coding

// Getting Width of the template
let slidesLenght = slides.length;


// Setting up the templates
const setSlidePosition = (slide, index)=>{
    slide.style.left = 100*index+'%;';
    
}

slides.forEach((slide, index)=>{
    slide.style.left = 100 * index + '%';
});





// Adding  Eventlisteners 

startButton.addEventListener('click',StartButton);


next.addEventListener('click',NextButtonListener)

prev.addEventListener('click', PreviousButtonListener)


yes.addEventListener('click',()=>{
    submit.setAttribute("visible","true");
    prev.setAttribute("visible", "false")
    yes.style.display = 'none';
    no.innerHTML = "Go Back";
})

no.addEventListener('click',NoButtonListener)


ok.addEventListener("click",(_e)=>{
    warning.classList.remove("visible");
    warning.setAttribute("visible","false");
    base.classList.remove("blur");
})

form.addEventListener("submit",submitHandler)



restart.addEventListener('click',()=>{
    document.location.reload()
});





// All The Functions

function NoButtonListener(_e){
    submit.setAttribute("visible","false");
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.previousElementSibling;
    moveToSlide(track,currentSlide,nextSlide);
    prevMult--;
    nextMult--;
    progress.style.width = prevMult*addToProgress+'px';
    next.style.display = 'inline-block';
    prev.setAttribute("visible", "true")
    yes.style.display = 'inline-block';
    no.innerHTML = "No";
}


function moveToSlide(track, currentSlide, targetSlide){
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
}


function StartButton(e){
    startButton.style.display='none';
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track,currentSlide,nextSlide);


    progress.style.width = (addToProgress)+'px';
    document.querySelector(".option_footer").style.display="flex";
    prev.style.display="none";
}



function NextButtonListener(_e){
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track,currentSlide,nextSlide);

    // For Progress bar width changes 
    if(currentSlide === lastlast){
        progress.style.width = nextMult * addToProgress+'px';
        next.style.display = 'none';
        // submit.setAttribute("visible","true");

    }
    if(currentSlide === firstSlide){

        progress.style.width = nextMult * addToProgress+'px';
        nextMult++;
        prevMult++;
        prev.style.display="inline-block";
    }
    else{
        // let progressWidth = progress.offsetWidth;
        progress.style.width = nextMult*addToProgress+'px';
        nextMult++;
        prevMult++;
    }
} 



function PreviousButtonListener(_e){
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.previousElementSibling;
    moveToSlide(track,currentSlide,nextSlide);
    
    
    // For Progress bar width changes

    if(currentSlide === slides[slides.length-1]){
        progress.style.width = prevMult*addToProgress+'px';
        next.style.display = 'inline-block';

    }

    if(currentSlide === SecondSlide){
        nextMult--;
        prevMult--;
        progress.style.width = addToProgress+'px';
        prev.style.display="none";

    }
    else{
        nextMult--;
        prevMult--;
        progress.style.width = prevMult*addToProgress+'px';

    }

}


function submitHandler(event){
    event.preventDefault();
    radio = document.querySelectorAll("input[type='radio']");
    checked = document.querySelectorAll("li input[type='radio']:checked + label");
    if (checked.length<content.length){
        warning.classList.add("visible");
        warning.setAttribute("visible","true");
        base.classList.add("blur");
        return ;
    }
    let marks_scored=0;
    for(let i = 0; i<=(content.length-1);i++){
        if(checked[i].innerHTML===content[i].answer){
            marks_scored = marks_scored+1;
        }
    }

    if(marks_scored<2){
        document.querySelector(".ScoreBefore").innerHTML = "Better Luck Next Time :(";
    }
    else if(marks_scored===checked.length){
        document.querySelector(".ScoreBefore").innerHTML = "🥳You did it! Full marks";
    }
    else{
        document.querySelector(".ScoreBefore").innerHTML = "You did well!👍";
        console.log(marks_scored);
    }

    let final_score = marks_scored+" out of "+checked.length+"!";
    score.innerHTML = final_score;

    let final_screen = document.querySelector(".thank_you")
    final_screen.setAttribute("visible","true")
    base.classList.add("blur");
    final_screen.classList.add("visible")
}