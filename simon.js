// Hii I'm Pawan !!

let gameseq=[];
let userseq=[];
let started=false;
let randcol=["red","green","orange","blue"];

let level=0;
let h3=document.querySelector(".score");
document.addEventListener("keypress",()=>{
   if(started==false){
    console.log("started!!");
    started=true;
    levelup();
   
   }
})


      function checkbtn(idx){
        
        
        
            if(gameseq[idx]==userseq[idx]){
               if(gameseq.length==userseq.length){
              setTimeout(levelup,1000);
            }
         
         }
         else{
            h3.innerHTML=`Game Over !! <br>Your Score is ${level} ... <br> Press any key to start  😥`;
            document.querySelector("body").style.backgroundColor="red";
            setTimeout(()=>{
               document.querySelector("body").style.backgroundColor="white";
               reset();
            },250);
         }
      }

function reset(){
   gameseq=[];
   userseq=[];
   started=false;
   level=0;

}

 function btnpress (){
    
      let btn= this;

      btnflash(btn);
   //   userseq.push();
   let user= btn.getAttribute("id");
 
   userseq.push(user);


   checkbtn(userseq.length-1);

      }

   let allbtn=document.querySelectorAll(".btn");
   for(btn of allbtn){
      btn.addEventListener("click",btnpress);

   };

  

   btnflash=(btn)=>{
      btn.classList.add("flash");
      setTimeout(()=>{
         btn.classList.remove("flash");
      }, 250);
   }

levelup = () =>{
   userseq=[];
   level++;
   h3.innerText=`level ${level}`;
   let index=Math.floor(Math.random()*3);
   let rn=randcol[index];
   gameseq.push(rn);

   let ranbtn=document.querySelector(`.${rn}`)
     btnflash(ranbtn);
     console.log(gameseq);
}
