//real-time listener
db.collection('tasks').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            renderGoal(change.doc.data(), change.doc.id)
        } 

        if(change.type === 'removed'){
            removeGoal(change.doc.id);
        }
    });
})

//add new goal
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    event.preventDefault();

const tasks = {
    maintask:form.goalInput.value
};

db.collection('tasks').add(tasks)
.catch(err => console.log(err))

form.maintask.value = '';
});

//delete a goal

const allgoalsContainer = document.querySelector('.allgoals');
allgoalsContainer.addEventListener('click', event => {
    //console.log(event);
    if(event.target.tagName=== 'BUTTON'){
        const id = event.target.getAttribute('data-id')
        db.collection('tasks').doc(id).delete()
    }
})