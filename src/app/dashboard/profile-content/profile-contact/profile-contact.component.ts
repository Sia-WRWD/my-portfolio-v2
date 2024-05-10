import { Component, ElementRef } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faExclamationTriangle, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from '../../shared/directives/custom-validators';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
// import { environment } from 'src/assets/environment/environment'; // FOR TESTING
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, NzMessageModule],
  templateUrl: './profile-contact.component.html',
  styleUrl: './profile-contact.component.scss'
})
export class ProfileContactComponent {
  contactName = new FormControl('', [Validators.required, CustomValidators.nameValidator()]);
  contactEmail = new FormControl('', [Validators.required, CustomValidators.emailValidator()]);
  contactMessage = new FormControl('', [Validators.required, CustomValidators.escapeStringValidator()]);
  buttonText: any = "Embark on the Journey!";
  sendingEmail: boolean = false;
  isDisable: boolean = false;
  msgPlaceholder: any = `In this journey of life, every step forward is an adventure into the unknown. Strength lies not in the muscles, but in the courage of the heart. Every challenge faced is but a stepping stone towards growth. Let the icy winds of adversity sharpen your resolve. In the frozen expanse, discover the beauty of resilience. Embrace the chill of uncertainty, for within it lies the spark of possibility. Like the snowflakes that dance in the wind, each moment is fleeting yet precious. May the stars guide us through the coldest of nights, lighting our path with hope.`;

  constructor(private library: FaIconLibrary, private elementRef: ElementRef, private messageService: NzMessageService) {
    library.addIcons(
      faInfoCircle,
      faAddressCard,
      faExclamationTriangle
    )
  }

  sendMessage(event: Event) {
    event.preventDefault();

    this.contactName.markAsTouched();
    this.contactEmail.markAsTouched();
    this.contactMessage.markAsTouched();

    if (this.contactName.valid && this.contactEmail.valid && this.contactMessage.valid) {
      const data = {
        to_name: "Sia",
        from_name: this.contactName.value,
        from_email: this.contactEmail.value,
        message: this.contactMessage.value
      };

      this.isDisable = true;
      this.buttonText = "Casting the Email Spell...";
      this.sendingEmail = true; // Set sending status to true

      // environment.emailServiceId environment.emailTemplateId environment.emailUserId // FOR TESTING

      emailjs.send(process.env['EMAIL_SERVICE_ID']!, process.env['EMAIL_TEMPLATE_ID']!, data, process.env['EMAIL_USER_ID']!)
        .then((result: EmailJSResponseStatus) => {
          console.log(result);
          setTimeout(() => {
            if (result.status == 200) {
              this.buttonText = "Your message has been sent successfully! Freiren's magic knows no bounds.";
              this.contactName.reset();
              this.contactEmail.reset();
              this.contactMessage.reset();
            }
          }, 2500)
        }, (error) => {
          // console.log(error.text);
        })
        .finally(() => {
          setTimeout(() => {
            this.buttonText = "Embark on the Journey"; // Reset button text after delay
            this.sendingEmail = false; // Reset sending status after 3 seconds delay
            this.isDisable = false;
          }, 6000);
        });
    }
  }

  showInfoMessage() {
    this.messageService.info('Thanks for reaching out, I will try to get back to you within 1-2 business days!');
  }
}
