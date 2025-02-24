// Επιλογή των απαραίτητων στοιχείων από το HTML
const taskInput = document.getElementById("task"); // Επιλέγουμε το input όπου γράφουμε τις εργασίες
const addTaskButton = document.getElementById("addTask"); // Επιλέγουμε το κουμπί "Add Task"
const taskList = document.getElementById("taskList"); // Επιλέγουμε τη λίστα όπου θα προστίθενται οι εργασίες

// Όταν η σελίδα φορτώνει, καλεί τη συνάρτηση που φορτώνει αποθηκευμένες εργασίες από το Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Όταν πατάμε το κουμπί "Add Task", εκτελείται η συνάρτηση addTask
addTaskButton.addEventListener("click", addTask);

// Συνάρτηση που προσθέτει μια νέα εργασία στη λίστα
function addTask() {
    const taskText = taskInput.value.trim(); // Παίρνουμε το κείμενο που έγραψε ο χρήστης και αφαιρούμε τα κενά

    // Έλεγχος: Αν το input είναι άδειο, δείχνει μήνυμα και σταματάει η εκτέλεση της συνάρτησης
    if (taskText === "") {
        alert("Please enter a task!"); // Εμφάνιση προειδοποίησης στον χρήστη
        return; // Σταματάει η εκτέλεση της συνάρτησης
    }

    // Δημιουργούμε ένα νέο στοιχείο λίστας (li)
    const li = document.createElement("li");

    // Προσθέτουμε το κείμενο της εργασίας και ένα κουμπί διαγραφής μέσα στο <li>
    li.innerHTML = `
        <span>${taskText}</span> 
        <button class="delete">Delete</button>
    `;

    // Προσθέτουμε ένα event ώστε όταν πατάμε σε ένα task, να μαρκάρεται ως ολοκληρωμένο
    li.addEventListener("click", () => {
        li.classList.toggle("completed"); // Εναλλάσσει την κλάση "completed" (προσθέτει ή αφαιρεί το γραμμωμένο στυλ)
        saveTasks(); // Αποθηκεύει την κατάσταση στο Local Storage
    });

    // Επιλέγουμε το κουμπί διαγραφής που δημιουργήθηκε και του προσθέτουμε event για να διαγράφει το task
    li.querySelector(".delete").addEventListener("click", () => removeTask(li));

    // Προσθέτουμε το νέο στοιχείο στη λίστα
    taskList.appendChild(li);

    // Αποθηκεύουμε τις εργασίες στο Local Storage
    saveTasks();

    // Καθαρίζουμε το input για να γράψει ο χρήστης νέα εργασία
    taskInput.value = "";
}

// Συνάρτηση που διαγράφει μια εργασία από τη λίστα
function removeTask(taskElement) {
    taskElement.remove(); // Αφαιρεί το <li> από το DOM
    saveTasks(); // Ενημερώνει το Local Storage ώστε να αφαιρεθεί και από εκεί
}

// Συνάρτηση που αποθηκεύει τις εργασίες στο Local Storage
function saveTasks() {
    const tasks = []; // Δημιουργούμε έναν κενό πίνακα για να αποθηκεύσουμε τις εργασίες

    // Παίρνουμε όλα τα <li> και αποθηκεύουμε τις πληροφορίες τους
    document.querySelectorAll("li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent, // Αποθηκεύουμε το κείμενο της εργασίας
            completed: task.classList.contains("completed") // Ελέγχουμε αν είναι ολοκληρωμένη (true/false)
        });
    });

    // Μετατρέπουμε τον πίνακα σε JSON string και τον αποθηκεύουμε στο Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Συνάρτηση που φορτώνει τις αποθηκευμένες εργασίες από το Local Storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Παίρνουμε τις αποθηκευμένες εργασίες ή έναν κενό πίνακα

    // Για κάθε αποθηκευμένη εργασία, τη δημιουργούμε ξανά και την προσθέτουμε στη λίστα
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Delete</button>
        `;

        // Αν η εργασία ήταν ολοκληρωμένη, προσθέτουμε την κλάση "completed"
        if (task.completed) {
            li.classList.add("completed");
        }

        // Όταν κάνουμε κλικ στο task, εναλλάσσουμε την ολοκλήρωση και αποθηκεύουμε
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        // Όταν κάνουμε κλικ στο κουμπί διαγραφής, αφαιρείται η εργασία
        li.querySelector(".delete").addEventListener("click", () => removeTask(li));

        // Προσθέτουμε το στοιχείο στη λίστα
        taskList.appendChild(li);
    });
}
