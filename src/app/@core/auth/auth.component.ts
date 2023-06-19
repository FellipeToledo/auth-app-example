import { Component, OnDestroy } from '@angular/core';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "sem-auth",
  styleUrls: ["./auth.component.scss"],
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  subscription: any;

  authenticated: boolean = false;
  token: string = "";

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService) {
    this.subscription = auth
      .onAuthenticationChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
