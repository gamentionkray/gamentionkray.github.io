const SUPABASE_URL = 'https://jcmtjhpnjsqvwuvupywh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbXRqaHBuanNxdnd1dnVweXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDA3ODYsImV4cCI6MjA2NTExNjc4Nn0.aA1IdwC8nxARMwseDnvYAiuQY3xF-h5Ydb6QYLzwGJM'

const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Initialize AOS
AOS.init({
    duration: 500, // Snappier animation
    once: true,
    easing: 'ease-out-cubic'
});

// Typed.js - Bold and blocky cursor
const typed = new Typed("#typed", {
    strings: [
        "FULL STACK DEV",
        "AI ARCHITECT",
        "SYSTEM ENGINEER"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true,
    cursorChar: '█'
});

// --- Chart.js Configuration (Wireframe Style) ---
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            max: 100,
            ticks: { display: false },
            grid: { color: '#000', lineWidth: 1 }, // Black grid
            angleLines: { color: '#000', lineWidth: 1 },
            pointLabels: {
                font: { family: "'Space Mono', monospace", size: 12, weight: 'bold' },
                color: '#000'
            }
        }
    },
    plugins: { legend: { display: false } }
};

const createChart = (id, labels, data, color) => {
    new Chart(document.getElementById(id), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: color, // Solid pastel color
                borderColor: '#000',    // Black border
                borderWidth: 3,
                pointBackgroundColor: '#000',
                pointRadius: 4
            }]
        },
        options: commonOptions
    });
};

// Initialize Charts with Neobrutal colors
createChart('frontendChart', ['React', 'Angular', 'TS', 'JS', 'HTML'], [90, 85, 85, 95, 95], 'rgba(255, 235, 59, 0.7)'); // Yellow
createChart('backendChart', ['Node', 'Python', 'PHP', 'SQL', 'API'], [90, 85, 90, 88, 92], 'rgba(163, 230, 53, 0.7)'); // Green
createChart('cloudChart', ['Azure', 'AWS', 'GenAI', 'RAG', 'Docker'], [85, 80, 90, 88, 75], 'rgba(96, 165, 250, 0.7)'); // Blue

// --- Mobile Menu Logic ---
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const navLinks = document.querySelectorAll('.mobile-menu a');

function toggleMenu(show) {
    if (show) mobileMenu.classList.add('active');
    else mobileMenu.classList.remove('active');
}

mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
closeMobileMenu.addEventListener('click', () => toggleMenu(false));
navLinks.forEach(l => l.addEventListener('click', () => toggleMenu(false)));

// --- Contact Form ---
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const text = document.getElementById('submitText');
    const alertBox = document.getElementById('alertMessage');

    btn.disabled = true;
    text.textContent = 'TRANSMITTING...';

    const formData = new FormData(e.target);
    
    try {
        const { error } = await supabaseClient.from('contact_messages').insert([{
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            created_at: new Date().toISOString()
        }]);

        if (error) throw error;

        alertBox.className = "mt-4 p-4 font-bold border-2 border-black text-center bg-[#a3e635]";
        alertBox.textContent = "MESSAGE RECEIVED. OVER AND OUT.";
        alertBox.classList.remove('hidden');
        e.target.reset();

    } catch (err) {
        alertBox.className = "mt-4 p-4 font-bold border-2 border-black text-center bg-[#ff6b6b]";
        alertBox.textContent = "TRANSMISSION FAILED.";
        alertBox.classList.remove('hidden');
    } finally {
        btn.disabled = false;
        text.textContent = 'SEND TRANSMISSION';
        setTimeout(() => alertBox.classList.add('hidden'), 5000);
    }
});

// Hide Loader
window.onload = () => setTimeout(() => document.getElementById('loader').classList.add('hidden'), 800);
