# The Compass Method

A prioritisation system built for one person running several businesses at once: luxury travel, hospitality and brand work, and a specialty coffee shop. On top of those sit a personal life, a family and big ideas for the future.

It combines four proven methods, and each one has a single job:

| Layer | Borrowed from | Its job here |
|---|---|---|
| **Capture** | GTD (David Allen) | Get everything out of your head with no judgement. Sorting happens later. |
| **Sort** | Eisenhower Matrix | Decide *when* each item happens, using urgency × importance. |
| **Weigh** | Maslow's hierarchy (adapted) | Break ties: foundations come before growth. |
| **Commit** | Ivy Lee + 1-3-5 rule | Turn a long list into a short day you can actually finish. |

No single method is enough by itself. Eisenhower is good at sorting but gives no daily limit. Ivy Lee sets the limit but doesn't sort anything. Maslow says what matters most in life but not what to do this afternoon. Used together, each covers the others' gaps.

---

## 1. Capture: say it however it comes out

One word, a half sentence, Portuguese, English, a voice-note transcript. All of it is valid input. For example:

> `ligar fornecedor café etiópia`
> `proposal for the Four Seasons group, they want it before Friday`
> `someday: open a second café near the beach`
> `dentist`

Claude never asks you to reformat. It fills in what it can and asks **at most one** short question when something critical (usually a date) is genuinely unclear.

---

## 2. Sort: the four horizons

Every item goes into exactly one horizon:

| Horizon | Eisenhower quadrant | Rule | Lives in |
|---|---|---|---|
| 🔴 **NOW** | Urgent + Important | Something breaks if it waits past today: a deadline in under 24h, a client or guest waiting, money or reputation at risk, or other people blocked. | `brain/now.md` |
| 🟠 **THIS WEEK** | Important, not urgent *yet* | Moves a goal forward or has a deadline within 7 days. **This is where the real value is.** Protect it. | `brain/week.md` |
| 🔵 **LATER** | Important, not this week | Has a date or trigger further out: renewals, events, seasonal planning. | `brain/later.md` |
| ⚪ **SOMEDAY** | Not urgent, not important *now* | Ideas, ventures, "what if" thinking. Not trash: a seed bank. | `brain/someday.md` |

Two side lists keep the main horizons clean:

- **⏳ WAITING**: things handed to someone else or waiting on a reply. → `brain/waiting.md`
- **🗑 DROP**: urgent but not important, and nobody needs to do it. Claude will suggest dropping it, and you decide.

### The four triage questions Claude asks itself

1. **What breaks if this waits 48 hours?** Nothing → not NOW.
2. **Does it move a goal, a client relationship or the brand forward?** Yes → important.
3. **Does it need *you*, specifically?** No → delegate → WAITING.
4. **Under 2 minutes?** → flagged ⚡ so you can clear it immediately (GTD two-minute rule).

---

## 3. Weigh: the foundations ladder (Maslow, adapted)

When two items compete for the same slot, the lower level wins. A business built on a neglected foundation doesn't last.

```
  5  VISION      future ventures, big ideas, long-range strategy
  4  GROWTH      brand, marketing, new business, partnerships
  3  CLIENTS     guests, partners, customers, people expecting something from you
  2  OPERATIONS  cash, payroll, suppliers, legal, tax, the café running smoothly
  1  FOUNDATION  health, family, rest, personal obligations
```

Each item gets a level tag (`L1`–`L5`). This also works as a mirror: if a whole week is L3–L4 and there's nothing at L1, Claude will say so.

---

## 4. Commit: the daily plan

Every morning (or the night before, which is better) Claude builds the day from NOW plus the best of THIS WEEK:

- **The Big 3** (Ivy Lee, reduced from six to three because your days vary too much for six fixed items). Worked through in order. Don't start #2 until #1 is done.
- **1-3-5 capacity cap**: 1 big, 3 medium, 5 small. That's the ceiling. Anything beyond it is carried over, not crammed in.
- **⚡ Quick hits**: two-minute items, batched.

Unfinished items move to tomorrow **with a reason noted**. If an item gets moved three times, Claude raises it: delegate it, schedule it properly or drop it.

---

## 5. The rhythm

| When | Command | What happens |
|---|---|---|
| Any time | `/dump <anything>` (or just type it) | Capture → sort → file. Shows you where everything landed. |
| Morning | `/today` | Builds the day: Big 3, 1-3-5, quick hits. |
| As you go | `/done <item>` | Marks it complete and logs it in today's report. |
| Evening | `/wrap` | Daily report: what moved, what slipped, tomorrow's draft Big 3. |
| Friday or Sunday | `/review` | Weekly review: clear the inbox, promote/demote items, check the foundations ladder, look at SOMEDAY. |

---

## Areas (tags)

Every item gets one area so you can see where your energy goes:

`#travel` luxury travel and hospitality · `#cafe` the coffee shop · `#brand` marketing, branding, comms · `#bizdev` commercial strategy, partnerships, proposals · `#astro` astrology work · `#personal` health, family, home · `#admin` finance, legal, paperwork

New areas get added when a pattern shows up. Nothing is fixed.
