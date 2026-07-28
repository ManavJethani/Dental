import { useState } from 'react'

const services = [
  ['Dental Implants', 'Permanent tooth replacement using titanium implants.'],
  ['Full Mouth Rehabilitation', 'Complete restoration of your entire smile.'],
  ['Root Canal Treatment', 'Painless, single-visit root canal therapy.'],
  ['Smile Makeover', 'Complete aesthetic transformation.'],
  ['Veneers', 'Ultra-thin porcelain shells for flawless teeth.'],
  ['Teeth Whitening', 'Professional whitening for a brighter smile.'],
  ['Clear Aligners', 'Invisible braces for straight teeth.'],
  ['Braces', 'Traditional and ceramic orthodontic options.'],
  ['Tooth Extraction', 'Gentle, painless extraction procedures.'],
  ['Pediatric Dentistry', "Specialized care for children's dental health."],
  ['Crowns & Bridges', 'Restore damaged or missing teeth.'],
  ['Gum Treatment', 'Advanced periodontal care solutions.'],
]

const benefits = [
  ['✦', 'Sterilization & Safety', 'Stringent protocols ensuring your safety with every procedure.'],
  ['⌁', 'Advanced Technology', 'State-of-the-art equipment for precise diagnostics and treatment.'],
  ['♡', 'Gentle Care', 'A patient-first approach that prioritizes your comfort at every step.'],
  ['◉', 'Experienced Specialists', 'MDS-qualified dentists with 12+ years of expertise.'],
  ['₹', 'Transparent Pricing', 'Clear treatment costs with no hidden charges.'],
  ['◌', 'Personalized Plans', 'Every treatment customized to your unique dental needs.'],
]

const doctors = [
  { name: 'Dr. Prateek Agarwal', role: 'Chief Dental Surgeon & Implantologist', credentials: 'BDS, MDS (Prosthodontics)', experience: '12+', image: '/images/doctor-prateek.jpg', specialties: ['Dental Implants', 'Full Mouth Rehabilitation', 'Cosmetic Dentistry', 'Crown & Bridge'] },
  { name: 'Dr. Aditi', role: 'Senior Dental Surgeon & Cosmetic Dentist', credentials: 'BDS, MDS (Conservative Dentistry)', experience: '8+', image: '/images/doctor-aditi.jpg', specialties: ['Smile Makeovers', 'Root Canal Treatment', 'Veneers & Laminates', 'Teeth Whitening'] },
]

const gallery = [
  ['Dental Implants', '/images/smile-1-before.jpg', '/images/smile-1-after.jpg'],
  ['Smile Makeover', '/images/smile-2-before.jpg', '/images/smile-2-after.jpg'],
  ['Teeth Alignment', '/images/smile-3-before.jpg', '/images/smile-3-after.jpg'],
  ['Full Mouth Rehab', '/images/smile-4-before.jpg', '/images/smile-4-after.jpg'],
]

const reviews = [
  ['Rahul Sharma', 'Dental Implants', 'Got my dental implant done by Dr. Prateek. The procedure was completely painless and the result is amazing. Highly recommend for anyone looking for implant treatment in Gurugram.'],
  ['Priya Gupta', 'Smile Makeover', "Dr. Aditi transformed my smile completely! I was always conscious about my teeth, but after the smile makeover, I can't stop smiling. The team is so friendly and professional."],
  ['Ankit Patel', 'Root Canal', 'Best dental clinic in Model Town. The technology they use is top-notch. Got my root canal done in a single visit. No pain at all!'],
  ['Sneha Verma', 'Family Dental Care', "My entire family comes here for dental care. From my daughter's braces to my father's implants, they've handled everything with such care."],
]

const navItems = ['Services', 'Doctors', 'Gallery', 'Reviews', 'Contact']

