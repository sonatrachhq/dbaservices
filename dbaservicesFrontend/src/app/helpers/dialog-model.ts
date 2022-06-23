import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable()
export class DialogModel{


    constructor( private messageService: MessageService) { }

      // success dialog
  showSuccessDialog(msg:string) {
    
    this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail:msg  });
    /* setTimeout(() => {
      this.messageService.clear()
    }, 2000); */
  }
  //global error dialog
  showErrorDialog(msg:string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur Inattendue', detail: msg });
    /* setTimeout(() => {
      this.messageService.clear()
    }, 2000); */

  }
}