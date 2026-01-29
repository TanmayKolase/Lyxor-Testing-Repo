import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <h1 className={styles.logo}>User App</h1>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
        </div>
      </nav>
      <main className={styles.main}>
        <h1>Welcome to User Profile Management</h1>
        <p>Navigate to the Profile page to update your account information.</p>
      </main>
    </div>
  )
}

