import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app/components/app/app.component';
import { HTTP_PROVIDERS } from 'angular2/http';
import * as core from 'angular2/core';

declare var ag: any;
ag.grid.initialiseAgGridWithAngular2({ core: core });

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);
