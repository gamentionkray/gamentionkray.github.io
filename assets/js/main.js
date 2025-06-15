const SUPABASE_URL = 'https://jcmtjhpnjsqvwuvupywh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjbXRqaHBuanNxdnd1dnVweXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDA3ODYsImV4cCI6MjA2NTExNjc4Nn0.aA1IdwC8nxARMwseDnvYAiuQY3xF-h5Ydb6QYLzwGJM'

const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

AOS.init({
    duration: 1000,
    once: true,
});

class CalmParticles {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 30;

        this.init();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '#00ffff' : '#8b5cf6'
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            particle.opacity += (Math.random() - 0.5) * 0.01;
            particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calmBg = document.createElement('div');
    calmBg.id = 'calm-bg';

    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';

    const grid = document.createElement('div');
    grid.className = 'subtle-grid';

    calmBg.appendChild(grid);
    calmBg.appendChild(canvas);

    document.body.insertBefore(calmBg, document.body.firstChild);

    const particles = new CalmParticles();

    window.addEventListener('resize', () => {
        particles.resize();
    });

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const closeMobileMenu = document.getElementById("closeMobileMenu");

    function openMobileMenu() {
        console.log("Opening mobile menu");
        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenuFunc() {
        console.log("Closing mobile menu");
        mobileMenu.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuBtn) {
        console.log("Mobile menu button found");
        mobileMenuBtn.addEventListener("click", openMobileMenu);
    } else {
        console.log("Mobile menu button NOT found");
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener("click", closeMobileMenuFunc);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener("click", closeMobileMenuFunc);
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenuFunc);
        });
    }
});

