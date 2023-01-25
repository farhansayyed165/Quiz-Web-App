const content = [
    {question:"2 1. Name the lightest gas on earth.", a:"Oxygen",b:"Hydrogen",c:"Nitrogen",d:"Helium", answer:"Hydrogen"},
    {question:"3 2. What is the largest desert in the world?", a:"Antarctica",b:"Sahara",c:"Arabian Desert",d:"Gobi Desert", answer:"Antarctica"},
    {question:"4 3. What is a material that will not carry an electrical charge called?", a:"Conductor",b:"Semicondoctor",c:"Insulator",d:"None of the above", answer:"Insulator"},
    {question:"5 4. Roughly how long does it take for the Sun’s light to reach Earth?", a:"8 Days",b:"8 Hours",c:"8 minutes",d:"8 seconds", answer:"8 minutes"},
    {question:"6 5. How many bones do sharks have in their bodies?", a:"0 Bones",b:"201 Bones",c:"400 Bones",d:"98 Bones", answer:"0 Bones"}
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
// (our track that contains all the questions and options, An array of individual children, next and previous button)
const track = document.querySelector('.AllTemplates');
const slides = Array.from(track.children);
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');
const submit = document.querySelector('.Submit');
const form = document.querySelector("#form");
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")

const start = document.querySelector(".startDiv");
const startButton = document.getElementById("start");

//Getting Progress Bar and the Base for calculations
const progress = document.querySelector('.carousel-progress-bar');
const base = document.querySelector('.base');

const score = document.querySelector(".score")

//Calculating what width the Progress Bar will have depending on the child elements i.e. Number of Questions
const baseWidth = base.offsetWidth;
const addToProgress =  (baseWidth/(slides.length-1));//Important Constant we will use in the Eventlisteners
let progressW = progress.offsetWidth;
progress.style.width = 0+'px';




// Now, actual coding

// Getting Width of the template
let slidesLenght = slides.length;


// Setting up the templates
const setSlidePosition = (slide, index)=>{
    slide.style.left = 100*index+'%;';
    
}

slides.forEach((slide, index)=>{
    slide.style.left = 100 * index + '%';
    // console.log(slide);
});


// Adding  Eventlisteners that will slide questions as well as modify the progress bar 

startButton.addEventListener('click',_e=>{
    startButton.style.display='none';
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track,currentSlide,nextSlide);


    progress.style.width = (addToProgress)+'px';
    document.querySelector(".option_footer").style.display="flex";
    prev.style.display="none";
});




function moveToSlide(track, currentSlide, targetSlide){
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
}



const lastlast = slides[slides.length-2];
const firstSlide = slides[1];
const SecondSlide = slides[2];


let nextMult = 2;
let prevMult = nextMult-1
next.addEventListener('click',e=>{
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
        // let progressWidth = progress.offsetWidth;
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
    


})




prev.addEventListener('click', e=>{
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.previousElementSibling;
    moveToSlide(track,currentSlide,nextSlide);
    
    
    // For Progress bar width changes

    if(currentSlide === slides[slides.length-1]){
        progress.style.width = prevMult*addToProgress+'px';
        next.style.display = 'inline-block';

    }

    //set
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

})

yes.addEventListener('click',()=>{
    submit.setAttribute("visible","true");
    // prev.style.display = 'none';
    prev.setAttribute("visible", "false")
    yes.style.display = 'none';
    no.innerHTML = "Go Back";
})

no.addEventListener('click',()=>{
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
})





form.addEventListener("submit",submitHandle)

function submitHandle(event){
    event.preventDefault();
    radio = document.querySelectorAll("input[type='radio']");
    checked = document.querySelectorAll("li input[type='radio']:checked + label");
    // if (checked.length<content.length){
    //     return alert("Please choose one answer from each question!");
    // }
    let marks_scored=0;
    for(let i = 0; i<=(content.length-1);i++){
        if(checked[i].innerHTML===content[i].answer){
            marks_scored = marks_scored+1;
        }
    }

    if(marks_scored<=2){
        document.querySelector(".ScoreBefore").innerHTML = "Better Luck Next Time :(";
    }
    if(marks_scored===checked.length){
        document.querySelector(".ScoreBefore").innerHTML = "🥳You did it! Full marks";
    }
    else{
        document.querySelector(".ScoreBefore").innerHTML = "You did well!👍";

    }

    let final_score = marks_scored+" out of "+checked.length+"!"
    score.innerHTML = final_score;

    let final_screen = document.querySelector(".thank_you")
    base.classList.add("blur");
    final_screen.classList.add("visible")
}







