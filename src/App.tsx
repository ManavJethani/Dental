import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

type GoogleReview = {
  id: string
  author: string
  authorPhoto: string | null
  authorUri: string | null
  rating: number
  text: string
  languageCode: string
  relativeTime: string
  googleMapsUri: string | null
}

type GoogleReviewsResponse = {
  error?: string
  rating?: number
  totalReviews?: number
  reviews?: GoogleReview[]
}

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

function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating)))

  return <span aria-label={`${rating.toFixed(1)} out of 5 stars`}>{'★'.repeat(filledStars)}{'☆'.repeat(5 - filledStars)}</span>
}

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: '',
  })
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[] | null>(null)
  const [googleRating, setGoogleRating] = useState<number | null>(null)
  const [googleReviewCount, setGoogleReviewCount] = useState<number | null>(null)
  const [googleReviewsError, setGoogleReviewsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews')
        const payload = await response.json() as GoogleReviewsResponse

        if (!response.ok) {
          setGoogleReviewsError(typeof payload.error === 'string' ? payload.error : 'Unable to load reviews')
          return
        }

        setGoogleReviews(payload.reviews || [])
        setGoogleRating(typeof payload.rating === 'number' ? payload.rating : null)
        setGoogleReviewCount(typeof payload.totalReviews === 'number' ? payload.totalReviews : null)
      } catch (error) {
        console.error('Failed to fetch Google reviews', error)
        setGoogleReviewsError('Unable to load reviews')
      }
    }

    fetchGoogleReviews()
  }, [])

  const displayedRating = googleRating ?? 4.9
  const displayedReviewCount = googleReviewCount ?? 112
  const isUsingLiveReviewSummary = googleRating !== null || googleReviewCount !== null

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name as keyof typeof formData]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = [
      'New consultation request',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Treatment interest: ${formData.treatment}`,
      `Preferred date: ${formData.date}`,
    ].join('\n')

    const whatsappUrl = `https://wa.me/916360454121?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return <div>
    <nav className="site-nav">
      <div className="container nav-inner">
        <a href="#top" className="brand">SARASWATI</a>
        <div className="nav-actions">
          <div className="nav-links">{navItems.map((label) => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>
          <a className="nav-button" href="#book" onClick={() => setMenuOpen(false)}>Book Consultation</a>
          <button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>

    <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
      <button className="mobile-drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
      <div className="mobile-drawer-links">
        {navItems.map((label) => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </div>
    </div>
    <div className={`mobile-backdrop${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(false)} />

    <main id="top">
      <section className="hero">
        <img src="/images/hero-clinic.jpg" alt="Saraswati Dental Clinic" className="hero-image" />
        <div className="hero-shade" />
        <div className="container hero-content"><p className="eyebrow light">Gurugram's Trusted Dental Experts</p><h1>Your Trusted<br />Dental Implant &<br />Smile Care Destination</h1><p className="hero-copy">Advanced Dental Implants, Cosmetic Dentistry, Smile Makeovers, Root Canal Treatments &amp; Complete Oral Care Under One Roof.</p><div className="hero-pills"><span>★ {displayedRating.toFixed(1)} Google Rating</span><span>◎ {displayedReviewCount}{isUsingLiveReviewSummary ? '' : '+'} Reviews</span><span>✦ Multispeciality Care</span></div><div className="hero-actions"><a className="button blue" href="#book">Book Consultation <b>→</b></a><a className="button ghost" href="https://wa.me/916360454121">◔ WhatsApp Us</a></div></div>
      </section>

      <section id="services" className="section white"><div className="container"><p className="eyebrow blue-text">Our Services</p><h2>Comprehensive Dental Care</h2><p className="lead">From preventive care to advanced cosmetic procedures, we offer a complete range of dental treatments using cutting-edge technology.</p><div className="services-grid">{services.map(([title, text]) => <article className="service-card" key={title}><div className="service-icon">✦</div><h3>{title}</h3><p>{text}</p><a href="#book">Learn More <b>→</b></a></article>)}</div></div></section>

      <section className="section why"><div className="container why-grid"><div><p className="eyebrow cyan">Why Saraswati Dental</p><h2>Excellence in Every Smile</h2><p className="lead">We combine clinical expertise with advanced technology to deliver exceptional dental care that prioritizes your comfort and long-term oral health.</p></div><div className="benefit-grid">{benefits.map(([icon, title, text]) => <article className="benefit" key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section id="doctors" className="section white"><div className="container"><div className="center"><p className="eyebrow blue-text">Meet Our Experts</p><h2>Our Doctors</h2></div><div className="doctor-grid">{doctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className="doctor-photo"><img src={doctor.image} alt={doctor.name} /><span>{doctor.experience} Years</span></div><div className="doctor-info"><h3>{doctor.name}</h3><h4>{doctor.role}</h4><p>{doctor.credentials}</p><div>{doctor.specialties.map((specialty) => <span className="tag" key={specialty}>{specialty}</span>)}</div><a href="#book">View Profile →</a></div></article>)}</div></div></section>

      <section id="gallery" className="section gallery"><div className="container"><div className="center"><p className="eyebrow cyan">Smile Gallery</p><h2>Smile Transformations</h2><p className="lead">Real results from real patients. See the life-changing transformations achieved at Saraswati Dental.</p></div><div className="gallery-grid">{gallery.map((item) => <GalleryCard item={item} key={item[0]} />)}</div></div></section>

      <section id="reviews" className="section white"><div className="container reviews-layout"><div className="review-summary"><p className="eyebrow blue-text">Testimonials</p><h2>What Our Patients Say</h2><strong>{displayedRating.toFixed(1)}</strong><div className="stars"><StarRating rating={displayedRating} /></div><p>Rated <b>Excellent</b> by our patients</p><p><b>{displayedReviewCount}{isUsingLiveReviewSummary ? '' : '+'}</b> Google Reviews</p>{googleReviewsError ? <p className="lead" style={{ color: '#ffb3b3', marginTop: '16px' }}>Unable to load live Google reviews; showing fallback testimonials.</p> : null}</div><div className="review-scroll">{googleReviews ? googleReviews.map((review) => <article className="review-card" key={review.id}><i>“</i><p>{review.text}</p><div className="stars small"><StarRating rating={review.rating} /></div><h3>{review.author}</h3><span>{review.relativeTime || 'Google review'}</span></article>) : googleReviewsError ? reviews.map(([name, treatment, text]) => <article className="review-card" key={`${name}-${treatment}-${text.slice(0, 12)}`}><i>“</i><p>{text}</p><div className="stars small">★★★★★</div><h3>{name}</h3><span>{treatment}</span></article>) : <p className="lead">Loading Google reviews…</p>}</div></div></section>

      <section id="book" className="section booking"><div className="container"><p className="eyebrow blue-text">Book Appointment</p><h2>Get Your Personalized Treatment Plan</h2><div className="booking-grid"><div className="form-card">{submitted ? <div className="thank-you"><span>✓</span><h3>Thank You!</h3><p>We've sent your request to WhatsApp. Our team will get back to you within 30 minutes.</p></div> : <form onSubmit={handleSubmit}><label>Your Name<input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" /></label><label>Phone Number<input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" /></label><label>Treatment Interest<select required name="treatment" value={formData.treatment} onChange={handleInputChange}><option value="" disabled>Select a treatment</option>{services.slice(0, 8).map(([name]) => <option key={name}>{name}</option>)}</select></label><label>Preferred Date<input required type="date" name="date" value={formData.date} onChange={handleInputChange} /></label><button className="button blue" type="submit">Request Callback</button></form>}</div><div className="contact-list"><h3>Or reach us directly:</h3><p><b>◉ Phone</b><a href="tel:+916360454121">+91 63604 54121</a></p><p><b>⌖ Address</b><span>1st Floor, H. No 102/8, Behind Pasricha Hospital, Model Town, Sector 11, Gurugram, Haryana 122001</span></p><p><b>◷ Clinic Hours</b><span>Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 2:00 PM</span></p><a className="button whatsapp" href="https://wa.me/916360454121">◔ Chat on WhatsApp</a></div></div></div></section>
    </main>

    <footer id="contact"><div className="container footer-grid"><div><h3>SARASWATI</h3><p>Multispeciality Dental Clinic</p><p>Gurugram's trusted destination for advanced dental implants, cosmetic dentistry, and complete oral care.</p></div><div><h4>Treatments</h4>{services.slice(0, 6).map(([name]) => <a href="#services" key={name}>{name}</a>)}</div><div><h4>Contact</h4><p>1st Floor, H. No 102/8, Behind Pasricha Hospital, Model Town, Sector 11, Gurugram, Haryana 122001</p><a href="tel:+916360454121">+91 63604 54121</a><p>Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 2:00 PM</p></div></div><div className="container footer-bottom">© 2026 Saraswati Dental Clinic. All rights reserved.<span>Privacy Policy &nbsp;&nbsp; Terms</span></div></footer>
    <div className="floating">
      <a className="floating-button floating-whatsapp" href="https://wa.me/916360454121" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.866-2.03-.967-.273-.1-.47-.149-.668.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.496.099-.198.05-.372-.025-.52-.075-.148-.668-1.611-.916-2.207-.242-.579-.487-.5-.668-.51-.173-.01-.372-.012-.57-.012-.198 0-.52.074-.792.372-.273.297-1.042 1.016-1.042 2.479s1.067 2.876 1.216 3.074c.149.198 2.1 3.2 5.076 4.487.71.306 1.262.489 1.694.626.712.225 1.36.193 1.872.117.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2.003C6.488 2.003 2 6.487 2 12.003c0 2.116.653 4.073 1.76 5.708L2 22l4.42-1.137c1.568.855 3.337 1.315 5.584 1.315 5.516 0 10-4.484 10-10 0-5.516-4.484-10-10-10zm0 18.777c-2.04 0-3.93-.624-5.54-1.694l-.395-.235-2.62.674.7-2.557-.257-.417C3.1 15.3 2.5 13.696 2.5 12.003 2.5 7.167 6.168 3.5 11.004 3.5c4.836 0 8.504 3.667 8.504 8.503 0 4.836-3.668 8.777-8.504 8.777z"/>
        </svg>
      </a>
      <a className="floating-button floating-call" href="tel:+916360454121" aria-label="Call clinic">☎</a>
      <a className="floating-button floating-book" href="#book" aria-label="Book consultation">📅</a>
    </div>
  </div>
}

export default App
