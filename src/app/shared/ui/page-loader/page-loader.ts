import { Component } from '@angular/core';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.html',
  styles: `
    .loader {
      --color-1: #fff;
      --color-2: #0066ff;
      --size: 1px;

      width: calc(48 * var(--size));
      height: calc(48 * var(--size));
      border: calc(10 * var(--size)) solid var(--color-1);
      border-radius: 50%;
      position: relative;
      transform: rotate(45deg);
      box-sizing: border-box;
    }
    .loader::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      inset: calc(-10 * var(--size));
      border-radius: 50%;
      border: calc(10 * var(--size)) solid var(--color-2);
      animation: prixClipFix 2s infinite linear;
    }

    @keyframes prixClipFix {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
      }
      25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
      }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
      }
      75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
      }
      100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
      }
    }
  `
})
export class PageLoader {}
