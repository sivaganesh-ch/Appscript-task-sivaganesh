'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.col}>
                    <h3>BE THE FIRST TO KNOW</h3>
                    <p>Sign up for updates from mettä muse.</p>
                    <div className={styles.newsletter}>
                        <input type="email" placeholder="Enter your e-mail..." />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
                <div className={styles.col}>
                    <h3>CONTACT US</h3>
                    <p>+44 221 133 5360</p>
                    <p>customercare@mettamuse.com</p>
                    <div className={styles.currency}>
                        <h3>CURRENCY</h3>
                        <div className={styles.flag}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt="US Flag" width={20} height={12} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                            <span className={styles.star}>✦</span> USD
                        </div>
                        <p className={styles.small}>Transactions will be completed in Euros and a currency reference is available on hover.</p>
                    </div>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.linksSection}>
                <FooterGroup
                    title="mettä muse"
                    isMobile={isMobile}
                    links={[
                        { name: "About Us", href: "#" },
                        { name: "Stories", href: "#" },
                        { name: "Artisans", href: "#" },
                        { name: "Boutiques", href: "#" },
                        { name: "Contact Us", href: "#" },
                        { name: "EU Compliances Docs", href: "#" },
                    ]}
                />

                <FooterGroup
                    title="QUICK LINKS"
                    isMobile={isMobile}
                    links={[
                        { name: "Orders & Shipping", href: "#" },
                        { name: "Join/Login as a Seller", href: "#" },
                        { name: "Payment & Pricing", href: "#" },
                        { name: "Return & Refunds", href: "#" },
                        { name: "FAQs", href: "#" },
                        { name: "Privacy Policy", href: "#" },
                        { name: "Terms & Conditions", href: "#" },
                    ]}
                />

                <div className={styles.linkGroup}>
                    <FooterAccordion title="FOLLOW US" isMobile={isMobile} forceOpen={!isMobile}>
                        {/* On desktop Follow Us isn't usually an accordion, but consistency on mobile. 
                            Wait, design says "drop downs used for metta muse, quick links and follow us".
                        */}
                        <div className={styles.socials}>
                            <div className={styles.socialIcon}>
                                <img src="/insta.svg" alt="Insta" onError={(e) => e.currentTarget.style.display = 'none'} />
                                {/* Placeholder for icons */}
                                <div className={styles.placeholderIcon}></div>
                            </div>
                            <div className={styles.socialIcon}>
                                <div className={styles.placeholderIcon}></div>
                            </div>
                        </div>

                        <div className={styles.paymentContainer}>
                            <h3>mettä muse ACCEPTS</h3>
                            <div className={styles.payments}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="Paypal" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="GPay" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png" alt="Apple Pay" />
                            </div>
                        </div>
                    </FooterAccordion>
                </div>
            </div>

            <div className={styles.copyright}>
                Copyright © 2023 mettamuse. All rights reserved.
            </div>
        </footer>
    );
}

function FooterGroup({ title, links, isMobile }: { title: string, links: { name: string, href: string }[], isMobile: boolean }) {
    return (
        <div className={styles.linkGroup}>
            <FooterAccordion title={title} isMobile={isMobile}>
                <ul>
                    {links.map(l => (
                        <li key={l.name}><a href={l.href}>{l.name}</a></li>
                    ))}
                </ul>
            </FooterAccordion>
        </div>
    )
}

function FooterAccordion({ title, children, isMobile, forceOpen }: { title: string, children: React.ReactNode, isMobile: boolean, forceOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    // On desktop, always open (unless design says otherwise, usually footers are open on desktop).
    // Requirement says "mobile version check the given mobile version design image (hint: there drop downs used...)"
    // Implying desktop is standard list.
    const showContent = !isMobile || isOpen || forceOpen;
    const isInteractive = isMobile && !forceOpen;

    return (
        <div className={styles.accordionWrapper}>
            <div
                className={isInteractive ? styles.accordionHeader : styles.staticHeader}
                onClick={() => isInteractive && setIsOpen(!isOpen)}
            >
                <h3>{title}</h3>
                {isInteractive && (
                    isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
            </div>
            {showContent && (
                <div className={styles.accordionContent}>
                    {children}
                </div>
            )}
        </div>
    )
}
