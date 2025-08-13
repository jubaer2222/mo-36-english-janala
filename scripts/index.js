const removeActiveClass = () =>{
  const activeButtons = document.getElementsByClassName('active');
  for(let btn of activeButtons){
    btn.classList.remove('active');
  }
  console.log(activeButtons);
}

const loadLevelButtons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data =>{
        displayLevelButtons(data.data);
    })
}

const loadVocabularyCards = (level) => {
  fetch(`https://openapi.programming-hero.com/api/level/${level}`)
  .then(res => res.json())
  .then(data =>{
    removeActiveClass();
    const clickedButton = document.getElementById(`btn-${level}`);
    clickedButton.classList.add('active');
    console.log(clickedButton);
    displayVocabularyCards(data.data);
  })
}

const loadCardDetails = (cardId) => {
    console.log(cardId);
    
    fetch(`https://openapi.programming-hero.com/api/word/${cardId}`)
        .then(res => res.json())
        .then(data => {
          displayCardDetails(data.data);

         })

}

const displayLevelButtons = (lessons) => {
  console.log(lessons);
  const levelBtnContainer = document.getElementById('level-btn-container');
  
  for (const lesson of lessons){
    console.log(lesson.level_no);

    const levelBtnDiv = document.createElement('div');
    levelBtnDiv.innerHTML = `
    <button id="btn-${lesson.level_no}" onclick = "loadVocabularyCards( '${lesson.level_no}')" class="btn btn-primary flex ">Lesson-${lesson.level_no}</button>
    `
   levelBtnContainer.append(levelBtnDiv);
    
  }
}

const displayVocabularyCards = (elements) =>{
   
  const vocabularyCardsContainer = document.getElementById('vocabularyCardsContainer')
    vocabularyCardsContainer.innerHTML = " ";

     if (elements.length == 0) {
        vocabularyCardsContainer.innerHTML = `
         <div class="  flex flex-col col-span-3 mx-auto  justify-center items-center bg-[#F8F8F8] rounded-3xl">
                  <img class="mt-16 mb-4" src="./assets/alert-error.png" alt="">
                  <p class="text-sm  font-normal mb-4 hind-Siliguri text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                  <p class="mb-16 text-4xl  font-medium hind-Siliguri text-[#292524]">নেক্সট Lesson এ যান</p>
                </div>
        `;
        
        return;
     }
   

  for(const element of elements){
    console.log(element);
    const vocabularyCard = document.createElement('div');
    vocabularyCard.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">${element.word}</h2>
    <p class="inter-font text-xl font-medium my-4">Meaning /Pronounciation</p>
    <p>${element.meaning}
    
    <div>
    <button onclick="loadCardDetails(${element.id})" class="btn">J</button>
    </div>
      
    </div>
  </div>
</div>    `
  vocabularyCardsContainer.append(vocabularyCard)
  }
}

const displayCardDetails = (details) =>{
console.log(details);
document.getElementById('card_details').showModal()
 const cardContainer = document.getElementById('card_container')
    cardContainer.innerHTML = `
    
        
        <h2 class="text-3xl poppins-font flex gap-2 font-semibold mb-7 items-start">${details.word}  <span class="flex gap-2"><p>(<i class="fa-solid fa-microphone font-semibold"></i></p><p class="text-xl hind-Siliguri font-semibold">:</p>${details.pronunciation}</span>)</h2>
        <h2 class="text-2xl poppins-font font-semibold mb-2">Meaning</h2>
        <p class="hind-Siliguri text-2xl font-medium">${details.meaning? `${details.meaning}` :' “অর্থ খুজে পাওয়া যাচ্ছে না" '}</p>
        <h2 class="text-2xl poppins-font font-semibold mb-2 mt-7">Example</h2>
        <p class="text-lg poppins-font"> ${details.sentence}</p>
        <h2 class="text-2xl font-medium hind-Siliguri mt-7">সমার্থক শব্দ গুলো</h2>
        <h2 class="text-2xl font-medium mt-7">${details.synonyms ? `${details.synonyms?.[0] ? `<p class="btn bg-[#EDF7FF] poppins-font px-4 py-5 rounded-lg border">${details.synonyms[0]}</p>` : ''}
        ${details.synonyms?.[1] ? `<p class=" btn bg-[#EDF7FF] px-4 py-5 poppins-font rounded-lg border">${details.synonyms[1]}</p>` : ''}
        ${details.synonyms?.[2] ? `<p class=" btn bg-[#EDF7FF] px-4 py-5 rounded-lg poppins-font border">${details.synonyms[2]}</p>` : ''}` : ''} </h2>
       
   
              
    `
}


loadLevelButtons()

