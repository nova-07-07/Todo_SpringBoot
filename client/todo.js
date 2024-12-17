async function fetchData() {
    try {
        const response = await fetch('http://localhost:3838/todos');
        if (!response) {
            throw new Error('response was not ok');
        }
        const data = await response.json();
        console.log('Data from the server:', data);

        const todol = document.getElementById('todoList');
        todol.innerHTML = '';

        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item.title}  : ${item.description}`;
            todol.appendChild(listItem);
            let editbtn = document.createElement('button');
            editbtn.textContent = "Edit"
            editbtn.id = "btne"
            editbtn.onclick = function () {
                clickedit(item);
            };
            
            listItem.appendChild(editbutton)
            let deletebtn = document.createElement('button');
            deletebtn.textContent = "Delete"
            deletebtn.id = "btnd"
            deletebtn.onclick = function () {
                clickdelete(item._id)
            }
            listItem.appendChild(deletebtn)
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData()


async function createtodo() {
    try {
        let ti = document.getElementById('title')
        let des = document.getElementById('description')
        let data = { title: ti.value, description: des.value }
        const response = await fetch('http://localhost:3838/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const res = response.json();
            console.log(res, "dfsdfs")
            ti.value = ""
            des.value = ""

            fetchData()
        })
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function clickedit(item) {
    try {
        const id = item._id;
        console.log("fsdf", id)

        const saveButton = document.getElementById('btn');
        saveButton.textContent = "Update";

        const tButton = document.getElementById('title');
        tButton.value = item.title;
        const dButton = document.getElementById('description');
        dButton.value = item.description;

        saveButton.onclick = async () => {
            try {
                let ti = tButton.value;
                let des = dButton.value;
                let data = { title: ti, description: des };

                const response = await fetch(`http://localhost:3838/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res, "dfsdfs");
                fetchData();

                saveButton.textContent = "Save";

                tButton.value = '';
                dButton.value = '';
            } catch (error) {
                console.error('Error updating data:', error.message);
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function clickdelete(id) {
    let res = await fetch(`http://localhost:3838/todos/${id}`, {
        method: "DELETE",
    }).then((res) => {
        console.log(res, "res")
        fetchData();
    })
}