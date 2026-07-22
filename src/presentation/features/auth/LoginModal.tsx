import { useI18n } from '../../../core/i18n';
import { Button, Modal, ModalCloseButton, TextInput } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function LoginModal() {
  const { t } = useI18n();
  const vm = useAppVM();
  if (!vm.showLogin) return null;

  return (
    <Modal
      onClose={vm.closeLogin}
      maxWidth={400}
      zIndex={200}
      panelStyle={{ background: 'var(--card)', padding: 32, position: 'relative', overflow: 'visible' }}
    >
      <ModalCloseButton
        onClick={vm.closeLogin}
        label={t('login.closeLabel')}
        style={{ position: 'absolute', top: 16, insetInlineEnd: 16 }}
      />
      {vm.loginView === 'login' ? (
        <>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {t('login.title')}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 22 }}>
            {t('login.subtitle')}
          </div>
          <div
            style={{ display: 'flex', gap: 12, marginBottom: 20, justifyContent: 'center' }}
          >
            <button
              type="button"
              aria-label={t('login.googleLabel')}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.1-5.1C33.6 6.1 29.1 4.3 24 4.3 12.8 4.3 3.7 13.4 3.7 24.6S12.8 44.9 24 44.9c11.2 0 20.3-9.1 20.3-20.3 0-1.4-.1-2.7-.4-4.1z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l5.9 4.3C13.8 15.5 18.5 12.6 24 12.6c3.1 0 5.8 1.1 8 3l5.1-5.1C33.6 6.1 29.1 4.3 24 4.3c-7.9 0-14.7 4.5-18 11.1z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44.9c5 0 9.6-1.9 13-5.1l-6-4.9c-2 1.4-4.5 2.2-7 2.2-5.3 0-9.7-3.4-11.3-8l-6 4.6C9.4 40.4 16.1 44.9 24 44.9z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6 4.9c-.4.4 6.5-4.8 6.5-14.3 0-1.4-.1-2.7-.4-4.1z"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t('login.facebookLabel')}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#1877f2',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.2-1.5 1.6-1.5H16.5V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 3.9v2.4H8v3h2.3V21h3.2z" />
              </svg>
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#666',
              fontSize: 12,
              marginBottom: 18,
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }} />
            {t('login.or')}
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }} />
          </div>
          <TextInput
            value={vm.loginEmail}
            onChange={(e) => vm.setLoginEmail(e.target.value)}
            placeholder={t('login.emailPlaceholder')}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            style={{ marginBottom: 10 }}
          />
          <div style={{ textAlign: 'end', marginBottom: 18 }}>
            <a onClick={vm.goForgot} style={{ fontSize: '12.5px', cursor: 'pointer' }}>
              {t('login.forgotPassword')}
            </a>
          </div>
          <Button variant="cardSolid" onClick={vm.submitLogin} style={{ padding: 13 }}>
            {t('login.continue')}
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {t('login.forgot.title')}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 22 }}>
            {t('login.forgot.subtitle')}
          </div>
          <TextInput
            placeholder={t('login.forgot.emailPlaceholder')}
            style={{ marginBottom: 14 }}
          />
          <Button
            variant="cardSolid"
            onClick={vm.goLogin}
            style={{ padding: 13, marginBottom: 12 }}
          >
            {t('login.forgot.send')}
          </Button>
          <div style={{ textAlign: 'center' }}>
            <a onClick={vm.goLogin} style={{ fontSize: '12.5px', cursor: 'pointer' }}>
              {t('login.forgot.back')}
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}
