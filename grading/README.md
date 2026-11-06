# House grade: *Outono ao Longo dos Rios*

Every image in the series is graded to one standard, measured from the
reference cover in `reference/outono-ao-longo-dos-rios.jpg`. This is the
single source of truth. The grade isn't reinterpreted from image to image.

## The standard

| | Target |
|---|---|
| Structure | Blue and gold split complementary, bridged by cool green |
| Hue share | Blue ~40% · gold/amber ~33% · green ~25% · wine under 2% |
| Sky | `#2F90CB` zenith → `#A1C3DC` mid → `#D2E1F0` haze |
| Green | Cool, bluish (`#1F5A47`, hue ~160°), never yellow-green |
| Gold | `#846632` body · `#DFC472` highlight · `#F6E4AC` specular |
| Shadows | Cool teal / slate (`#22403D`, `#0E272E`), never neutral black |
| Wine | `#551C1D`, an accent only |
| Tone | Mean L\* ~52, mid-tone heavy, under 1% clipped, no crushed blacks |
| Saturation | Mean C\* ~25, peaks only in sky blue and leaf gold |
| Output | sRGB, embedded profile, JPEG q95 4:4:4 |

## What the grade does, in order

0. **White balance.** Removes the source's cast and adopts the reference's.
1. **Tone.** Maps the luminance distribution onto the reference curve.
2. **Hue families.** Pulls blues, golds, greens and reds toward the reference
   hue and chroma, and tightens each family so it reads as one coherent colour.
3. **Saturation.** Brings overall chroma to the reference level, with a soft ceiling.
4. **Split toning.** Neutrals take the reference tint: cool teal shadows,
   cool blue-white highlights.

It changes colour and tone only. It never crops, retouches, adds or removes anything.

## Use

```
python3 grading/grade.py photo1.jpg photo2.heic -o grading/output --compare
```

- `--strength 0.7` gives a lighter touch. The default is 1.0, the full standard.
- `--protect-skin` holds skin tones back from the gold push. Use it when people are in frame.

## Limits

Grading carries colour, tone and saturation. It can't create what isn't in the
frame: haze for depth, a blue sky on an overcast day, or autumn foliage in a
summer shot. Images like that are flagged, not forced.
