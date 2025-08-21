#### Summary
Builds on Storybook coverage by making `CareChecklist` more resilient and feature-rich: checked states persist per species, export options include CSV, and print styles are cleaned up for legibility.

#### Changes
- `src/components/CareChecklist.js`
  - Added localStorage persistence keyed by `careChecklist:{species.name}`.
  - New CSV export (`Section, ID, Item, Category, Priority, Estimated Cost, Description, Notes`) and “CSV File” button in export menus.
  - Refined print stylesheet: spacing, alignment, color fidelity, page setup.
  - Kept existing JSON/Text export and Print flows.
  - Added props for Storybook control: `initialCategory`, `initialShowOptional` (non-breaking).

- Storybook
  - `src/components/CareChecklist.stories.jsx`: Export/Print/CSV actions no-op/mocked; `achievementService.updateProgress` stubbed; controls for `initialCategory` and `initialShowOptional`.

#### How to test
- Storybook:
  - Run: `npm run storybook`
  - Open: Components → CareChecklist
  - Verify stories render (`Default`, `CategoryFiltered`, `HideOptional`, `DifferentSpecies`).
  - Controls update list live (`initialCategory`, `initialShowOptional`).
  - Click Export → CSV/JSON/Text and Print → no console errors or navigation.

- App:
  - Open any species; check items; reload → state persists per species.
  - Export CSV → rows include all items with columns: Section, ID, Item, Category, Priority, Estimated Cost, Description, Notes.
  - Print view displays clean spacing, alignment, and colors.

#### Notes
- Persistence is species-specific; switching species shows its own saved state.
- CSV and print layout can be tweaked further based on UX feedback.
- Storybook stubs avoid localStorage noise from achievements while exercising component behavior.

#### Checklist
- [x] Storybook controls and mocks intact
- [x] LocalStorage persistence works per species
- [x] CSV export generates correct file/columns
- [x] Print stylesheet improved
- [x] No console errors


