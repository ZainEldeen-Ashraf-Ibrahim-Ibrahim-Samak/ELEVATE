import { useI18n } from '../../../core/i18n';
import { Modal, ModalCloseButton, TextInput } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function ChatModal() {
  const { t } = useI18n();
  const vm = useAppVM();
  const thread = vm.chatThread;
  if (!thread) return null;

  return (
    <Modal
      onClose={vm.closeChat}
      maxWidth={460}
      zIndex={400}
      panelStyle={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '15.5px' }}>{thread.name}</div>
        <ModalCloseButton
          onClick={vm.closeChat}
          label={t('chat.closeLabel')}
          style={{ width: 30, height: 30, fontSize: 14 }}
        />
      </div>
      <div
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {thread.messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: msg.fromMe ? 'row-reverse' : 'row',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            {!msg.fromMe && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  color: 'var(--primary)',
                }}
              >
                {thread.name.charAt(0)}
              </div>
            )}
            <div
              style={{
                background: msg.fromMe ? 'var(--primary)' : '#161616',
                borderRadius: msg.fromMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                maxWidth: '75%',
                padding: '11px 14px',
              }}
            >
              <div
                style={{
                  fontSize: '13.5px',
                  color: msg.fromMe ? 'var(--surface)' : '#e8e8e2',
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
              {msg.attachments.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  {msg.attachments.map((att) => (
                    <span
                      key={att.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        background: 'var(--secondary)',
                        border: '1px solid rgba(255,255,255,.12)',
                        borderRadius: 8,
                        padding: '6px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: 'var(--text-soft)',
                      }}
                    >
                      {att.icon} {att.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          padding: '14px 16px',
          borderTop: '1px solid var(--line)',
        }}
      >
        <TextInput pill placeholder={t('chat.messagePlaceholder')} style={{ flex: 1 }} />
        <button
          type="button"
          className="btn btn--primary"
          aria-label={t('chat.sendLabel')}
          style={{ width: 40, height: 40, borderRadius: '50%', fontWeight: 800 }}
        >
          ➤
        </button>
      </div>
    </Modal>
  );
}
