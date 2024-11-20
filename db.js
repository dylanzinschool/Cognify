db.collection('tasks').onSnapshot((snapshot) => {
    console.log(snapshot.docChanges());
})

/*     snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
            
        }

        if(change.type === 'added'){
            
        }
    });
}) */