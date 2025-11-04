# Portal Selectors Reference

## How to Find Selectors

1. Open portal in browser
2. Right-click element → Inspect
3. Use Playwright selector generator:
   ```bash
   python -m playwright codegen https://portal-url.com
   ```

## Best Practices

- Use `get_by_label()` when possible (most resilient)
- Use `get_by_role()` for buttons
- Avoid CSS selectors (brittle)
- Test selectors before production

## Updating Selectors

If portal changes:

1. Run with --dry-run
2. Update selectors in field mapping
3. Test again
4. Deploy