function GalleryCard({ item }: { item: string[] }) {
  const [split, setSplit] = useState(50)
  const [title, before, after] = item
  return <div className="gallery-card" onMouseMove={(event) => { const r = event.currentTarget.getBoundingClientRect(); setSplit(Math.max(5, Math.min(95, ((event.clientX - r.left) / r.width) * 100))) }}>
    <img src={after} alt={`${title} after`} />
    <div className="gallery-before" style={{ width: `${split}%` }}><img src={before} alt={`${title} before`} /></div>
    <div className="gallery-handle" style={{ left: `${split}%` }}><span>‹›</span></div>
    <span className="gallery-title">{title}</span><span className="gallery-label before">Before</span><span className="gallery-label after">After</span>
  </div>
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  return <div>
    <nav className="site-nav">
      <div className="container nav-inner"><a href="#top" className="brand">SARASWATI</a><div className="nav-links">{navItems.map((label) => <a key={label} href={`#${label.toLowerCase()}`}>{label}</a>)}<a className="nav-button" href="#book">Book Consultation</a></div></div>
    </nav>

    <main id="top">
      <section className="hero">
        <img src="/images/hero-clinic.jpg" alt="Saraswati Dental Clinic" className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content"><p className="eyebrow light">Gurugram's Trusted Dental Experts</p><h1>Your Trusted<br />Dental Implant &<br />Smile Care Destination</h1><p className="hero-copy">Advanced Dental Implants, Cosmetic Dentistry, Smile Makeovers, Root Canal Treatments &amp; Complete Oral Care Under One Roof.</p><div className="hero-pills"><span>★ 4.9 Google Rating</span><span>◎ 112+ Reviews</span><span>✦ Multispeciality Care</span></div><div className="hero-actions"><a className="button blue" href="#book">Book Consultation <b>→</b></a><a className="button ghost" href="https://wa.me/916360454121">◔ WhatsApp Us</a></div></div>
      </section>

      <section id="services" className="section white"><div className="container"><p className="eyebrow blue-text">Our Services</p><h2>Comprehensive Dental Care</h2><p className="lead">From preventive care to advanced cosmetic procedures, we offer a complete range of dental treatments using cutting-edge technology.</p><div className="services-grid">{services.map(([title, text]) => <article className="service-card" key={title}><div className="service-icon">✦</div><h3>{title}</h3><p>{text}</p><a href="#book">Learn More <b>→</b></a></article>)}</div></div></section>

      <section className="section why"><div className="container why-grid"><div><p className="eyebrow cyan">Why Saraswati Dental</p><h2>Excellence in Every Smile</h2><p className="lead">We combine clinical expertise with advanced technology to deliver exceptional dental care that prioritizes your comfort and long-term oral health.</p></div><div className="benefit-grid">{benefits.map(([icon, title, text]) => <article className="benefit" key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section id="doctors" className="section white"><div className="container"><div className="center"><p className="eyebrow blue-text">Meet Our Experts</p><h2>Our Doctors</h2></div><div className="doctor-grid">{doctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className="doctor-photo"><img src={doctor.image} alt={doctor.name} /><span>{doctor.experience} Years</span></div><div className="doctor-info"><h3>{doctor.name}</h3><h4>{doctor.role}</h4><p>{doctor.credentials}</p><div>{doctor.specialties.map((specialty) => <span className="tag" key={specialty}>{specialty}</span>)}</div><a href="#book">View Profile →</a></div></article>)}</div></div></section>

      <section id="gallery" className="section gallery"><div className="container"><div className="center"><p className="eyebrow cyan">Smile Gallery</p><h2>Smile Transformations</h2><p className="lead">Real results from real patients. See the life-changing transformations achieved at Saraswati Dental.</p></div><div className="gallery-grid">{gallery.map((item) => <GalleryCard item={item} key={item[0]} />)}</div></div></section>

      <section id="reviews" className="section white"><div className="container reviews-layout"><div className="review-summary"><p className="eyebrow blue-text">Testimonials</p><h2>What Our Patients Say</h2><strong>4.9</strong><div className="stars">★★★★★</div><p>Rated <b>Excellent</b> by our patients</p><p><b>112+</b> Google Reviews</p></div><div className="review-scroll">{reviews.map(([name, treatment, text]) => <article className="review-card" key={name}><i>“</i><p>{text}</p><div className="stars small">★★★★★</div><h3>{name}</h3><span>{treatment}</span></article>)}</div></div></section>

      <section id="book" className="section booking"><div className="container"><p className="eyebrow blue-text">Book Appointment</p><h2>Get Your Personalized Treatment Plan</h2><div className="booking-grid"><div className="form-card">{submitted ? <div className="thank-you"><span>✓</span><h3>Thank You!</h3><p>We've received your request. Our team will get back to you within 30 minutes.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>Your Name<input required placeholder="Enter your full name" /></label><label>Phone Number<input required type="tel" placeholder="Enter your phone number" /></label><label>Treatment Interest<select required defaultValue=""><option value="" disabled>Select a treatment</option>{services.slice(0, 8).map(([name]) => <option key={name}>{name}</option>)}</select></label><label>Preferred Date<input required type="date" /></label><button className="button blue" type="submit">Request Callback</button></form>}</div><div className="contact-list"><h3>Or reach us directly:</h3><p><b>◉ Phone</b><a href="tel:+916360454121">+91 63604 54121</a></p><p><b>⌖ Address</b><span>1st Floor, H. No 102/8, Behind Pasricha Hospital, Model Town, Sector 11, Gurugram, Haryana 122001</span></p><p><b>◷ Clinic Hours</b><span>Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 2:00 PM</span></p><a className="button whatsapp" href="https://wa.me/916360454121">◔ Chat on WhatsApp</a></div></div></div></section>
    </main>

    <footer id="contact"><div className="container footer-grid"><div><h3>SARASWATI</h3><p>Multispeciality Dental Clinic</p><p>Gurugram's trusted destination for advanced dental implants, cosmetic dentistry, and complete oral care.</p></div><div><h4>Treatments</h4>{services.slice(0, 6).map(([name]) => <a href="#services" key={name}>{name}</a>)}</div><div><h4>Contact</h4><p>1st Floor, H. No 102/8, Behind Pasricha Hospital, Model Town, Sector 11, Gurugram, Haryana 122001</p><a href="tel:+916360454121">+91 63604 54121</a><p>Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 2:00 PM</p></div></div><div className="container footer-bottom">© 2026 Saraswati Dental Clinic. All rights reserved.<span>Privacy Policy &nbsp;&nbsp; Terms</span></div></footer>
    <div className="floating"><a href="https://wa.me/916360454121">◔</a><a href="tel:+916360454121">☎</a><a href="#book">□</a></div>
  </div>
}

export default App
