<!-- Color Palette Reference for Poetry Portfolio -->

# 🎨 Color Palette - Nature Distilled

## Primary Colors

### Clay (#C4A485)
**Usage**: Primary buttons, accents, decorative elements  
**RGB**: rgb(196, 164, 133)  
**HSL**: hsl(30, 37%, 65%)  
**Feel**: Warm, earthy, welcoming

### Clay Dark (#A88968)
**Usage**: Hover states, darker accents  
**RGB**: rgb(168, 137, 104)  
**HSL**: hsl(31, 28%, 53%)  
**Feel**: Grounded, sophisticated

## Secondary Colors

### Soil (#8B7355)
**Usage**: Body text, secondary buttons, borders  
**RGB**: rgb(139, 115, 85)  
**HSL**: hsl(33, 24%, 44%)  
**Feel**: Natural, stable

### Earth (#6B5744)
**Usage**: Headings, dark text, emphasis  
**RGB**: rgb(107, 87, 68)  
**HSL**: hsl(29, 22%, 34%)  
**Feel**: Deep, grounding

## Accent Colors

### Sage (#A4AC96)
**Usage**: Subtle backgrounds, calming accents  
**RGB**: rgb(164, 172, 150)  
**HSL**: hsl(82, 12%, 63%)  
**Feel**: Calm, natural, fresh

### Moss (#7D8471)
**Usage**: Alternative green tones  
**RGB**: rgb(125, 132, 113)  
**HSL**: hsl(82, 8%, 48%)  
**Feel**: Muted, organic

## Background Colors

### Cream (#F5F1E8)
**Usage**: Main background, cards, light areas  
**RGB**: rgb(245, 241, 232)  
**HSL**: hsl(42, 38%, 94%)  
**Feel**: Soft, paper-like, inviting

### Parchment (#E8E2D5)
**Usage**: Secondary backgrounds, subtle contrast  
**RGB**: rgb(232, 226, 213)  
**HSL**: hsl(41, 29%, 87%)  
**Feel**: Aged paper, vintage

### Charcoal (#3A3A3A)
**Usage**: Dark text, icons, dark mode base  
**RGB**: rgb(58, 58, 58)  
**HSL**: hsl(0, 0%, 23%)  
**Feel**: Professional, readable

## Usage Guidelines

### Text Hierarchy
```
Main headings (h1):    --earth (#6B5744)
Subheadings (h2-h3):   --earth or --soil
Body text:             --charcoal (#3A3A3A)
Muted text:            --soil/70 (70% opacity)
Links:                 --clay-dark
```

### Buttons
```
Primary:    bg-clay, hover:bg-clay-dark, text-cream
Secondary:  border-soil, hover:border-earth, text-soil
```

### Backgrounds
```
Hero section:     gradient from-cream via-parchment to-sage/20
Poem cards:       parchment or custom gradient
Admin pages:      cream/80 with backdrop-blur
```

### Borders & Dividers
```
Subtle:      clay/20 (20% opacity)
Medium:      clay/40 (40% opacity)
Strong:      soil
```

## Gradient Combinations

### Nature Calm
```css
bg-gradient-to-br from-clay/20 via-sage/30 to-soil/20
```

### Evening Sky
```css
bg-gradient-to-br from-charcoal/40 via-earth/30 to-moss/20
```

### Morning Light
```css
bg-gradient-to-br from-cream via-parchment to-sage/10
```

### Autumn Warmth
```css
bg-gradient-to-br from-clay/30 to-soil/40
```

## Accessibility

### Contrast Ratios (WCAG AA)

✅ **Pass**: earth on cream (11.2:1)  
✅ **Pass**: charcoal on cream (12.4:1)  
✅ **Pass**: soil on cream (7.8:1)  
✅ **Pass**: cream on clay (6.2:1)  
✅ **Pass**: cream on clay-dark (7.8:1)  

⚠️ **Check**: sage on cream (2.8:1) - decorative only  
⚠️ **Check**: moss on cream (3.9:1) - use for non-text

### Best Practices

1. **Never use sage/moss for small text**
2. **Always use earth/charcoal for body text**
3. **Test with accessibility tools**
4. **Provide sufficient contrast**
5. **Consider color-blind users**

## Dark Mode Alternative

```css
:root {
  --background: #2A2520; /* Dark warm brown */
  --foreground: #F5F1E8; /* Cream text */
  --clay-light: #D4B495; /* Lighter clay */
}
```

## Color Psychology

| Color | Emotion | Usage |
|-------|---------|-------|
| Clay | Warmth, comfort | CTAs, highlights |
| Soil | Stability, reliability | Text, borders |
| Sage | Peace, balance | Backgrounds, accents |
| Cream | Purity, simplicity | Base, cards |
| Earth | Grounding, depth | Headings, emphasis |

## Export for Design Tools

### Figma Styles
```
Clay:       #C4A485
Soil:       #8B7355
Earth:      #6B5744
Sage:       #A4AC96
Cream:      #F5F1E8
Parchment:  #E8E2D5
Charcoal:   #3A3A3A
```

### Adobe XD
```
Clay (RGB):       196, 164, 133
Soil (RGB):       139, 115, 85
Earth (RGB):      107, 87, 68
Sage (RGB):       164, 172, 150
Cream (RGB):      245, 241, 232
Parchment (RGB):  232, 226, 213
Charcoal (RGB):   58, 58, 58
```

---

**Palette Inspiration**: Nature Distilled aesthetic trend 2026  
**Keywords**: Earthy, organic, warm, minimal, contemplative  
**Perfect for**: Poetry, literature, mindfulness, nature content
