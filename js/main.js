document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE NAVIGATION ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdowns on Mobile
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close menu when clicking a link (mobile)
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- MODAL FOR QUOTE REQUEST (DEVIS) ---
    const devisModals = document.querySelectorAll('.devis-modal-trigger');
    const modal = document.getElementById('devisModal');
    const modalClose = document.getElementById('modalClose');
    
    if (modal) {
        devisModals.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Unlock scrolling
            });
        }
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- CLIENTS SLIDER DOTS ACTIVE STATE (SIMULATION) ---
    const dots = document.querySelectorAll('.slider-dots .dot');
    const track = document.querySelector('.logos-track');
    
    if (dots.length > 0 && track) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Adjust animation speed or pause and shift track manually
                // Since it's infinite, we simulate visual offset
                const speed = 25 - (index * 5); // change visual feel
                track.style.animationDuration = `${speed}s`;
            });
        });
    }

    // --- PORTFOLIO / REALISATIONS FILTERING ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (filterTabs.length > 0 && portfolioCards.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Set active class on clicked tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const filterValue = tab.getAttribute('data-filter');
                
                portfolioCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        // Add fade-in transition
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transition = 'opacity 0.4s ease';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // --- FORM SUBMISSION & TRANSMISSION VIA EMAIL/WHATSAPP ---
    const contactForm = document.getElementById('contactForm');
    const devisForm = document.getElementById('devisForm');

    const showTransmissionModal = (whatsappUrl, mailtoUrl, onComplete) => {
        // Create modal overlay element
        const overlay = document.createElement('div');
        overlay.className = 'transmission-modal-overlay';
        
        // Modal content card
        const card = document.createElement('div');
        card.className = 'transmission-card';
        
        card.innerHTML = `
            <button class="transmission-close">&times;</button>
            <div class="transmission-icon">✓</div>
            <h3 class="transmission-title">Demande préparée !</h3>
            <p class="transmission-desc">Pour valider et transmettre vos données à <strong>WTC Services</strong>, veuillez choisir votre canal préféré :</p>
            
            <div class="transmission-actions">
                <a href="${whatsappUrl}" target="_blank" class="transmission-btn btn-whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.98 14.12 .952 11.488.951c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.453 3.39 1.31 4.877L1.925 21.9l6.32-1.636c1.39.756 2.904 1.156 4.402 1.156zm10.7-7.761c-.282-.141-1.664-.82-1.921-.912-.258-.094-.446-.141-.633.141-.188.282-.727.912-.89 1.096-.164.186-.328.21-.61.07-2.95-1.47-3.856-2.58-4.63-3.92-.2-.348-.021-.538.15-.71.154-.155.328-.38.49-.569.166-.188.22-.32.329-.533.109-.21.055-.395-.027-.536-.082-.141-.633-1.525-.87-2.087-.23-.554-.48-.48-.63-.48-.152-.002-.326-.002-.5-.002-.174 0-.46.065-.7.329-.24.264-.915.893-.915 2.178 0 1.285.935 2.528 1.065 2.7.13.174 1.838 2.808 4.453 3.937.62.268 1.106.429 1.485.549.62.197 1.187.17 1.634.103.498-.075 1.664-.679 1.898-1.336.234-.656.234-1.22.164-1.336-.07-.116-.258-.2-.54-.341z"/></svg>
                    Transmettre par WhatsApp
                </a>
                <a href="${mailtoUrl}" class="transmission-btn btn-email">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Transmettre par Email
                </a>
            </div>
            <p class="transmission-note">Note : L'envoi par WhatsApp ouvrira une discussion et l'envoi par Email ouvrira votre application de messagerie.</p>
        `;
        
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden'; // Lock background scroll
        
        // Add active class for transitions
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        const closeBtn = card.querySelector('.transmission-close');
        const actionBtns = card.querySelectorAll('.transmission-btn');
        
        const closeModal = () => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Short timeout to let the default click behavior (link opening) happen
                setTimeout(closeModal, 1000);
            });
        });
    };

    const handleFormSubmit = (form, isDevis) => {
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get submit button
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.disabled = true;
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; animation: spin 1.2s linear infinite; vertical-align: middle; margin-right: 8px;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Préparation...';
            
            // Get form values
            let name, company, email, tel, subject, service, message;
            let messageText = '';
            let subjectLine = '';
            
            if (isDevis) {
                name = form.querySelector('#devisNom') ? form.querySelector('#devisNom').value : '';
                company = form.querySelector('#devisEntreprise') ? form.querySelector('#devisEntreprise').value : '';
                email = form.querySelector('#devisEmail') ? form.querySelector('#devisEmail').value : '';
                tel = form.querySelector('#devisTel') ? form.querySelector('#devisTel').value : '';
                const serviceSelect = form.querySelector('#devisService');
                service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
                message = form.querySelector('#devisMsg') ? form.querySelector('#devisMsg').value : '';
                
                subjectLine = `Demande de devis - ${service} - WTC Services`;
                messageText = `Bonjour WTC Services,

Je souhaite obtenir un devis pour le service suivant : ${service}

Voici mes informations de contact :
- Nom complet : ${name}
- Entreprise : ${company || 'Non spécifiée'}
- Email : ${email}
- Téléphone : ${tel}

Description du besoin :
${message}`;
            } else {
                name = form.querySelector('#contactNom') ? form.querySelector('#contactNom').value : '';
                subject = form.querySelector('#contactSujet') ? form.querySelector('#contactSujet').value : '';
                email = form.querySelector('#contactEmail') ? form.querySelector('#contactEmail').value : '';
                tel = form.querySelector('#contactTel') ? form.querySelector('#contactTel').value : '';
                message = form.querySelector('#contactMsg') ? form.querySelector('#contactMsg').value : '';
                
                subjectLine = `Contact WTC Services - ${subject}`;
                messageText = `Bonjour WTC Services,

Je vous contacte concernant le sujet : ${subject}

Voici mes informations de contact :
- Nom complet : ${name}
- Email : ${email}
- Téléphone : ${tel}

Message :
${message}`;
            }
            
            // Recipient Details (Cameroon Country Code +237)
            const whatsappNumber = '237655852060';
            const emailRecipient = 'raoul.ntonga@wtc-services.com';
            
            // Format WhatsApp API Link and Mailto Link
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;
            const mailtoUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(messageText)}`;
            
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                
                // Show options modal
                showTransmissionModal(whatsappUrl, mailtoUrl, () => {
                    form.reset();
                    if (isDevis && modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }, 1000);
        });
    };
    
    handleFormSubmit(contactForm, false);
    handleFormSubmit(devisForm, true);
});

// CSS spin animation keyframes added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
