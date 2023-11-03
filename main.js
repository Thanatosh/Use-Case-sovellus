const polls = [
    { name: "Game Engine", description: "Unreal is better than Unity?", votesFor: 0, votesAgainst: 0 },
    { name: "Aliens", description: "Extraterrestial life exists?", votesFor: 0, votesAgainst: 0 },
    { name: "Cereal", description: "Milk first, then cereal?", votesFor: 0, votesAgainst: 0 },
];

document.getElementById("register-button").addEventListener("click", registerUser);
document.getElementById("login-button").addEventListener("click", loginUser);

let currentUserRole = "Normal User";
let users = [];

function registerUser() {
    const username = document.getElementById("registration-username").value;
    const password = document.getElementById("registration-password").value;

    if (username && password) {
        const role = document.querySelector('input[name="role"]:checked').value;
        users.push({ username, password, role });
        alert("Registration successful!");
        document.getElementById("registration-username").value = "";
        document.getElementById("registration-password").value = "";
    } else {
        alert("Username and password are required.");
    }
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        alert("Login successful!");
        document.getElementById("login-username").value = "";
        document.getElementById("login-password").value = "";
        document.getElementById("registration-section").style.display = "none";
        document.getElementById("login-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";

        if (user.role === "Moderator") {
            document.getElementById("moderator-section").style.display = "block";
        }
    } else {
        alert("Invalid username or password.");
    }
}

function displayPolls() {
    const pollList = document.getElementById("poll-list");
    pollList.innerHTML = "";
    polls.forEach((poll, index) => {
        const pollItem = document.createElement("li");
        pollItem.innerHTML = `<a href="#" onclick="viewPoll(${index})">${poll.name}</a> | Votes for: ${poll.votesFor} | Votes against: ${poll.votesAgainst}`;
        pollList.appendChild(pollItem);
    });
}

function viewPoll(index) {
    const pollDetails = document.getElementById("poll-details");
    const pollDescription = document.getElementById("poll-description");
    pollDescription.textContent = polls[index].description;
    pollDetails.style.display = "block";
    pollDetails.dataset.pollIndex = index;
}

function voteFor() {
    const pollIndex = parseInt(document.getElementById("poll-details").dataset.pollIndex);
    
    if (!isNaN(pollIndex) && pollIndex >= 0 && pollIndex < polls.length) {
        const poll = polls[pollIndex];
        
        if (!poll.userVoted) {
            poll.votesFor++;
            poll.userVoted = true;
            displayPolls();
        } else {
            alert("You've already voted on this poll.");
        }
    }
}

function voteAgainst() {
    const pollIndex = parseInt(document.getElementById("poll-details").dataset.pollIndex);
    
    if (!isNaN(pollIndex) && pollIndex >= 0 && pollIndex < polls.length) {
        const poll = polls[pollIndex];
        
        if (!poll.userVoted) {
            poll.votesAgainst++;
            poll.userVoted = true;
            displayPolls();
        } else {
            alert("You've already voted on this poll.");
        }
    }
}

document.getElementById("create-poll").addEventListener("click", createPoll);
document.getElementById("delete-poll").addEventListener("click", deletePoll);
document.getElementById("vote-for").addEventListener("click", voteFor);
document.getElementById("vote-against").addEventListener("click", voteAgainst);

displayPolls();

function createPoll() {
    const pollName = prompt("Enter poll name (max 15 characters):");
    const pollDescription = prompt("Enter poll description:");

    if (pollName && pollName.length <= 15 && pollDescription) {
        polls.push({ name: pollName, description: pollDescription, votesFor: 0, votesAgainst: 0 });
        displayPolls();
    } else {
        alert("Poll name must be non-empty and 15 characters or less.");
    }
}

function deletePoll() {
    const index = prompt("Enter the number of the poll to delete:");
    if (index - 1 >= 0 && index - 1 < polls.length) {
        polls.splice(index - 1, 1);
        displayPolls();
    }
}

function switchToNormalUser() {
    document.getElementById("moderator-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
    currentUserRole = "Normal User";
}

function switchToModerator() {
    document.getElementById("main-section").style.display = "block";
    document.getElementById("moderator-section").style.display = "block";
    currentUserRole = "Moderator";
}