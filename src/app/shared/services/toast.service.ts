import { inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

@Injectable({ providedIn: 'root' })
export class ToastMessageService {
  private messageService = inject(MessageService)

  showInfo(summary: string, detail: string) {
    this.messageService.add({ severity: 'info', detail, summary })
  }
  showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', detail, summary })
  }
  showWarn(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', detail, summary })
  }
  showError(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', detail, summary })
  }
  showSecondary(summary: string, detail: string) {
    this.messageService.add({ severity: 'secondary', detail, summary })
  }
  showContrast(summary: string, detail: string) {
    this.messageService.add({ severity: 'contrast', detail, summary })
  }
}
