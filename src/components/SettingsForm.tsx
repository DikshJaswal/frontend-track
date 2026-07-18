import { useId, useState, type FormEvent } from 'react'
import './SettingsForm.css'

type Theme = 'light' | 'dark'

interface SettingsValues {
  fullName: string
  email: string
  theme: Theme
  enableNotifications: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
}

const DEFAULT_VALUES: SettingsValues = {
  fullName: '',
  email: '',
  theme: 'light',
  enableNotifications: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: SettingsValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

export default function SettingsForm() {
  const formId = useId()
  const fullNameId = `${formId}-full-name`
  const emailId = `${formId}-email`
  const themeId = `${formId}-theme`
  const notificationsId = `${formId}-notifications`
  const successId = `${formId}-success`

  const [values, setValues] = useState<SettingsValues>(DEFAULT_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof FormErrors, boolean>>({
    fullName: false,
    email: false,
  })
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const showFieldError = (field: keyof FormErrors) =>
    (submitAttempted || touched[field]) && errors[field]

  const handleChange = <K extends keyof SettingsValues>(
    field: K,
    value: SettingsValues[K],
  ) => {
    setShowSuccess(false)

    const nextValues = { ...values, [field]: value }
    setValues(nextValues)

    if (field === 'fullName' || field === 'email') {
      const validatedField = field as keyof FormErrors
      const nextErrors = validate(nextValues)
      setErrors((current) => ({
        ...current,
        [validatedField]: nextErrors[validatedField],
      }))
    }
  }

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((current) => ({ ...current, [field]: true }))
    const nextErrors = validate(values)
    setErrors((current) => ({
      ...current,
      [field]: nextErrors[field],
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setShowSuccess(false)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setShowSuccess(true)
  }

  const handleReset = () => {
    setValues(DEFAULT_VALUES)
    setErrors({})
    setTouched({ fullName: false, email: false })
    setSubmitAttempted(false)
    setShowSuccess(false)
  }

  return (
    <section className="settings-form" aria-labelledby={`${formId}-heading`}>
      <h2 id={`${formId}-heading`} className="settings-form__title">
        Settings
      </h2>
      <p className="settings-form__description">
        Update your profile preferences and notification settings.
      </p>

      <form noValidate onSubmit={handleSubmit} aria-describedby={showSuccess ? successId : undefined}>
        <div className="settings-form__field">
          <label htmlFor={fullNameId} className="settings-form__label">
            Full Name{' '}
            <span className="settings-form__required" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={fullNameId}
            name="fullName"
            type="text"
            className={`settings-form__input${
              showFieldError('fullName') ? ' settings-form__input--error' : ''
            }`}
            value={values.fullName}
            onChange={(event) => handleChange('fullName', event.target.value)}
            onBlur={() => handleBlur('fullName')}
            required
            aria-required="true"
            aria-invalid={Boolean(showFieldError('fullName'))}
            aria-describedby={
              showFieldError('fullName') ? `${fullNameId}-error` : undefined
            }
            autoComplete="name"
          />
          {showFieldError('fullName') && (
            <p
              id={`${fullNameId}-error`}
              className="settings-form__error"
              role="alert"
            >
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor={emailId} className="settings-form__label">
            Email{' '}
            <span className="settings-form__required" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            className={`settings-form__input${
              showFieldError('email') ? ' settings-form__input--error' : ''
            }`}
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            required
            aria-required="true"
            aria-invalid={Boolean(showFieldError('email'))}
            aria-describedby={
              showFieldError('email') ? `${emailId}-error` : undefined
            }
            autoComplete="email"
          />
          {showFieldError('email') && (
            <p
              id={`${emailId}-error`}
              className="settings-form__error"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="settings-form__field">
          <label htmlFor={themeId} className="settings-form__label">
            Theme
          </label>
          <select
            id={themeId}
            name="theme"
            className="settings-form__select"
            value={values.theme}
            onChange={(event) =>
              handleChange('theme', event.target.value as Theme)
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="settings-form__field">
          <div className="settings-form__checkbox-row">
            <input
              id={notificationsId}
              name="enableNotifications"
              type="checkbox"
              className="settings-form__checkbox"
              checked={values.enableNotifications}
              onChange={(event) =>
                handleChange('enableNotifications', event.target.checked)
              }
            />
            <label
              htmlFor={notificationsId}
              className="settings-form__label settings-form__checkbox-label"
            >
              Enable Notifications
            </label>
          </div>
        </div>

        <div className="settings-form__actions">
          <button
            type="submit"
            className="settings-form__button settings-form__button--primary"
          >
            Save Settings
          </button>
          <button
            type="button"
            className="settings-form__button settings-form__button--secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {showSuccess && (
          <p
            id={successId}
            className="settings-form__success"
            role="status"
            aria-live="polite"
          >
            Settings saved successfully.
          </p>
        )}
      </form>
    </section>
  )
}
