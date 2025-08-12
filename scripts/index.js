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
    displayVocabularyCards(data.data);
  })
}

const displayLevelButtons = (lessons) => {
  console.log(lessons);
  const levelBtnContainer = document.getElementById('level-btn-container');
  
  for (const lesson of lessons){
    console.log(lesson.level_no);

    const levelBtnDiv = document.createElement('div');
    levelBtnDiv.innerHTML = `
    <button onclick = "loadVocabularyCards(${lesson.level_no})" class="btn btn-primary flex ">Lesson-${lesson.level_no}</button>
    `
   levelBtnContainer.append(levelBtnDiv);
    
  }
}

const displayVocabularyCards = (elements) =>{
   
  const vocabularyCardsContainer = document.getElementById('vocabularyCardsContainer')
    
  for(const element of elements){
    console.log(element);
    const vocabularyCard = document.createElement('div');
    vocabularyCard.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">${element.word}</h2>
    <p class="inter-font text-xl font-medium my-4">Meaning /Pronounciation</p>
    <p>${element.meaning}
      
    </div>
  </div>
</div>    `
  vocabularyCardsContainer.append(vocabularyCard)
  }
}


loadLevelButtons()
