const body = document.querySelector('body');
let poemsContainer = body.querySelector('#poemsContainer');
const addPoemTitle = body.querySelector('#add-poem-title');
const addPoemText = body.querySelector('#add-poem-text');
const addPoemButton = body.querySelector('#add-poem-btn');

const KEY_POEM_LOCAL_STORAGE = 'poems';

function generateID() {
  const timestamp = new Date().getTime();
  return `${timestamp}-${Math.round(Math.random() * 500)}`;
}

function poemModel(title, text) {
  return {
    id: generateID(),
    title: title,
    text: text,
  };
}

function fetchPoem() {
  const storedPoem = JSON.parse(
    localStorage.getItem(KEY_POEM_LOCAL_STORAGE) || '[]',
  );

  let poemElements = '';

  for (const poem of storedPoem) {
    const poemTextReplaced = poem.text.replace(/\n/g, '<br />');

    const card = `
    <div class="card" id="${poem.id}">
    <div>
    <h3 class="card-heading">${poem.title}</h3>
    <p class="card-text">${poemTextReplaced}</p>
    </div>
    <button onclick="deletePoem(this)" class="trash">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  </div>
    `;

    poemElements += card;
  }

  poemsContainer.innerHTML = poemElements;
}

document.addEventListener('DOMContentLoaded', fetchPoem);

function addPoem(event) {
  event.preventDefault();

  const titlePoem = addPoemTitle.value;
  const textPoem = addPoemText.value;

  const item = poemModel(titlePoem, textPoem);

  if(titlePoem === ""&& textPoem === "") {
    alert("algo deu errado.")
    return 
  }
  const storedPoem = JSON.parse(
    localStorage.getItem(KEY_POEM_LOCAL_STORAGE) || '[]',
  );

  storedPoem.push(item);

  localStorage.setItem(KEY_POEM_LOCAL_STORAGE, JSON.stringify(storedPoem));

  fetchPoem();

  addPoemTitle.value = '';
  addPoemText.value = '';
}

function deletePoem(element) {
  const storedPoem = JSON.parse(
    localStorage.getItem(KEY_POEM_LOCAL_STORAGE) || '[]',
  );
  const poemId = element.parentElement.id;

  const updatedPoems = storedPoem.filter((poem) => poem.id !== poemId);
  localStorage.setItem(KEY_POEM_LOCAL_STORAGE, JSON.stringify(updatedPoems));

  fetchPoem();
}

function createElement(id, title, text) {
  if (title && text) {
    const poemTextReplaced = text.replace(/\n/g, '<br />');
    const card = `
    <div class="card" id="${id}">
    <div>
    <h3 class="card-heading">${title}</h3>
    <p class="card-text">${poemTextReplaced}</p>
    </div>
    <button onclick="deletePoem(this)" class="trash">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  </div>
    `;

    title.value = '';
    text.value = '';
    return card;
  }
}
