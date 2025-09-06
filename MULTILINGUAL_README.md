# Multilingual Biblical Counselling Website

This project now supports both English and Korean languages for the complete user experience.

## Features

### 🌍 Language Support
- **English (EN)**: Default language
- **Korean (KO)**: Full Korean localization
- **Language Switching**: Users can toggle between languages using the language switcher in the navigation

### 🔄 Dynamic Content
- **UI Translations**: All interface elements are translated
- **Content Localization**: Support for language-specific counseling topics
- **AI Chat**: Language-aware responses based on user input
- **Search**: Language-filtered content search

## Implementation Details

### 1. Internationalization System
- **Context Provider**: `src/lib/i18n.ts` manages language state
- **Translation Files**: `src/messages/en.json` and `src/messages/ko.json`
- **Language Detection**: Automatic detection based on content and filenames

### 2. Language Switching
- **Navigation Component**: Includes language switcher with globe icon
- **Persistent Storage**: Language preference saved in localStorage
- **Real-time Updates**: UI updates immediately when language changes

### 3. Content Management
- **Language Tags**: Content cards include language metadata
- **Fallback System**: English content shown when Korean versions unavailable
- **Korean Content**: Example Korean anxiety card (`anxiety_ko.json`)

### 4. AI Chat Integration
- **Language Detection**: Automatically detects Korean vs English input
- **Localized Responses**: System prompts in appropriate language
- **Offline Mode**: Language-appropriate offline responses

## File Structure

```
src/
├── lib/
│   ├── i18n.ts              # Language context and utilities
│   └── content.ts           # Updated content loading with language support
├── components/
│   ├── LanguageSwitcher.tsx # Language toggle component
│   ├── Nav.tsx              # Updated navigation with translations
│   ├── ChatTips.tsx         # Translated chat tips
│   └── BackHome.tsx         # Translated navigation elements
├── messages/
│   ├── en.json              # English translations
│   └── ko.json              # Korean translations
└── app/
    ├── layout.tsx            # Root layout with I18n wrapper
    ├── page.tsx              # Home page with translations
    ├── topics/page.tsx       # Topics page with language filtering
    ├── chat/page.tsx         # Chat page with translations
    └── about/page.tsx        # About page with translations
```

## Adding New Languages

### 1. Create Translation File
```json
// src/messages/[locale].json
{
  "nav.home": "Translation",
  "home.title": "Translation"
}
```

### 2. Update Type Definitions
```typescript
// src/lib/i18n.ts
export type Locale = 'en' | 'ko' | 'new'
```

### 3. Add Language Support
- Update language detection logic
- Add language switcher options
- Create localized content cards

## Content Localization

### Creating Korean Content
1. **File Naming**: Use `_ko.json` suffix (e.g., `anxiety_ko.json`)
2. **Content Structure**: Include Korean title, body, prayer, and tags
3. **Language Detection**: Automatically detected by filename or content

### Example Korean Card
```json
{
  "id": "anxiety_ko",
  "title": "불안",
  "slug": "anxiety-ko",
  "verses": ["마태복음 6:34 - ..."],
  "body": "Korean content...",
  "prayer": "Korean prayer...",
  "tags": ["불안", "염려", "평강"]
}
```

## Usage

### For Users
1. **Language Selection**: Click the globe icon in navigation
2. **Content Viewing**: See language-appropriate content automatically
3. **AI Chat**: Chat in your preferred language
4. **Search**: Find content in your language

### For Developers
1. **Adding Translations**: Update message files with new keys
2. **Content Creation**: Create language-specific JSON files
3. **Component Updates**: Use `useI18n()` hook for translations
4. **Testing**: Test both languages thoroughly

## Technical Notes

### State Management
- Language preference stored in localStorage
- React Context provides language state throughout app
- No server-side language routing (client-side only)

### Performance
- Translation files loaded dynamically
- Content filtered by language on client side
- Minimal bundle size impact

### Accessibility
- Language indicators for screen readers
- Proper ARIA labels in multiple languages
- Keyboard navigation support

## Future Enhancements

1. **Server-Side Rendering**: Add SSR support for better SEO
2. **More Languages**: Support for additional languages
3. **Language Detection**: Browser language auto-detection
4. **Content Translation**: AI-powered content translation
5. **RTL Support**: Right-to-left language support

## Troubleshooting

### Common Issues
1. **Translation Keys Missing**: Check message files for missing keys
2. **Content Not Showing**: Verify language tags in content files
3. **Language Not Persisting**: Check localStorage implementation
4. **Build Errors**: Ensure all components are properly imported

### Debug Mode
Enable debug logging by adding console logs to the `t()` function in `i18n.ts`.

## Contributing

When adding new features:
1. **Add translations** for both English and Korean
2. **Update types** if adding new language options
3. **Test thoroughly** in both languages
4. **Document changes** in this README

---

This multilingual implementation provides a seamless experience for both English and Korean users while maintaining the core functionality of the Biblical Counselling platform.
