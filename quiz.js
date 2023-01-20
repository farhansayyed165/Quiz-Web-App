// Getting elements from DOM
// (our track that contains all the questions and options, An array of individual children, next and previous button)
const track = document.querySelector('.AllTemplates');
const slides = Array.from(track.children);
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');
const submit = document.querySelector('.Submit');
const form = document.querySelector("#form");

const start = document.querySelector(".startDiv");
const startButton = document.getElementById("start");

//Getting Progress Bar and the Base for calculations
const progress = document.querySelector('.carousel-progress-bar');
const base = document.querySelector('.base');



//Calculating what width the Progress Bar will have depending on the child elements i.e. Number of Questions
const baseWidth = base.offsetWidth;
const addToProgress =  (baseWidth/(slides.length-1));//Important Constant we will use in the Eventlisteners
console.log(addToProgress);
let progressW = progress.offsetWidth;
progress.style.width = 0+'px';
console.log(`BaseWidth ${baseWidth}`);




// Now, actual coding

// Getting Width of the template
let i = slides.length;


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


    let progressWidth = progress.offsetWidth;
    progress.style.width =progressWidth + (addToProgress)+'px';
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
console.log(slides[(slides.length-2)]);

next.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    // const amountToMove = nextSlide.style.left;
    moveToSlide(track,currentSlide,nextSlide);

    // For Progress bar width changes 
    if(currentSlide === lastlast){
        progress.style.width = baseWidth+'px';
        next.style.display = 'none';
        console.log(baseWidth);
    }
    if(currentSlide === firstSlide){
        let progressWidth = progress.offsetWidth;
        progress.style.width = progressWidth + addToProgress+'px';
        prev.style.display="inline-block";
    }
    else{
        let progressWidth = progress.offsetWidth;
        progress.style.width = progressWidth + addToProgress+'px';
    }
})

prev.addEventListener('click', e=>{
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.previousElementSibling;
    moveToSlide(track,currentSlide,nextSlide);
    
    
    // For Progress bar width changes 
    let progressWidth = progress.offsetWidth;
    if(currentSlide === slides[slides.length-1]){
        progress.style.width = progressWidth - addToProgress+'px';
        next.style.display = 'inline-block';
    }
    if (currentSlide === document.getElementsByClassName('Template').firstChild){
        
        progress.style.width = addToProgress;
    }
    if(currentSlide === SecondSlide){
        progress.style.width = progressWidth - addToProgress+'px';
        prev.style.display = 'none';
    }
    else{
    progress.style.width = progressWidth - addToProgress+'px';
    }

})



form.addEventListener("submit",submitHandle)

function submitHandle(event){
    event.preventDefault();

}







