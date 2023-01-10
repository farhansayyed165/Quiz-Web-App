// Getting elements from DOM
// (our track that contains all the questions and options, An array of individual children, next and previous button)
const track = document.querySelector('.AllTemplates');
const slides = Array.from(track.children);
const next = document.querySelector('.next');
const prev = document.querySelector('.previous');

//Getting Progress Bar and the Base for calculations
const progress = document.querySelector('.carousel-progress-bar');
const base = document.querySelector('.base');
const lastlast = slides[slides.length-2]
console.log('haha');
console.log(lastlast);


//Calculating what width the Progress Bar will have depending on the child elements i.e. Number of Questions
const baseWidth = base.offsetWidth;
const addToProgress =  (baseWidth/slides.length-1); //Important Constant we will use in the Eventlisteners
let progressW = progress.offsetWidth;
progress.style.width = addToProgress+'px';
console.log(`BaseWidth ${baseWidth}`);




// Now, actual coding

// Getting Width of the template
const sWidth = slides[0].getBoundingClientRect().width;
console.log(sWidth);
let i = slides.length;


// Setting up the templates
const setSlidePosition = (slide, index)=>{
    slide.style.left = 100*index+'%;';
    
}

slides.forEach((slide, index)=>{
    slide.style.left = 100 * index + '%';
    console.log(slide);
});


// Adding  Eventlisteners that will slide questions as well as modify the progress bar 

function moveToSlide(track, currentSlide, targetSlide){
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
}



next.addEventListener('click',e=>{
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    const amountToMove = nextSlide.style.left;
    moveToSlide(track,currentSlide,nextSlide);

    // For Progress bar width changes 
    // if (currentSlide !== document.getElementsByClassName('Template').firstChild){
        
    // }
    if(currentSlide === lastlast){
        progress.style.width = baseWidth+'px';
        console.log("Lastone");
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
    if (currentSlide === document.getElementsByClassName('Template').firstChild){
        progress.style.width = addToProgress;
    }
    else{
    progress.style.width = progressWidth - addToProgress+'px';
    }

})


