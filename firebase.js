<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs5VqodQCgH-F-VYbM1zS2BzsoHOQGpzo",
  authDomain: "remote-work-hub-211d8.firebaseapp.com",
  projectId: "remote-work-hub-211d8",
  storageBucket: "remote-work-hub-211d8.firebasestorage.app",
  messagingSenderId: "697750475671",
  appId: "1:697750475671:web:6e609411ae003e6500aad2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("jobList") || document.getElementById("jobContainer");

async function load() {
  try {
    const snap = await getDocs(collection(db, "jobs"));

    let html = "";

    snap.forEach(doc => {
      const job = doc.data();

      html += `
        <div style="border:1px solid #ddd; padding:10px; margin:10px;">
          <h3>${job.title || "No title"}</h3>
          <p>${job.type || ""} - ${job.rate || ""}</p>
          <p>${job.desc || ""}</p>
        </div>
      `;
    });

    container.innerHTML = html || "<p>No jobs found</p>";

  } catch (e) {
    console.log(e);
    container.innerHTML = "<p style='color:red'>Firebase error loading jobs</p>";
  }
}

load();
</script>
