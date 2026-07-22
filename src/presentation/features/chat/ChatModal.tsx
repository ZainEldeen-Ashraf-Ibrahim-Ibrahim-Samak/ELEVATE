'use client';

import { useI18n } from '@/core/i18n';
import { Modal, ModalCloseButton, TextInput } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

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
      panelClassName="flex flex-col max-h-[80vh]"
    >
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-line">
        <div className="font-extrabold text-[15.5px]">{thread.name}</div>
        <ModalCloseButton
          onClick={vm.closeChat}
          label={t('chat.closeLabel')}
          className="!w-[30px] !h-[30px] text-sm"
        />
      </div>
      <div className="p-5 flex flex-col gap-3.5 overflow-y-auto flex-1">
        {thread.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 items-start ${msg.fromMe ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {!msg.fromMe && (
              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shrink-0 flex items-center justify-center font-display text-[11px] text-primary">
                {thread.name.charAt(0)}
              </div>
            )}
            <div
              className={`max-w-[75%] px-3.5 py-[11px] ${
                msg.fromMe
                  ? 'bg-primary rounded-[14px_14px_4px_14px]'
                  : 'bg-[#161616] rounded-[14px_14px_14px_4px]'
              }`}
            >
              <div
                className={`text-[13.5px] leading-normal ${
                  msg.fromMe ? 'text-surface' : 'text-ink'
                }`}
              >
                {msg.text}
              </div>
              {msg.attachments.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {msg.attachments.map((att) => (
                    <span
                      key={att.label}
                      className="flex items-center gap-[5px] bg-black border border-white/[.12] rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold text-ink-soft"
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
      <div className="flex gap-2.5 px-4 py-3.5 border-t border-line">
        <TextInput pill placeholder={t('chat.messagePlaceholder')} className="flex-1" />
        <button
          type="button"
          className="btn-primary w-10 h-10 rounded-full font-extrabold"
          aria-label={t('chat.sendLabel')}
        >
          ➤
        </button>
      </div>
    </Modal>
  );
}
