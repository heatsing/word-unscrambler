# Navigation Dropdown Fix – Why It Broke and How It Was Fixed

## 1. Why the Bug Occurred

The previous header used **Radix UI Navigation Menu** (`@radix-ui/react-navigation-menu`). That primitive is built around a **single shared viewport**:

- **One viewport for all menus**  
  All dropdown contents render into one `NavigationMenuViewport`. Only one item’s content is “active” at a time; the viewport’s size is driven by a CSS variable `--radix-navigation-menu-viewport-height` (and width). When that value is wrong (e.g. during open/close or when switching items), the viewport can keep a large height with no visible content → **large empty white boxes**.

- **Wrong anchoring**  
  The viewport is positioned at the **root** of the navigation (e.g. `top-full left-0` of the whole menu), not under each trigger. So dropdowns don’t sit under “Word Finders” / “List of Words” etc.; they share one global slot → **dropdowns not anchored under their parent**.

- **Menus interfering**  
  Because state and layout are shared (one viewport, one “active” content), opening one menu can affect another’s content or size → **multiple dropdowns interfering with each other**.

- **Hover vs click**  
  Radix Navigation Menu is hover-oriented. Making it also work well for touch/click without a clear “hover vs click” strategy led to **inconsistent hover and click behavior** on desktop vs mobile.

- **Layout / height**  
  The viewport uses a fixed height from a CSS variable. If that isn’t updated correctly, you get **layout issues, wrong height, or extra padding/min-height** and possible overflow.

So the bugs (empty white boxes, wrong anchoring, menus interfering, inconsistent hover/click, layout/height) all stem from **one shared viewport + global positioning + hover-focused design**.

---

## 2. How This Fix Prevents It

The new implementation **replaces** the Radix Navigation Menu with a custom **NavDropdown** (and **SiteHeader** using it):

1. **One dropdown state per menu**  
   Each `NavDropdown` has its own `open` state. No shared viewport and no global “active” item → dropdowns no longer interfere with each other.

2. **Content only when open**  
   The panel is rendered only when `open === true`. When closed, there is no panel in the DOM → **no empty dropdown containers**, so no empty white boxes.

3. **Anchored under the trigger**  
   Each dropdown wraps trigger + panel in a `position: relative` container. The panel uses `position: absolute; left: 0; top: 100%` so it sits **directly under its trigger** → correct anchoring.

4. **Height is content-driven**  
   Panel has `height: auto` and `maxHeight: min(80vh, 400px)` with `overflow: auto`. No fixed height or CSS variables → no layout shift or wrong height from a shared viewport.

5. **Click-outside to close**  
   A `pointerdown` listener on `document` closes the dropdown when the click target is outside the dropdown container → consistent close behavior.

6. **Hover on desktop, click on mobile**  
   `usePrefersHover()` uses `(pointer: fine)` to detect desktop.  
   - **Fine pointer (desktop):** hover opens; leaving trigger/panel (with a short delay) closes.  
   - **Coarse pointer (mobile):** click toggles; click outside closes.  
   So behavior is consistent and appropriate per device.

7. **z-index and overflow**  
   Panel uses `z-50` and lives in the same stacking context as the header; no shared viewport that could clip or overlap incorrectly → correct stacking.

8. **Accessibility**  
   - `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-labelledby`, `role="menu"` / `role="menuitem"`.  
   - Trigger is focusable; Escape closes; Enter/Space/ArrowDown open or toggle.  
   - Panel links are focusable so Tab and keyboard work.

9. **No layout shift**  
   Panel is out-of-flow (`position: absolute`). Only the trigger affects layout; opening/closing doesn’t move the rest of the page.

So the fix prevents the original bugs by **removing the shared viewport**, **one state per menu**, **render-only-when-open**, **absolute positioning under the trigger**, **content-driven height**, **click-outside**, **pointer-based hover vs click**, and **explicit a11y**.

---

## 3. Best Practices Checklist (Avoid This in Future)

- [ ] **One open state per dropdown**  
  Don’t drive multiple dropdowns from a single global “active” id or shared viewport.

- [ ] **Render panel only when open**  
  Avoid always-mounted panels that are only hidden with CSS (e.g. `visibility`/`opacity`). That can leave empty boxes if layout or state is wrong.

- [ ] **Anchor with relative + absolute**  
  Use a `position: relative` wrapper and `position: absolute` on the panel (e.g. `left-0 top-full`) so the dropdown is positioned relative to its trigger.

- [ ] **No fixed/min height on the dropdown container**  
  Use `height: auto` and `max-height` + `overflow: auto` so height is content-driven and doesn’t create empty space.

- [ ] **Click-outside to close**  
  Use a document-level listener (e.g. `pointerdown`) and close when the target is outside the dropdown container (using a ref).

- [ ] **Hover vs click by device**  
  Use `(pointer: fine)` vs coarse to choose hover-open (desktop) vs click-to-toggle (mobile/touch).

- [ ] **z-index and stacking**  
  Give the dropdown panel a high `z-index` (e.g. `z-50`) and ensure it’s not clipped by a parent `overflow: hidden` unless intended.

- [ ] **ARIA and keyboard**  
  Use `aria-expanded`, `aria-haspopup`, `aria-controls`, `role="menu"` / `role="menuitem"`, and handle Escape and Enter/Space (and optionally Arrow keys) on the trigger and items.

- [ ] **No shared viewport for multiple menus**  
  If using a UI library, check whether it uses a single viewport for all items; if so, consider a different primitive or a custom implementation like this one.

- [ ] **Test on real devices**  
  Test hover on desktop and tap/click on mobile or touch devices to confirm behavior matches the intended hover vs click logic.
