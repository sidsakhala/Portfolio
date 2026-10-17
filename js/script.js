(function () {
    const header = document.querySelector(".site-header");
    const menuBtn = document.querySelector("#menu-icon");
    const nav = document.querySelector("#site-nav");
    const backdrop = document.querySelector("#nav-backdrop");
    const themeBtn = document.querySelector("#darkmode");
    const contactForm = document.querySelector("#contact-form");
    const whatsappBtn = document.querySelector("#whatsapp-btn");
    const yearEl = document.querySelector("#year");

    const CONTACT_EMAIL = "sudhanshu.sakhala2002@gmail.com";
    const WHATSAPP_NUMBER = "917744869769";

    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    window.addEventListener("scroll", () => {
        header?.classList.toggle("shadow", window.scrollY > 8);
    });

    function setMenuIcon(isOpen) {
        const icon = menuBtn?.querySelector("i");
        if (icon) {
            icon.className = isOpen ? "bx bx-x" : "bx bx-menu";
        }
    }

    function setNavOpen(isOpen) {
        nav?.classList.toggle("open", isOpen);
        backdrop?.classList.toggle("visible", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        menuBtn?.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (backdrop) {
            backdrop.hidden = !isOpen;
        }
        setMenuIcon(isOpen);
    }

    menuBtn?.addEventListener("click", () => {
        const isOpen = !nav?.classList.contains("open");
        setNavOpen(isOpen);
    });

    backdrop?.addEventListener("click", () => setNavOpen(false));

    nav?.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => setNavOpen(false));
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav?.classList.contains("open")) {
            setNavOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 769px)").matches) {
            setNavOpen(false);
        }
    });

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        document.body.classList.add("theme-dark");
        updateThemeIcon(true);
    }

    themeBtn?.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("theme-dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeBtn?.querySelector("i");
        if (!icon) return;
        icon.className = isDark ? "bx bx-sun" : "bx bx-moon";
    }

    function readContactFields() {
        const name = document.getElementById("name")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const message = document.getElementById("message")?.value.trim() || "";
        return { name, email, message };
    }

    function validateContact({ name, email, message }) {
        if (!name || !email || !message) {
            alert("Please fill in your name, email, and message.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        return true;
    }

    const MAILTO_MAX_LENGTH = 2000;

    function openEmailClient({ name, email, message }) {
        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(
            `Hi Sudhanshu,\n\n${message}\n\n— ${name}\n${email}`
        );
        const href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

        if (href.length > MAILTO_MAX_LENGTH) {
            alert(
                "Your message is too long for the email link. Please shorten it or email sudhanshu.sakhala2002@gmail.com directly."
            );
            return;
        }

        const link = document.createElement("a");
        link.href = href;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function openWhatsApp({ name, message }) {
        const text = encodeURIComponent(`Hello Sudhanshu, I'm ${name}.\n\n${message}`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    }

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const fields = readContactFields();
        if (!validateContact(fields)) return;
        openEmailClient(fields);
    });

    whatsappBtn?.addEventListener("click", () => {
        const fields = readContactFields();
        if (!validateContact(fields)) return;
        openWhatsApp(fields);
    });

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealElements.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealElements.forEach((el) => observer.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("visible"));
    }

    if (typeof Typed !== "undefined") {
        new Typed(".auto-type", {
            strings: [
                "multi-agent LangGraph systems",
                "enterprise MCP platforms",
                "production RAG pipelines",
                "cost-optimized LLM routing",
            ],
            typeSpeed: 42,
            backSpeed: 28,
            backDelay: 1800,
            loop: true,
        });
    }
})();
