// ==========================================================================
// Kimberly Ajiboye — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initMobileMenu();
    initRevealOnScroll();
    initSkillTabs();
    initProjectFilters();
    initGithubGraph();
    initLanguageBar();
    initBackToTop();
    initContactForm();
    initActiveNavLink();
    initYear();
});

/* --------------------------------------------------------------------
   Theme toggle (persisted)
-------------------------------------------------------------------- */
function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('ka-theme');
    if (stored) {
        root.setAttribute('data-theme', stored);
    } else {
        root.setAttribute('data-theme', 'dark');
    }
    toggle?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('ka-theme', next);
    });
}

/* --------------------------------------------------------------------
   Sticky nav shrink on scroll
-------------------------------------------------------------------- */
function initNav() {
    const nav_links = document.getElementById('siteNav');
    if (!nav_links) return;
    const onScroll = () => {
        nav_links.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll();
}

/* --------------------------------------------------------------------
   Mobile menu
-------------------------------------------------------------------- */
function initMobileMenu() {
    const btn = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        btn.classList.toggle('is-open');
        menu.classList.toggle('is-open');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        btn.classList.remove('is-open');
        menu.classList.remove('is-open');
    }));
}

/* --------------------------------------------------------------------
   Active nav link based on section in view
-------------------------------------------------------------------- */
function initActiveNavLink() {
    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.nav-links a');
    if (!sections.length || !links.length) return;
    const map = {};
    links.forEach(l => map[l.getAttribute('href').replace('#', '')] = l);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                map[entry.target.id]?.classList.add('active');
            }
        });
    }, {rootMargin: '-40% 0px -55% 0px'});

    sections.forEach(s => observer.observe(s));
}

/* --------------------------------------------------------------------
   Reveal-on-scroll + skill bar animation trigger
-------------------------------------------------------------------- */
function initRevealOnScroll() {
    const items = document.querySelectorAll('.reveal, .reveal-stagger');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.id === 'skillsCard') animateActiveSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    items.forEach(el => observer.observe(el));
}

function animateActiveSkillBars() {
    const active = document.querySelector('.skill-group.active');
    if (!active) return;
    active.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const pct = bar.getAttribute('data-pct');
        requestAnimationFrame(() => {
            bar.style.width = pct;
        });
    });
}

/* --------------------------------------------------------------------
   Skills tabs (file-tree style)
-------------------------------------------------------------------- */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.tree-item');
    const groups = document.querySelectorAll('.skill-group');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            tabs.forEach(t => t.classList.remove('active'));
            groups.forEach(g => g.classList.remove('active'));
            tab.classList.add('active');
            const group = document.getElementById(target);
            group?.classList.add('active');
            animateActiveSkillBars();
        });
    });
}

/* --------------------------------------------------------------------
   Project filters
-------------------------------------------------------------------- */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const tags = card.dataset.tags.split(' ');
                const show = filter === 'all' || tags.includes(filter);
                card.style.display = show ? 'flex' : 'none';
            });
        });
    });
}

/* --------------------------------------------------------------------
   GitHub contribution graph (generated placeholder pattern)
-------------------------------------------------------------------- */
function initGithubGraph() {
    const graph = document.getElementById('contribGraph');
    if (!graph) return;
    const weeks = 26 * 7;
    let html = '';
    for (let i = 0; i < weeks; i++) {
        const r = Math.random();
        let level = 'cell';
        if (r > 0.93) level += ' l4';
        else if (r > 0.8) level += ' l3';
        else if (r > 0.6) level += ' l2';
        else if (r > 0.4) level += ' l1';
        html += `<div class="${level}"></div>`;
    }
    graph.innerHTML = html;
}

/* --------------------------------------------------------------------
   Language usage bar
-------------------------------------------------------------------- */
function initLanguageBar() {
    const bar = document.getElementById('langBar');
    const legend = document.getElementById('langLegend');
    if (!bar || !legend) return;
    const langs = [
        {name: 'Python', pct: 38, color: '#5b8cff'},
        {name: 'JavaScript', pct: 27, color: '#f5c451'},
        {name: 'TypeScript', pct: 16, color: '#a566ff'},
        {name: 'HTML/CSS', pct: 12, color: '#ff6b6b'},
        {name: 'Other', pct: 7, color: '#5c6485'},
    ];
    bar.innerHTML = langs.map(l => `<span style="width:${l.pct}%;background:${l.color}"></span>`).join('');
    legend.innerHTML = langs.map(l => `<li><span class="sw" style="background:${l.color}"></span>${l.name} · ${l.pct}%</li>`).join('');
}

/* --------------------------------------------------------------------
   Back to top button
-------------------------------------------------------------------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 600);
    }, {passive: true});
    btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

/* --------------------------------------------------------------------
   Contact form (front-end only demo handling)
-------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // 1. Stop the page from reloading instantly

        // 2. Package up the form data while text is still inside the fields
        const formData = new FormData(form);

        // 3. Send the data to your "/submit_form" backend path quietly
        fetch(form.action, {
            method: form.method,
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // 4. Only show success and wipe text AFTER it sends successfully
                    success?.classList.add('show');
                    form.reset();
                    setTimeout(() => success?.classList.remove('show'), 5000);
                } else {
                    alert('Server error. Could not send message.');
                }
            })
            .catch(error => {
                console.error('Network Error:', error);
            });
    });
}
