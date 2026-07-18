import { useState, type FormEvent } from 'react'
import './SettingsForm.css'

type Theme = 'system' | 'light' | 'dark'

type Settings = {
  displayName: string
  email: string
  theme: Theme
  notifications: boolean
  bio: string
}

const defaultSettings: Settings = {
  displayName: '',
  email: '',
  theme: 'system',
  notifications: true,
  bio: '',
}

export function SettingsForm() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [savedSettings, setSavedSettings] = useState<Settings>(defaultSettings)
  const [status, setStatus] = useState<'idle' | 'saved'>('idle')

  const isDirty =
    settings.displayName !== savedSettings.displayName ||
    settings.email !== savedSettings.email ||
    settings.theme !== savedSettings.theme ||
    settings.notifications !== savedSettings.notifications ||
    settings.bio !== savedSettings.bio

  function updateField<K extends keyof Settings>(field: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [field]: value }))
    setStatus('idle')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavedSettings(settings)
    setStatus('saved')
  }

  function handleReset() {
    setSettings(savedSettings)
    setStatus('idle')
  }

  return (
    <section className="settings">
      <header className="settings__header">
        <h1>Settings</h1>
        <p>Manage your profile and preferences.</p>
      </header>

      <form className="settings__form" onSubmit={handleSubmit}>
        <fieldset className="settings__group">
          <legend>Profile</legend>

          <label className="settings__field">
            <span>Display name</span>
            <input
              type="text"
              name="displayName"
              value={settings.displayName}
              onChange={(event) =>
                updateField('displayName', event.target.value)
              }
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </label>

          <label className="settings__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
            />
          </label>

          <label className="settings__field">
            <span>Bio</span>
            <textarea
              name="bio"
              value={settings.bio}
              onChange={(event) => updateField('bio', event.target.value)}
              placeholder="Tell us a little about yourself"
              rows={4}
            />
          </label>
        </fieldset>

        <fieldset className="settings__group">
          <legend>Preferences</legend>

          <label className="settings__field">
            <span>Theme</span>
            <select
              name="theme"
              value={settings.theme}
              onChange={(event) =>
                updateField('theme', event.target.value as Theme)
              }
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label className="settings__checkbox">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={(event) =>
                updateField('notifications', event.target.checked)
              }
            />
            <span>Email me about product updates</span>
          </label>
        </fieldset>

        <div className="settings__actions">
          <button
            type="button"
            className="settings__button settings__button--secondary"
            onClick={handleReset}
            disabled={!isDirty}
          >
            Reset
          </button>
          <button
            type="submit"
            className="settings__button settings__button--primary"
            disabled={!isDirty}
          >
            Save changes
          </button>
        </div>

        <p
          className="settings__status"
          role="status"
          aria-live="polite"
        >
          {status === 'saved' ? 'Settings saved successfully.' : '\u00A0'}
        </p>
      </form>
    </section>
  )
}
