import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <main className="main-container">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="subtitle">Fill out the form below and we'll get back to you</p>
        <ContactForm />
      </div>
    </main>
  )
}
