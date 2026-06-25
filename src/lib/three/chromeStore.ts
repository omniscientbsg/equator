// src/lib/three/chromeStore.ts
/** Tiny external store: is the global chrome (navbar/footer) hidden?
 *  Set true while the 3D hero is on screen; consumed by ChromeFrame. */
let hidden = false;
const subs = new Set<() => void>();

export function setChromeHidden(v: boolean): void {
  if (v !== hidden) {
    hidden = v;
    subs.forEach((f) => f());
  }
}

export function subscribeChrome(cb: () => void): () => void {
  subs.add(cb);
  return () => subs.delete(cb);
}

export function getChromeHidden(): boolean {
  return hidden;
}
