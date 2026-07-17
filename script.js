/* ==========================================================
   THE JOURNEY TO JULY 19 🌻
   PREMIUM CINEMATIC EDITION

   MAIN JAVASCRIPT ENGINE

========================================================== */


document.addEventListener("DOMContentLoaded",()=>{





/* ==========================================================
   BASIC HELPERS
========================================================== */


const get = (id)=>document.getElementById(id);








/* ==========================================================
   JOURNEY STATE
========================================================== */


const Journey = {


    currentChapter:0,


    locked:false,


    musicStarted:false,


    starsCollected:0


};









/* ==========================================================
   LOADER
========================================================== */


const loader=get("loader");

const loaderBar=document.querySelector(".loader-bar span");



let progress=0;



const loading=setInterval(()=>{


progress+=3;



if(loaderBar){

loaderBar.style.width=

progress+"%";


}



if(progress>=100){



clearInterval(loading);



setTimeout(()=>{


if(loader){

loader.classList.add("hide");


}



},800);



}



},80);










/* ==========================================================
   AUDIO SYSTEM
========================================================== */


const music=get("ambientMusic");



function startMusic(){



if(!music || Journey.musicStarted)

return;




music.volume=0;



music.play()

.then(()=>{


let volume=0;



const fade=setInterval(()=>{


volume+=0.02;


music.volume=volume;



if(volume>=0.25){


clearInterval(fade);


}



},100);



})

.catch(()=>{


console.log("Audio waiting for interaction");


});



Journey.musicStarted=true;



}









/* ==========================================================
   CHAPTER MANAGEMENT
========================================================== */


const chapters=document.querySelectorAll(".chapter");



function goToChapter(number){



if(Journey.locked)

return;



Journey.locked=true;




chapters.forEach(chapter=>{


chapter.classList.remove("active");


});





setTimeout(()=>{



if(chapters[number]){


chapters[number].classList.add("active");


Journey.currentChapter=number;


runChapter(number);


}



Journey.locked=false;



},1000);





}









/* ==========================================================
   INTRO
========================================================== */


const begin=get("beginJourney");



if(begin){


begin.onclick=()=>{


startMusic();


createDust();


goToChapter(1);



};



}









/* ==========================================================
   MEMORY GATE
========================================================== */


const yearInput=get("yearInput");

const unlock=get("unlockMemory");

const puzzleMessage=get("puzzleMessage");




function unlockMemory(){



if(!yearInput)

return;





if(yearInput.value==="2018"){



if(puzzleMessage)

puzzleMessage.innerHTML=

"Memory unlocked ✨";



goldBurst();



setTimeout(()=>{


goToChapter(2);


},1500);



}




else{


yearInput.classList.remove("shake");


void yearInput.offsetWidth;


yearInput.classList.add("shake");



if(puzzleMessage)

puzzleMessage.innerHTML=

"Think a little harder 🤍";



}



}





if(unlock){


unlock.onclick=unlockMemory;


}





if(yearInput){


yearInput.addEventListener("keypress",(e)=>{


if(e.key==="Enter"){


unlockMemory();


}


});


}
/* ==========================================================
   CHAPTER 2 — HEART EXPERIENCE
========================================================== */


const heart=get("whiteHeart");

const heartMessage=get("heartMessage");

const continueHeart=get("continueHeart");



if(heart){


heart.onclick=()=>{



heart.classList.add("heartDisappear");



setTimeout(()=>{


if(heartMessage){


heartMessage.innerHTML=

"Some moments quietly change everything...";


}



},1500);



setTimeout(()=>{


if(continueHeart){


continueHeart.style.opacity="1";


}



},2200);



};



}







if(continueHeart){


continueHeart.onclick=()=>{


goToChapter(3);


};


}









/* ==========================================================
   CHAPTER 3 — HER JOURNEY TIMELINE
========================================================== */



const memories=[


{


image:"assets/images/timeline1.jpg",


title:"The Beginning",


text:"Before anyone knew the story ahead, there was a beautiful soul creating her own path."


},



{


image:"assets/images/timeline2.jpg",


title:"Growing Dreams",


text:"Every dream, every challenge and every moment shaped who she became."


},



{


image:"assets/images/timeline3.jpg",


title:"Beautiful Moments",


text:"The little memories that created the person everyone loves."


},



{


image:"assets/images/timeline4.jpg",


title:"A Beautiful Heart",


text:"A person whose kindness makes ordinary moments special."


},



{


image:"assets/images/timeline5.jpg",


title:"The Person I Admire",


text:"The journey that created the most beautiful chapter."


}



];



let memoryIndex=0;



const timelineImage=get("timelineImage");

const timelineTitle=get("timelineTitle");

const timelineText=get("timelineText");

const timelineDots=get("timelineDots");





function createTimelineDots(){



if(!timelineDots)

return;



timelineDots.innerHTML="";



memories.forEach((memory,index)=>{


let dot=document.createElement("span");



if(index===0)

dot.style.background="gold";



timelineDots.appendChild(dot);



});


}




function updateTimeline(){



if(timelineImage){


timelineImage.style.opacity=0;



setTimeout(()=>{


timelineImage.src=

memories[memoryIndex].image;



timelineImage.style.opacity=1;



},600);



}




if(timelineTitle){


timelineTitle.innerHTML=

memories[memoryIndex].title;


}





if(timelineText){


timelineText.innerHTML=

memories[memoryIndex].text;


}




if(timelineDots){



[...timelineDots.children].forEach((dot,index)=>{


dot.style.background=

index===memoryIndex

?

"gold"

:

"white";



});


}



}






const nextMemory=get("nextMemory");

const previousMemory=get("previousMemory");





if(nextMemory){


nextMemory.onclick=()=>{


memoryIndex++;



if(memoryIndex>=memories.length)

memoryIndex=0;



updateTimeline();



};


}






if(previousMemory){


previousMemory.onclick=()=>{


memoryIndex--;



if(memoryIndex<0)

memoryIndex=

memories.length-1;



updateTimeline();



};


}





const continueTimeline=get("continueTimeline");



if(continueTimeline){


continueTimeline.onclick=()=>{


goToChapter(4);



};


}







/* ==========================================================
   CHAPTER 4 — CONSTELLATION
========================================================== */


const starsContainer=get("memoryStars");

const memoryCard=get("memoryCard");

const memoryTitle=get("memoryTitle");

const memoryDescription=get("memoryDescription");

const closeMemory=get("closeMemory");

const starCount=get("starCount");

const continueConstellation=get("continueConstellation");





const constellation=[


{


title:"The First Memory",


text:"A moment that quietly became something unforgettable."


},


{


title:"The Conversations",


text:"Small words that slowly became precious memories."


},


{


title:"The Smiles",


text:"The happiness hidden inside simple moments."


},


{


title:"The Journey",


text:"Every step brought another beautiful chapter."


},


{


title:"The Distance",


text:"Some connections grow stronger with time."


},


{


title:"The Promise",


text:"A story that continues to be written."


},


{


title:"Today",


text:"The memories that are still alive."


},


{


title:"Tomorrow",


text:"All the moments still waiting ahead."


}



];






function createStars(){



if(!starsContainer)

return;




starsContainer.innerHTML="";



Journey.starsCollected=0;



const positions=[

[15,20],
[40,15],
[70,25],
[25,55],
[55,45],
[80,65],
[35,80],
[65,85]

];




positions.forEach((pos,index)=>{



const star=document.createElement("span");



star.style.left=

pos[0]+"%";



star.style.top=

pos[1]+"%";



star.onclick=()=>{



if(star.classList.contains("found"))

return;



star.classList.add("found");



Journey.starsCollected++;




if(memoryTitle)

memoryTitle.innerHTML=

constellation[index].title;




if(memoryDescription)

memoryDescription.innerHTML=

constellation[index].text;




if(memoryCard)

memoryCard.classList.add("show");





if(starCount)

starCount.innerHTML=

Journey.starsCollected+

" / 8 Memories";





if(Journey.starsCollected===8){


continueConstellation.style.opacity="1";


}



};



starsContainer.appendChild(star);



});



}
  /* ==========================================================
   CONSTELLATION CONTROLS
========================================================== */


if(closeMemory){


closeMemory.onclick=()=>{


memoryCard.classList.remove("show");


};


}






if(continueConstellation){


continueConstellation.onclick=()=>{


if(Journey.starsCollected===8){


goToChapter(5);


}


};


}









/* ==========================================================
   CHAPTER 5 — BIRTHDAY VIDEO
========================================================== */


const video=get("birthdayVideo");

const playVideo=get("playBirthdayVideo");

const continueVideo=get("continueVideo");





if(playVideo && video){



playVideo.onclick=()=>{



video.play()

.catch(()=>{});



playVideo.style.opacity="0";


setTimeout(()=>{


playVideo.style.display="none";


},500);



};



}





if(video){



video.onended=()=>{


if(continueVideo){


continueVideo.style.opacity="1";


}



};



}






if(continueVideo){



continueVideo.onclick=()=>{


goToChapter(6);


};



}









/* ==========================================================
   CHAPTER 6 — LOVE LETTER
========================================================== */


const envelope=get("envelope");

const letterPaper=get("letterPaper");

const letterText=get("letterText");

const continueLetter=get("continueLetter");





const letterContent=`

My dear Sofia,



Some people enter our lives quietly...

and somehow become the most beautiful part of our story.



Through every memory, every smile, and every moment,

I have watched a beautiful person grow.



Thank you for being you.



Happy Birthday 🤍



`;





function typeLetter(){



if(!letterText)

return;



letterText.innerHTML="";



let index=0;



const typing=setInterval(()=>{


letterText.innerHTML+=

letterContent[index];



index++;



if(index>=letterContent.length){


clearInterval(typing);


}



},50);



}







if(envelope){



envelope.onclick=()=>{



if(letterPaper){


letterPaper.classList.add("show");


}



typeLetter();



setTimeout(()=>{


if(continueLetter)

continueLetter.style.opacity="1";


},6000);



};



}





if(continueLetter){



continueLetter.onclick=()=>{


goToChapter(7);



};



}









/* ==========================================================
   FINAL REVEAL
========================================================== */


function finalReveal(){



createPetals();

createFireflies();





const first=get("finalLineOne");

const second=get("finalLineTwo");

const love=get("loveReveal");





setTimeout(()=>{


if(first){


first.style.opacity="1";


first.style.transform=

"translateY(0)";


}


},1000);






setTimeout(()=>{


if(second){


second.style.opacity="1";


second.style.transform=

"translateY(0)";


}


},3500);







setTimeout(()=>{


if(love){


love.classList.add("show");


}



},6000);



}









/* ==========================================================
   PARTICLE EFFECTS
========================================================== */


function goldBurst(){



for(let i=0;i<40;i++){



const particle=document.createElement("span");



particle.style.position="fixed";


particle.style.left="50%";


particle.style.top="50%";



particle.style.width="8px";


particle.style.height="8px";


particle.style.borderRadius="50%";


particle.style.background="gold";


particle.style.zIndex="999";



document.body.appendChild(particle);



const x=

(Math.random()-0.5)*600;



const y=

(Math.random()-0.5)*600;



particle.animate(


[

{

transform:"translate(0,0)",

opacity:1

},


{

transform:`translate(${x}px,${y}px)`,

opacity:0

}


],


{


duration:1800,

easing:"ease-out"


}



);



setTimeout(()=>{


particle.remove();


},1900);



}



}









function createPetals(){



for(let i=0;i<30;i++){



const petal=document.createElement("div");



petal.className="petal";



petal.style.left=

Math.random()*100+"%";



petal.style.animationDelay=

Math.random()*5+"s";



document.body.appendChild(petal);



}



}









function createFireflies(){



for(let i=0;i<35;i++){



const fire=document.createElement("div");



fire.className="firefly";



fire.style.left=

Math.random()*100+"%";



fire.style.top=

Math.random()*100+"%";



fire.style.animationDelay=

Math.random()*5+"s";



document.body.appendChild(fire);



}



}









/* ==========================================================
   RESTART
========================================================== */


const restart=get("restartJourney");



if(restart){



restart.onclick=()=>{


location.reload();


};



}









/* ==========================================================
   CHAPTER LOADING EVENTS
========================================================== */


function runChapter(number){



switch(number){



case 3:

createTimelineDots();

updateTimeline();

break;




case 4:

createStars();

break;




case 7:

finalReveal();

break;



}



}



});
  
