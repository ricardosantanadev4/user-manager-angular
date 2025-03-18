import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppState } from './app.state';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { authInterceptorInterceptor } from './shared/interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideClientHydration(), provideAnimationsAsync(),
  provideHttpClient(withInterceptors([loadingInterceptor, authInterceptorInterceptor])), AppState,]
};