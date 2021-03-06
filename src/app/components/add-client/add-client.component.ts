import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;
  
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd === true) {
      value.balance = 0;
    }

    if (!valid) {
      // show message err
      this.flashMessagesService.show('Please, fill out the form correctly', { cssClass: 'alert-danger', timeout: 4000 });

    } else {
      // add new client
      this.clientService.newClient(value);
      // show success msg
      this.flashMessagesService.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
      // redirect
      this.router.navigate(['/']);
    }
  }
}
