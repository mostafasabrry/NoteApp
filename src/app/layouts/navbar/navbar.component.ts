import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ThemeService } from '../../core/services/theme/theme.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly mytranslateService=inject(MytranslateService)
  isLogin=input<boolean>(true);
  authService=inject(AuthService);
  themeService=inject(ThemeService);

  toggleTheme(){
     
    this.themeService.toggleTheme();
  }

  change(lang:string){
    this.mytranslateService.changeLang(lang);
  }
}
