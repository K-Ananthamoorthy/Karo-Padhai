const firebaseConfig = {
    apiKey: "AIzaSyDRUswR5Q1HlPz0jqQWa3eT8DEnilpcN10",
    authDomain: "karo-padhai.firebaseapp.com",
    projectId: "karo-padhai",
    storageBucket: "karo-padhai.appspot.com",
    messagingSenderId: "52313475711",
    appId: "1:52313475711:web:0ef384b635711ec2480d4a"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Storage service
const storage = firebase.storage();

async function initializeFirebase() {
  return { app: firebase.app(), storage };
}

// Call the function to initialize Firebase and render subject folders
initializeFirebase().then(({ app, storage }) => {
  renderFolders('folder-notes', 'notes', storage);
  renderFolders('folder-textbooks', 'textbooks', storage);
  renderFolders('folder-tie', 'tie_imp', storage);
  renderFolders('folder-oldpapers', 'oldpapers', storage);
}).catch(error => {
  console.error('Failed to initialize Firebase:', error);
});

let currentOpenFolder = null;

// Function to render subject folders
async function renderFolders(containerId, folderName, storage) {
  const foldersDiv = document.getElementById(containerId);
  if (!foldersDiv) {
      console.error('Folders container not found.');
      return;
  }
  try {
      const folderRef = storage.ref().child(folderName);
      const folderList = await folderRef.listAll();
      folderList.prefixes.forEach(async (subjectRef) => {
          const subjectName = subjectRef.name.split('/').pop(); // Extract subject name from folder path
          const subjectDiv = document.createElement('div');
          const filesDiv = document.createElement('div');
          filesDiv.classList.add('subfolder');
          subjectDiv.innerHTML = `<h3>${subjectName.toUpperCase()}</h3>`;
          subjectDiv.classList.add('subject-folder');
          subjectDiv.appendChild(filesDiv);
          foldersDiv.appendChild(subjectDiv);

          subjectDiv.addEventListener('click', async () => {
              const transitionEndHandler = (event) => {
                  if (event.propertyName === 'max-height') {
                      event.target.innerHTML = '';
                      event.target.removeEventListener('transitionend', transitionEndHandler);
                  }
              };

              if (currentOpenFolder && currentOpenFolder !== filesDiv) {
                  currentOpenFolder.style.maxHeight = null;
                  currentOpenFolder.classList.remove('active');
                  currentOpenFolder.addEventListener('transitionend', transitionEndHandler);
              }
              if (filesDiv.classList.contains('active')) {
                  filesDiv.style.maxHeight = null;
                  filesDiv.addEventListener('transitionend', transitionEndHandler);
              } else {
                  const filesList = await subjectRef.listAll();
                  const filesLinks = await Promise.all(filesList.items.map(async (itemRef) => {
                      const url = await itemRef.getDownloadURL();
                      const fileName = itemRef.name;
                      return `<li><a href="${url}" target="_blank">${fileName}</a></li>`;
                  }));
                  filesDiv.innerHTML = '<ul>' + filesLinks.join('') + '</ul>';
                  filesDiv.style.maxHeight = `${filesDiv.scrollHeight}px`;
                  currentOpenFolder = filesDiv;
              }
              filesDiv.classList.toggle('active');
          });
      });
  } catch (error) {
      console.error('Failed to render subject folders:', error);
  }
  
}