const typed = new Typed("#typed", {
    strings: [
        "Web Developer",
        "AI/ML Enthusiast",
        "Cloud Architect",
        "Full Stack Developer",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000,
});

PowerGlitch.glitch('#glitch-name', {
    playMode: 'hover',
    hideOverflow: false,
    timing: {
        duration: 500,
        iterations: 1,
        easing: 'ease-in-out',
    },
    glitchTimeSpan: {
        start: 0,
        end: 1,
    },
    shake: {
        velocity: 10,
        amplitudeX: 0.1,
        amplitudeY: 0.1,
    },
    slice: {
        count: 3,
        velocity: 10,
        minHeight: 0.02,
        maxHeight: 0.15,
        hueRotate: true,
    },
});

$('#terminal').terminal({
    help: function () {
        this.echo('\nAvailable commands:\n');
        this.echo('  about     - Learn more about me');
        this.echo('  skills    - View my technical skills');
        this.echo('  projects  - See my recent projects');
        this.echo('  contact   - Get my contact information');
        this.echo('  clear     - Clear the terminal');
        this.echo('  resume    - Download my resume');
        this.echo('  social    - View my social links');
        this.echo('  education - View my education');
        this.echo('  help      - Show this help message\n');
    },
    about: function () {
        this.echo('\n[[b;#00ff00;]Krishna Thorat - Web Developer]\n');
        this.echo('Driven Web Developer with extensive experience in building');
        this.echo('innovative web solutions. Specialized in:');
        this.echo('• Full Stack Development (React, Angular, Node.js, PHP)');
        this.echo('• Cloud Architecture (Azure, AWS, GCP)');
        this.echo('• AI/ML Solutions (Generative AI, RAG, LangChain)');
        this.echo('• Database Design (MySQL, PostgreSQL, MongoDB)\n');
    },
    skills: function () {
        this.echo('\n[[b;#00bfff;]Technical Skills:]\n');
        this.echo('[[b;#ffff00;]Languages:] JavaScript, PHP, Python, TypeScript, Java');
        this.echo('[[b;#ffff00;]Frontend:] React, Angular');
        this.echo('[[b;#ffff00;]Backend:] Node.js, Express.js, FastAPI');
        this.echo('[[b;#ffff00;]Cloud:] Microsoft Azure, GCP, AWS, IBM Cloud');
        this.echo('[[b;#ffff00;]AI/ML:] Generative AI, Agentic AI, RAG, Langchain, Azure OpenAI');
        this.echo('[[b;#ffff00;]Databases:] MySQL, PostgreSQL, MongoDB, Teradata, MSSQL\n');
    },
    projects: function () {
        this.echo('\n[[b;#ff00ff;]Recent Projects:]\n');
        this.echo('1. [[b;#00ff00;]HireSense AI Platform (hire.rest)]');
        this.echo('   AI-powered career guidance with multi-agent orchestration');
        this.echo('   Tech: Python, FastAPI, Pydantic AI, React, WebSockets\n');
        this.echo('2. [[b;#00ff00;]Infovault & Agentic AI Platform]');
        this.echo('   Intelligent knowledge management with RAG search');
        this.echo('   Tech: Python, LangChain, RAG, Azure OpenAI, React\n');
        this.echo('3. [[b;#00ff00;]Intellify Migration Wizard]');
        this.echo('   Data analytics platform for SSIS package migration');
        this.echo('   Tech: Python, PySpark, React, Power BI, Azure\n');
        this.echo('4. [[b;#00ff00;]In-Parking Alert System]');
        this.echo('   Real-time parking monitoring with automated alerts');
        this.echo('   Tech: Python, PostgreSQL, React, Azure Functions\n');
    },
    contact: function () {
        this.echo('\n[[b;#00ffff;]Contact Information:]\n');
        this.echo('📧 Email: krishnathorat007@gmail.com');
        this.echo('📱 Phone: +91 8550969625');
        this.echo('📍 Location: Pimple Nilakh, Pune - 411027');
        this.echo('💼 LinkedIn: /in/krishnathorat');
        this.echo('🐙 GitHub: /gamentionkray\n');
    },
    resume: function () {
        this.echo('\n[[b;#00ff00;]Downloading resume...]');
        window.open('/resume.pdf', '_blank');
        this.echo('Resume download started!\n');
    },
    social: function () {
        this.echo('\n[[b;#00bfff;]Social Links:]\n');
        this.echo('GitHub:   https://github.com/gamentionkray');
        this.echo('LinkedIn: https://linkedin.com/in/krishnathorat');
        this.echo('Email:    krishnathorat007@gmail.com\n');
    },
    education: function () {
        this.echo('\n[[b;#ffff00;]Education:]\n');
        this.echo('🎓 Master of Computer Applications');
        this.echo('   Vishwakarma Institute of Technology, Pune');
        this.echo('   Oct 2020 - Aug 2022\n');
        this.echo('🎓 B.Sc. Computer Science');
        this.echo('   Loknete Ramdas Patil Dhumal A.S.C. College, Rahuri');
        this.echo('   Apr 2017 - Jun 2020\n');
    },
    clear: function () {
        this.clear();
    }
}, {
    greetings: '[[b;#00ff00;]Welcome to Krishna\'s Interactive Terminal]\n[[b;#00bfff;]Type "help" to see available commands]\n',
    name: 'krishna_terminal',
    prompt: '[[b;#00ff00;]krishna@portfolio]:~$ ',
    color: 'white',
    height: 400
});



document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            if (this.classList.contains('nav-link')) {
                const navLinks = document.querySelectorAll('.nav-link');

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

const createRadarChart = (canvasId, labels, data, color) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skill Level',
                data: data,
                borderColor: color,
                backgroundColor: color + '33',
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: '#999'
                    },
                    grid: {
                        color: '#333'
                    },
                    pointLabels: {
                        color: '#fff'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};

createRadarChart('frontendChart', ['React', 'Angular', 'JavaScript', 'TypeScript', 'CSS'], [90, 80, 95, 85, 92], '#3b82f6');
createRadarChart('backendChart', ['Express.js', 'PHP', 'Python', 'Node.js', 'FastAPI'], [92, 90, 85, 90, 80], '#10b981');
createRadarChart('cloudChart', ['CPanel/WHM', 'AWS', 'GCP', 'AI/ML', 'Azure'], [80, 82, 84, 75, 80], '#8b5cf6');

window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    updateActiveSection();
});

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 1000);
});

const observer = lozad();
observer.observe();

function showAlert(message, type = 'success') {
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');
    const alertText = document.getElementById('alertText');

    alertMessage.className = 'mt-4 p-4 rounded-lg';
    alertIcon.className = '';

    if (type === 'success') {
        alertMessage.classList.add('bg-green-900/50', 'border', 'border-green-500', 'text-green-300');
        alertIcon.className = 'fas fa-check-circle text-green-400';
    } else if (type === 'error') {
        alertMessage.classList.add('bg-red-900/50', 'border', 'border-red-500', 'text-red-300');
        alertIcon.className = 'fas fa-exclamation-circle text-red-400';
    }

    alertText.textContent = message;
    alertMessage.classList.remove('hidden');

    setTimeout(() => {
        alertMessage.classList.add('hidden');
    }, 5000);
}

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitLoader.classList.remove('hidden');

    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        created_at: new Date().toISOString()
    };

    try {
        const { data, error } = await supabaseClient
            .from('contact_messages')
            .insert([contactData]);

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        try {
            await motion.animate(submitBtn,
                { scale: [1, 0.95, 1] },
                { duration: 0.6, easing: "ease-in-out" }
            ).finished;
        } catch (animationError) {
            console.log('Animation error (non-critical):', animationError);
        }

        showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();

    } catch (error) {
        console.error('Error submitting form:', error);
        showAlert('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitLoader.classList.add('hidden');
    }
});