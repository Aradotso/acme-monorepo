# Acme monorepo

Static UI variants live in route-specific directories and can be served from
the repository root with:

```sh
python3 -m http.server 4173 --bind 0.0.0.0
```

- Current Mono page: `http://localhost:4173/mono/`
- Editorial Ara workspace variant: `http://localhost:4173/ui-variants/editorial/`
