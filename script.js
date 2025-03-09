// Firebase Configuration
const firebaseConfig = {
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to update visitor count
const updateVisitorCount = () => {
    const countRef = db.ref('visitorCount');
    countRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
    }).then((snapshot) => {
        document.getElementById('visitor-count').textContent = snapshot.snapshot.val();
    });
};

// Function to log visitor IP
const logVisitorIP = async () => {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        const visitorIP = data.ip;

        const ipRef = db.ref('visitorIPs/' + visitorIP);
        ipRef.set({
            timestamp: new Date().toISOString()
        });

        // Check if the user is admin (replace 'your_admin_ip' with your real IP to test)
        const adminIP = 'your_admin_ip';
        if (visitorIP === adminIP) {
            document.getElementById('admin-section').style.display = 'block';
            db.ref('visitorIPs').once('value', (snapshot) => {
                const ipsList = document.getElementById('visitor-ips');
                ipsList.innerHTML = '';
                snapshot.forEach((child) => {
                    const li = document.createElement('li');
                    li.textContent = child.key + ' - ' + child.val().timestamp;
                    ipsList.appendChild(li);
                });
            });
        }
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
};

// Execute functions on page load
window.onload = () => {
    updateVisitorCount();
    logVisitorIP();
};