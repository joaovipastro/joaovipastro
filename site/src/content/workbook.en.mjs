export default {
  lang: 'en',
  title: 'Mise en Place',
  subtitle: 'The Workbook',
  tagline: 'A planning method for people who run more than one life at once',
  owner: 'This workbook belongs to',
  started: 'Started on',
  contents: 'Contents',
  module: 'Module',
  idea: 'The idea',
  keys: 'Keep in mind',
  exercise: 'Exercise',
  practice: 'This week’s practice',
  tools: 'Tools',
  toolsIntro: 'Copy these pages as often as you need. They are the working parts of the method.',
  scaleLow: 'rarely',
  scaleHigh: 'almost always',
  intro: {
    title: 'Before you begin',
    body: [
      'Every good kitchen starts the same way. Before service, the cook sets out everything the night will need: knives sharpened, sauces reduced, stations clean. When the rush comes, they don’t think about logistics. They think about the plate.',
      'This workbook applies that discipline to a working life. It rests on three questions, asked before any action: <b>Result</b> — what do I actually want? <b>Reason</b> — why does it matter to me? <b>Route</b> — what is the simplest path there?',
      'Write in it. The exercises are short on purpose, and the writing is where the change happens. One module a week is the right pace for most people.',
    ],
  },
  modules: [
    {
      n: 0, title: 'Orientation',
      idea: 'Know where you are starting from.',
      body: ['Answer quickly. First instincts are more useful than considered ones here. You will score yourself again at the end of Module 7.'],
      exercises: [
        { title: 'Your baseline', intro: 'Rate each statement from 1 (rarely true) to 5 (almost always true).', fields: [
          { t: 'scale', items: [
            'At the start of most days, I know the three things that matter most.',
            'At the end of most weeks, I feel I moved something important forward.',
            'My calendar reflects what I say my priorities are.',
            'I spend most of my working hours on work only I can do.',
            'I have regular time for the people and things that restore me.',
            'When my plans fall apart, I can rebuild them quickly.',
            'I know why my current main goals matter to me personally.',
          ] },
          { t: 'lines', label: 'Total (out of 35)', n: 1 },
        ] },
        { title: 'Finish the sentences', fields: [
          { t: 'lines', label: 'The part of my life that gets the least intentional attention is…', n: 2 },
          { t: 'lines', label: 'The thing I keep saying I’ll get to is…', n: 2 },
          { t: 'lines', label: 'I’m at my best when…', n: 2 },
          { t: 'lines', label: 'My one specific reason for doing this course is…', n: 2 },
        ] },
      ],
      practice: 'For three days, notice the moments you feel busy but not useful. Write a word each time.',
    },
    {
      n: 1, title: 'Planning as Design',
      idea: 'A plan isn’t a list of what you’ll do. It’s a decision about what kind of life you’re building.',
      body: [
        'Most planning keeps you organised inside the life you already have. Design starts somewhere else: from the experience you want to create, working back to the details that will produce it.',
        'So every planning session begins with a different question. Not “What do I need to do?” but “What do I want to be true?”',
      ],
      keys: ['Busy is not the same as moving.', 'Shoulds rarely happen. Change begins when a standard is no longer acceptable to you — when a should becomes a must.', 'Name your life areas in your own words. Names that sound like you hold your attention.'],
      exercises: [
        { title: 'The long list', intro: 'Twelve minutes, without stopping. Everything you’d like to be, do, have, learn, experience or give. Then write a timeframe beside each: 1, 3, 5, 10 or 20 years. Circle the four or five one-year items that excite you most.', fields: [{ t: 'lines', n: 14 }] },
        { title: 'Your Life Map', intro: 'Five to seven areas. Write the vision in the present tense, as if it were already true.', fields: [{ t: 'table', cols: ['Area', 'Vision', 'Current standard', 'Role at my best', 'Score /10'], rows: 7, tall: true }] },
        { title: 'The gap', fields: [
          { t: 'lines', label: 'Which area, if it improved by two points, would lift every other area with it? (This is your lead area.)', n: 2 },
          { t: 'lines', label: 'Which area have I been quietly neglecting because another one is louder?', n: 2 },
          { t: 'lines', label: 'Which current standard is no longer acceptable to me?', n: 2 },
        ] },
      ],
      practice: 'Read your Life Map each morning before opening any messages. Ninety seconds.',
    },
    {
      n: 2, title: 'Why Lists Fail',
      idea: 'A list can tell you what to do. It can’t tell you why — so it can’t tell you what matters.',
      body: [
        'Lists hold tasks, not outcomes. They grow faster than you can clear them, reward whoever asked last, and carry no reason to act today rather than next week.',
        'Time is also felt, not just measured. An hour of clarity and an hour of anxiety are the same on a clock and very different in a life. Clarity creates time.',
      ],
      keys: ['Overwhelm is a signal that you are trying to deal with everything at once. The answer is to choose.', '“I don’t have time” is often a state, not a fact. Try “That isn’t a priority right now.”', 'The fastest way to get more done is to do less. Decide in advance what you won’t do.'],
      exercises: [
        { title: 'The list autopsy', intro: 'Mark each item on your current list: R (moves a vision forward), M (maintenance), O (someone else’s priority), ? (can’t remember why).', fields: [{ t: 'table', cols: ['R', 'M', 'O', '?', 'Total'], rows: 1 }] },
        { title: 'Reactivity Audit — five evenings', fields: [{ t: 'table', cols: ['Day', 'Most important thing I moved', 'Time that didn’t need to be mine', 'When I felt in control'], rows: 5, tall: true }, { t: 'lines', label: 'Three patterns I notice', n: 3 }] },
        { title: 'Your Not-To-Do list', intro: 'At least seven things you have decided to stop doing.', fields: [{ t: 'list', n: 7 }] },
      ],
      practice: 'Each morning, before looking at your list, write: “Today will be a good day if…” Do the matching item first.',
    },
    {
      n: 3, title: 'The Three Questions',
      idea: 'Decide what you want and why before deciding what to do. The plan becomes shorter, clearer and easier to follow.',
      body: [
        '<b>Result</b> is an outcome, not an activity: something you could see and confirm is done. <b>Reason</b> is the fuel — personal, emotional, and written in more than one layer. <b>Route</b> is the short list of actions, with the essential few marked as musts.',
        'A complete Reason looks at both sides: what you gain if you do it, and what it costs you if the pattern continues. Lead with what you want; use the cost as a push when the pull isn’t enough.',
      ],
      keys: ['Five tests of a Result: is it an outcome, specific, yours, the right size — and does it pull you?', 'If you could only do two actions on the Route, which two?', 'Before every meeting, agree the outcome first.'],
      exercises: [
        { title: 'A full plan', intro: 'Write one for your lead area. Copy this page for a work plan and a personal plan.', fields: [
          { t: 'lines', label: 'Result', n: 2 },
          { t: 'lines', label: 'What I gain', n: 3 },
          { t: 'lines', label: 'What it costs me if I don’t', n: 2 },
          { t: 'lines', label: 'Which of my values it serves', n: 1 },
          { t: 'table', cols: ['Action', 'Must', 'Time', 'Who', 'When'], rows: 7 },
        ] },
        { title: 'Task translation', intro: 'Take ten items from your list. Ask “What result is this in service of?” until you reach something meaningful — or nothing.', fields: [{ t: 'table', cols: ['Task', 'The result behind it', 'Keep / Maintain / Delete'], rows: 10 }] },
      ],
      practice: 'Before any block of work longer than 30 minutes, write Result, Reason, Route in the margin. One line each.',
    },
    {
      n: 4, title: 'From Capture to Commitment',
      idea: 'Once a week, empty your head, group everything by the result it serves, and commit to the essential few.',
      body: [
        'The Weekly Mise en Place takes sixty minutes and has five stages: capture, group, plan, commit, prepare. If you keep only one habit from this course, keep this one.',
        'Before grouping, sort each item once: discard, delegate, do (if under two minutes), date, file, or stop it arriving. A third of most lists disappears here.',
      ],
      keys: ['Give your musts your best hours, before the inbox.', 'Protect at least one high-value, non-urgent task every day. It is where the future is built.', 'A clear, courteous no builds more trust than a yes you can’t honour.'],
      exercises: [
        { title: 'Your first weekly session', intro: 'Use the Weekly Mise en Place tool at the back. Then reflect.', fields: [
          { t: 'table', cols: ['Items captured', 'Groups formed', 'Must hours before cutting', 'After cutting'], rows: 1 },
          { t: 'lines', label: 'How I felt at the start — and at the end', n: 3 },
        ] },
        { title: 'Triage', intro: 'P1: serious consequences today. P2: high value, not urgent. P3: someone will be disappointed eventually. P4: doesn’t matter.', fields: [{ t: 'table', cols: ['P1', 'P2', 'P3', 'P4'], rows: 5 }] },
        { title: 'A no I need to say', fields: [{ t: 'lines', label: 'The request', n: 1 }, { t: 'lines', label: 'What I’ll say — warm, clear, under sixty words', n: 3 }] },
      ],
      practice: 'Write the Daily Card every morning before the inbox. Protect one block of must time every working day.',
    },
    {
      n: 5, title: 'Leverage',
      idea: 'Your time should go where only you can add value. Everything else can be stopped, simplified, systemised, handed over — or learned from someone who has done it.',
      body: [
        'Every hour spent on work someone else could do is an hour not spent on the relationships, decisions and standards only you can provide.',
        'Start with an 80/20 map: which few clients, products or activities produce most of your results — and which take most of your time? The mismatches are where leverage hides.',
      ],
      keys: ['Hand over a Result with its Reason, not a task.', 'A good handover has five parts: result, reason, boundaries, resources, check-in.', 'Decide in writing what you’ll do with the hours you free, or they will fill back up.'],
      exercises: [
        { title: 'Your 80/20 map', fields: [{ t: 'grid', cols: ['Produces a lot', 'Produces little'], rows: ['Takes a lot of my time', 'Takes little of my time'] }] },
        { title: 'Your Leverage Ledger', intro: 'Five items where a lever would free the most time or energy.', fields: [{ t: 'table', cols: ['Activity', 'Hrs/wk', 'Lever', 'First step', 'By when', 'Hrs freed'], rows: 5 }, { t: 'lines', label: 'What I’ll do with the freed hours', n: 2 }] },
        { title: 'One proper handover', fields: [
          { t: 'lines', label: 'Result — what “done well” looks like', n: 2 },
          { t: 'lines', label: 'Reason — why it matters', n: 2 },
          { t: 'lines', label: 'Boundaries — budget, deadline, what they decide alone', n: 2 },
          { t: 'lines', label: 'Resources — templates, contacts, examples', n: 1 },
          { t: 'lines', label: 'Check-in — date and what we’ll review', n: 1 },
        ] },
      ],
      practice: 'Each time you start a task, ask: “Is this only-me work?” If not, add it to the Ledger.',
    },
    {
      n: 6, title: 'Time, Focus and State',
      idea: 'Your calendar shows what you actually prioritise. Your state decides how well you execute. Design both on purpose.',
      body: [
        'Time targets reverse the usual order: decide how much of each week every area of your life deserves, and book those minimums first.',
        'State is a working asset. Sleep, food and movement come first. Then three levers: your body, the questions you ask yourself, and your breath.',
      ],
      keys: ['Single-task in 45-minute rounds. Keep a list of ten-minute tasks for the gaps.', 'When something goes wrong, ask: what’s useful here? what isn’t right yet? what will I do — and stop doing? how can I enjoy fixing it?', 'Two-minute heart breath: attention on the chest, five seconds in, five out, a feeling of real gratitude. Ten breaths.'],
      exercises: [
        { title: 'Time targets', fields: [{ t: 'table', cols: ['Area', 'Minimum / week', 'Ideal / week', 'Where in the week'], rows: 7 }] },
        { title: 'Your Restoratives Menu', intro: 'The small things that reliably return you to your best state.', fields: [
          { t: 'lines', label: 'Small plates · 1–5 minutes', n: 5 },
          { t: 'lines', label: 'Mains · 15–60 minutes', n: 3 },
          { t: 'lines', label: 'Tasting menus · half a day or more', n: 2 },
        ] },
        { title: 'My ideal working day', fields: [{ t: 'table', cols: ['Time', 'What happens'], rows: 10 }] },
      ],
      practice: 'Live by your time targets for five days. Use one small plate before each block of must time.',
    },
    {
      n: 7, title: 'The Long Game',
      idea: 'A system is only as good as the rituals that keep it alive. Build a few, keep them simple, and use them for years.',
      body: [
        'Write your own rules for winning — rules you can meet regularly, that make it easy to feel good and hard to feel bad. Then keep the rhythm: a daily card, a weekly hour, a quarterly review.',
        'Each morning, rehearse. Picture today’s three Results done well, and yourself at your best inside them. Feel it before it happens, then carry that into the first must.',
      ],
      keys: ['When you drift, don’t restart with a new system. Do the 20-minute reset: capture, pick three, one must.', 'When your state is the problem, run the ten-day reset: no dwelling, solutions first, begin again if you slip.'],
      exercises: [
        { title: 'My rules for winning', fields: [{ t: 'list', n: 6, prefix: 'I win when…' }] },
        { title: 'My values, in order', fields: [{ t: 'table', cols: ['States I want to feel most', 'States I most want to avoid'], rows: 6 }] },
        { title: 'Your baseline, again', intro: 'Return to Module 0 and score the seven statements again.', fields: [
          { t: 'table', cols: ['Score then', 'Score now'], rows: 1 },
          { t: 'lines', label: 'What changed most', n: 2 },
          { t: 'lines', label: 'The part of the method I’ll work hardest to keep', n: 2 },
        ] },
      ],
      practice: 'Book the rhythm now: 13 weekly sessions, three monthly look-backs, and your first Quarterly Review.',
    },
  ],
  toolPages: [
    { title: 'Weekly Mise en Place', sub: 'Sixty minutes, same time every week.', fields: [
      { t: 'lines', label: '1 · Capture — everything on my mind (10 min)', n: 8 },
      { t: 'lines', label: '2 · Sort and group — discard, delegate, do, date, file, stop (10 min)', n: 3 },
      { t: 'table', cols: ['Result this week', 'Reason', 'Musts', 'Hours'], rows: 5 },
      { t: 'table', cols: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], rows: 1, label: '4 · Must-time blocks booked' },
      { t: 'check', items: ['Musts fit the time I really have', 'Time targets checked', 'One restorative booked', 'Tomorrow’s Daily Card written'] },
    ] },
    { title: 'Daily Card', sub: 'Ten minutes in the morning. Two in the evening.', fields: [
      { t: 'lines', label: 'Morning questions — grateful for · looking forward to · proud of · who I love · committed to', n: 3 },
      { t: 'lines', label: 'Today will be a good day if…', n: 1 },
      { t: 'table', cols: ['Result', 'Musts, in order', 'P1–P4', 'Done'], rows: 3 },
      { t: 'lines', label: 'Protected block · message windows · if the day turns, I’ll let go of', n: 2 },
      { t: 'lines', label: 'Evening — what I gave · what I learned · one win · tomorrow’s first action', n: 4 },
    ] },
    { title: 'Quarterly Review', sub: 'Two to three hours, every thirteen weeks.', fields: [
      { t: 'lines', label: 'Celebrate — everything that went well', n: 4 },
      { t: 'table', cols: ['What didn’t go to plan', 'What it taught me'], rows: 3 },
      { t: 'table', cols: ['Area', 'Score then', 'Score now', 'Next quarter’s Result'], rows: 7 },
      { t: 'check', items: ['Time targets adjusted', 'Leverage Ledger reviewed', 'Restoratives Menu refreshed', 'Rules for winning still true', 'Next review booked'] },
      { t: 'lines', label: 'One sentence for the quarter ahead', n: 1 },
    ] },
  ],
  closing: 'The method is simple on purpose. What makes it work is the same thing that makes a great hotel or a great café work: consistency in the details, done with care, until it becomes simply how things are done. Set your station. Then cook.',
};
