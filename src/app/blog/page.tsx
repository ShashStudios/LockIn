"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPreferences } from "@/lib/storage";

// Full-length SEO articles with comprehensive content
const articles = [
    {
        id: 1,
        category: "Deep Work",
        title: "The Science of Deep Work: How Focused Sessions Transform Your Brain",
        subtitle: "How concentrated effort creates neural pathways that shallow work never can",
        date: "January 2026",
        readTime: "8 min read",
        sections: [
            {
                content: "Deep work, a term coined by Georgetown professor Cal Newport, refers to professional activities performed in a state of distraction-free concentration. These efforts create new value, improve your skill, and are hard to replicate. In a world increasingly fragmented by notifications, deep work has become both rare and valuable."
            },
            {
                heading: "The Neuroscience Behind Deep Focus",
                content: "When you engage in deep work, your brain undergoes remarkable changes at the cellular level. Sustained focus triggers a process called myelination—the wrapping of neural circuits in a fatty tissue called myelin. This coating allows electrical impulses to travel faster and more efficiently along neural pathways.\n\nResearch from neuroscience labs has shown that deliberate practice in a focused state can increase myelin by up to 50% in relevant brain regions. This is why experts become faster and more efficient at their skills over time—their brains have literally been rewired through concentrated effort.\n\nThe prefrontal cortex, responsible for complex thinking and decision-making, requires significant energy to operate at full capacity. Deep work sessions allow this brain region to operate without the constant interruptions that force it to repeatedly restart its processing."
            },
            {
                heading: "Why Shallow Work Dominates Modern Life",
                content: "Despite its importance, deep work has become increasingly rare. The modern workplace is designed around constant connectivity: open offices, instant messaging, the expectation of immediate email response. These create an environment optimized for shallow work—logistical tasks that don't require intense concentration.\n\nStudies show that the average knowledge worker is interrupted every 11 minutes and takes an average of 23 minutes to return to the original task. This means that without intentional intervention, most workers never achieve the sustained focus required for deep work.\n\nSocial media and smartphones have extended this pattern into personal time. The constant availability of novel stimulation trains the brain to crave distraction. Over time, this actually reduces your capacity for deep work—the neural circuits for sustained attention weaken from disuse."
            },
            {
                heading: "Building Your Deep Work Practice",
                content: "Developing a deep work practice requires intentional habit formation. Start small—even 30 minutes of true concentration beats four hours of scattered attention. Gradually increase your deep work capacity like you would build any other skill.\n\nSchedule deep work sessions in advance and protect them ruthlessly. Treat them like important meetings that cannot be cancelled. Choose a consistent location that becomes associated with focused work.\n\nEliminate potential distractions before starting. Put your phone in another room, close unnecessary browser tabs, and inform others that you'll be unavailable. Every potential interruption you remove increases the probability of achieving flow state.\n\nEnd each session by capturing where you left off and what comes next. This makes resuming easier and prevents the anxiety of forgetting important threads."
            },
            {
                heading: "The Competitive Advantage of Deep Work",
                content: "In an economy that rewards specialized skill and unique output, the ability to perform deep work is becoming increasingly valuable. While technology makes shallow work easier to outsource and automate, the capacity for sustained creative thought remains distinctly human.\n\nProfessionals who cultivate deep work capability produce more in less time. They master complex skills faster. They create work that's harder to replicate. In knowledge work, this translates directly to career capital and economic value.\n\nThe paradox is that as deep work becomes rarer, it becomes more valuable. Those who can disconnect from distraction and focus intensely on cognitively demanding tasks will increasingly stand out in a world of scattered attention."
            }
        ]
    },
    {
        id: 2,
        category: "Productivity",
        title: "Why Multitasking Destroys Your Productivity (And What to Do Instead)",
        subtitle: "The cognitive cost of task-switching and practical alternatives",
        date: "January 2026",
        readTime: "7 min read",
        sections: [
            {
                content: "We live in a culture that celebrates multitasking as a virtue. Job postings list it as a required skill. Busy professionals boast about handling multiple projects simultaneously. Yet research consistently shows that what we call multitasking is actually rapid task-switching—and it comes with severe cognitive costs."
            },
            {
                heading: "The Science of Switching Costs",
                content: "Every time you switch tasks, your brain pays a 'switching cost'—a period of reduced performance as your mind reorients to the new context. This isn't just a momentary pause; it includes the time needed to recall where you were, what resources you need, and what approach you were taking.\n\nResearchers at the University of California found that it takes an average of 23 minutes and 15 seconds to fully recover focus after an interruption. If you're switching tasks every 11 minutes (the average for knowledge workers), you never actually achieve full focus on anything.\n\nBrain imaging studies reveal that task-switching activates the prefrontal cortex intensely, consuming mental energy that would otherwise go toward actual work. This explains why a day of constant switching feels exhausting even if you haven't produced much."
            },
            {
                heading: "The Multitasking Paradox",
                content: "Research from Stanford University uncovered a surprising finding: heavy multitaskers perform worse at multitasking than light multitaskers. People who constantly switch between tasks become worse at filtering irrelevant information and slower at switching between tasks.\n\nThis suggests that multitasking isn't just inefficient in the moment—it actively damages the cognitive abilities it requires. The brain adapts to what we train it to do, and constant switching trains it for fragmentation rather than focus.\n\nWhat feels like productivity is often just busyness. True productivity is measured in completed meaningful work, not in number of tasks touched or emails answered. Finishing one important thing beats starting ten."
            },
            {
                heading: "Single-Tasking Strategies That Work",
                content: "Time-blocking is the antidote to multitasking. This practice involves dedicating specific periods to single tasks without interruption. Rather than letting tasks compete for attention throughout the day, you give each its own protected time.\n\nThe Pomodoro Technique offers a structured approach: 25 minutes of focused work on one task, followed by a 5-minute break. After four cycles, take a longer break. The timer creates artificial urgency and a clear end point.\n\nBatching similar tasks together reduces switching costs. Handle all emails during designated periods rather than responding as they arrive. Make all phone calls back-to-back. Group administrative tasks into a single block."
            },
            {
                heading: "Implementing the Switch",
                content: "Changing from multitasking to single-tasking requires both habit change and environment design. Start by identifying your three most important tasks each day. Protect uninterrupted time for each.\n\nManage others' expectations. Let colleagues know when you're available for interruption and when you're not. Most 'urgent' requests can actually wait an hour or two.\n\nNotice how much more you accomplish when you stop fragmenting your attention. Track your completed work under both approaches. The data usually speaks for itself—focused work dramatically outperforms scattered attention."
            }
        ]
    },
    {
        id: 3,
        category: "ADHD",
        title: "ADHD and the Focus Paradox: Working With Your Brain",
        subtitle: "Understanding hyperfocus, interest-based attention, and strategies that actually work",
        date: "January 2026",
        readTime: "10 min read",
        sections: [
            {
                content: "If you have ADHD, you've probably experienced a frustrating paradox: you can't focus on boring tasks for five minutes, but you can spend six hours absorbed in something interesting without noticing time pass. This isn't a contradiction—it's a clue about how the ADHD brain actually works."
            },
            {
                heading: "The Interest-Based Nervous System",
                content: "Dr. William Dodson describes ADHD as having an 'interest-based nervous system' rather than an 'importance-based' one. Neurotypical brains can generate focus based on what's important, even if it's not interesting. ADHD brains struggle with this—they're wired to focus based on interest, novelty, urgency, or personal passion.\n\nThis explains why you can hyperfocus on video games or creative projects while struggling to complete paperwork. It's not laziness or a character flaw—it's neurology. The dopamine systems that regulate attention function differently in ADHD.\n\nUnderstanding this distinction is liberating. Instead of fighting your brain's wiring, you can work with it by making important tasks more engaging or creating artificial urgency."
            },
            {
                heading: "The Hyperfocus Superpower",
                content: "Hyperfocus—the intense concentration ADHD brains can achieve on engaging tasks—is often overlooked in discussions of the condition. When conditions are right, people with ADHD can outperform neurotypical peers on creative and complex tasks.\n\nMany successful entrepreneurs, artists, and innovators have ADHD. The same brain that struggles with routine also excels at making novel connections and persisting through early-stage challenges when pursuing an exciting vision.\n\nThe key is learning to channel hyperfocus toward productive ends. This means structuring your life so that important work triggers the conditions for hyperfocus: novelty, urgency, personal interest, or competition."
            },
            {
                heading: "External Structure for Internal Chaos",
                content: "ADHD makes self-regulation difficult, but external systems can provide the structure your brain craves. Where neurotypical brains generate internal cues, you can create external ones.\n\nVisual timers make time tangible. Body doubling—working in the presence of others—creates accountability without pressure. Environmental design removes distractions and makes starting easier.\n\nRoutines and rituals reduce the decision-making that depletes ADHD executive function. When the path is clear, following it becomes easier than deciding what to do.\n\nTask management systems externalize memory, reducing the anxiety of forgotten commitments. When you trust your system, your brain can stop trying to hold everything and actually focus."
            },
            {
                heading: "ADHD-Friendly Productivity Strategies",
                content: "Traditional productivity advice often fails for ADHD because it assumes consistent executive function. Better approaches acknowledge ADHD's variable nature.\n\nTime-blocking with buffers accounts for time blindness. Adding 50% more time than you think you need usually comes closer to reality than optimistic estimates.\n\nBreaking tasks into smaller steps reduces initiation resistance. 'Start writing the introduction' is more actionable than 'write the report.'\n\nParallel projects allow you to rotate when interest flags. Rather than forcing yourself through boredom, switch to another important task and return later.\n\nUrgency creation helps: artificial deadlines, accountability partners, or 'shipping' work before it feels ready. The ADHD brain often performs best under pressure—the key is creating healthy pressure rather than waiting for crisis."
            },
            {
                heading: "Building a Life That Works",
                content: "Long-term ADHD management involves selecting environments and careers that work with your brain. Roles requiring creativity, crisis response, or constant novelty may suit ADHD better than those demanding steady routine.\n\nSelf-compassion is essential. Years of struggling in systems designed for neurotypical brains often create shame and negative self-talk. Recognizing ADHD as neurological difference, not moral failure, allows you to problem-solve rather than self-criticize.\n\nMedication, when appropriate, can be transformative—but it's not the whole solution. Combining medication with practical strategies and environmental design produces the best outcomes. Building an ADHD-friendly life is an ongoing process of experimentation and adaptation."
            }
        ]
    },
    {
        id: 4,
        category: "Pomodoro",
        title: "The Complete Guide to the Pomodoro Technique",
        subtitle: "Master the tomato timer method for sustainable productivity",
        date: "January 2026",
        readTime: "9 min read",
        sections: [
            {
                content: "The Pomodoro Technique, developed by Francesco Cirillo in the late 1980s, has become one of the world's most popular time management methods. Named after the tomato-shaped kitchen timer Cirillo used as a university student, this simple approach has helped millions focus better and accomplish more."
            },
            {
                heading: "How the Technique Works",
                content: "The classic Pomodoro method is straightforward: work for 25 minutes with complete focus on a single task, then take a 5-minute break. After completing four 'pomodoros,' take a longer break of 15-30 minutes. That's it.\n\nThe simplicity is deceptive—this structure addresses several psychological barriers to productivity. The timer creates artificial urgency, triggering focus. The defined end point makes starting easier. The mandatory breaks prevent burnout and maintain energy throughout the day.\n\nDuring the 25-minute focus period, you work on one task without interruption. No email, no messages, no 'quick' diversions. When distracting thoughts arise, jot them down to address later and return to the task."
            },
            {
                heading: "The Psychology Behind the Timer",
                content: "The Pomodoro Technique works because it aligns with how the brain actually functions. Research on ultradian rhythms suggests humans naturally cycle through periods of higher and lower alertness. Short, focused bursts with recovery periods match this biological pattern.\n\nThe 25-minute interval is short enough to avoid the resistance we feel toward long, undefined work sessions. Committing to 25 minutes feels manageable, even for unpleasant tasks. Once started, momentum often carries you forward.\n\nKnowing a break is coming reduces the urge to seek distraction. When you feel the pull to check email, you can remind yourself that the break is only minutes away. This reframes willpower as a brief delay rather than endless resistance."
            },
            {
                heading: "Customizing Your Practice",
                content: "The standard 25/5 split isn't sacred. The inventor himself suggests adapting intervals to your needs and the type of work you do.\n\nFor deep creative work, longer intervals often work better. Some practitioners prefer 50/10 or even 90/20. Longer intervals allow for achieving flow states that 25 minutes might interrupt too soon.\n\nFor admin tasks or work you're resisting, shorter intervals might be better. Even 15/3 can help you start tasks that feel overwhelming.\n\nThe key principles matter more than specific durations: focused work periods, mandatory breaks, and clear transitions between the two."
            },
            {
                heading: "Handling Interruptions",
                content: "Cirillo's original method includes strategies for the inevitable interruptions. When someone needs your attention during a pomodoro, you have options: inform them you're in the middle of something, negotiate a later time, schedule a callback, and only then interrupt if it's truly urgent.\n\nTrack both internal and external interruptions. Internal interruptions—your own urge to check email, look something up, grab a snack—reveal your distraction patterns. External interruptions reveal environment issues to address.\n\nIf a pomodoro is interrupted and you can't quickly return, it doesn't count. This isn't punishment—it's recognizing that fragmented time produces different results than focused time."
            },
            {
                heading: "Beyond Counting Tomatoes",
                content: "As your practice matures, Pomodoro becomes more than a timer. Tracking pomodoros over time reveals how long tasks actually take versus how long you think they take. This data improves planning and prevents overcommitment.\n\nYou'll develop intuition about your capacity. Knowing you can reliably complete 8-10 quality pomodoros per day helps you make realistic commitments.\n\nEventually, some practitioners graduate from the timer entirely. The technique has trained their focus capacity to the point where they can concentrate without external structure. But most find value in returning to the timer whenever focus becomes challenging."
            }
        ]
    },
    {
        id: 5,
        category: "Pareto",
        title: "The 80/20 Principle: Doing Less to Achieve More",
        subtitle: "How identifying your vital few tasks can transform your results",
        date: "January 2026",
        readTime: "8 min read",
        sections: [
            {
                content: "In 1906, Italian economist Vilfredo Pareto observed that 80% of Italy's land was owned by 20% of the population. This unequal distribution appears throughout nature and human systems—and it has profound implications for how you should spend your time."
            },
            {
                heading: "The Principle in Action",
                content: "The 80/20 principle (also called the Pareto Principle) suggests that roughly 80% of effects come from 20% of causes. In business, 80% of revenue often comes from 20% of customers. In software, 80% of users use only 20% of features.\n\nApplied to personal productivity, this means a small portion of your activities generates most of your meaningful results. Yet most people distribute attention evenly across tasks, treating the vital few the same as the trivial many.\n\nIdentifying and focusing on your high-leverage 20% can produce dramatic improvements in results without requiring more hours or effort—just better allocation."
            },
            {
                heading: "Finding Your High-Leverage Activities",
                content: "Identifying your 20% requires honest analysis. Not all work that feels productive actually moves you toward your goals. Not all busyness creates value.\n\nAsk yourself: Which of my activities produce the most valuable outcomes? Which tasks, if done exceptionally well, would have the biggest impact on my goals? Which things do I do that would be difficult to replicate or delegate?\n\nTrack where your significant wins actually came from. Often we overestimate the value of activities we enjoy or that feel urgent, while underestimating quiet activities that compound over time.\n\nFor most knowledge workers, the highest-leverage activities involve creating, strategizing, building relationships, or learning—not processing email or attending meetings."
            },
            {
                heading: "Ruthless Prioritization",
                content: "Once you identify high-leverage activities, the next step is protecting time for them ruthlessly. This means saying no to many good things to make room for the great things.\n\nSchedule your 20% activities first. Put them on the calendar before anything else. The most important work deserves protected time, not whatever's left after responding to requests.\n\nLearn to distinguish between urgent and important. Much of what feels urgent is actually just loud. True importance is about long-term impact, not immediate pressure.\n\nEliminating the 80% of low-value activities is just as important as doing the 20%. Every hour spent on the trivial many is an hour not spent on the vital few."
            },
            {
                heading: "Applying 80/20 Recursively",
                content: "Here's where the principle becomes powerful: you can apply 80/20 to the 20%. Within your top 20% of activities, a further 20% produces 80% of those results.\n\nThis means 4% of your activities produce about 64% of your results. And 0.8% produces about 50%. The leverage at the top is extreme.\n\nIdentifying these ultra-high-leverage activities and structuring your life around them can produce outsized results. The person who finds their 4% and protects time for it will outperform the person working twice as many hours on unfocused effort.\n\nThis isn't about being lazy—it's about being strategic. Energy and time are finite. The Pareto Principle guides you to invest them where they compound most."
            },
            {
                heading: "When 80/20 Doesn't Apply",
                content: "The Pareto Principle is a heuristic, not a law. Some domains don't follow this distribution.\n\nSafety and ethics don't allow for 'good enough.' You can't apply 80/20 to airplane maintenance or medical procedures where the stakes are absolute.\n\nRelationships often require sustained, distributed attention rather than focused bursts. The 20% approach to friendship or parenting would miss the point.\n\nSome projects require completeness. An 80% complete product may be worthless if the missing 20% is critical functionality.\n\nThe wisdom is knowing when to apply the principle and when to pursue completion. For most knowledge work and business decisions, 80/20 thinking provides valuable guidance. For some domains, full attention is required."
            }
        ]
    },
    {
        id: 6,
        category: "Habits",
        title: "Atomic Habits for Deep Focus: Building Systems That Last",
        subtitle: "How tiny changes compound into powerful concentration abilities",
        date: "January 2026",
        readTime: "8 min read",
        sections: [
            {
                content: "James Clear's Atomic Habits framework has transformed how millions think about behavior change. The core insight: tiny changes, consistently applied, compound into remarkable results. This principle applies perfectly to building the capacity for deep focus."
            },
            {
                heading: "The Four Laws Applied to Focus",
                content: "Clear's four laws of behavior change—make it obvious, attractive, easy, and satisfying—provide a blueprint for building focus habits.\n\nMake focus obvious: Put your phone in another room. Use a physical timer on your desk. Create visual cues that signal 'focus time.' When your environment suggests focus, focusing becomes more natural.\n\nMake focus attractive: Pair difficult work with things you enjoy. Create a pleasant workspace. Use focus time for work you find meaningful when possible. Associate focus with positive experiences.\n\nMake focus easy: Remove all barriers to beginning. Start with just 5-minute sessions. Prepare your workspace the night before. The easier starting is, the more likely you are to start.\n\nMake focus satisfying: Track your sessions. Celebrate small wins. Notice how much more you accomplish with concentrated effort. Success builds on success."
            },
            {
                heading: "Starting Small and Scaling",
                content: "The biggest mistake in habit formation is starting too big. Committing to four hours of daily deep work when you currently do none is a recipe for failure. The initial motivation fades, and the habit never solidifies.\n\nStart with a commitment so small it seems almost silly. Five minutes of focus per day. One pomodoro. The goal isn't the work accomplished—it's establishing the pattern.\n\nOnce the habit is automatic, gradually increase duration. Add one pomodoro per week. Increase session length by five minutes. Slow growth beats ambitious collapse.\n\nIdentity precedes behavior. Instead of 'I'm trying to focus more,' think 'I'm becoming someone who does deep work.' Each session is a vote for that identity. Enough votes, and it becomes who you are."
            },
            {
                heading: "Environment Design",
                content: "You don't rise to the level of your goals—you fall to the level of your systems. And your environment is a crucial system.\n\nEvery item in your workspace either supports focus or detracts from it. Audit ruthlessly. The phone that could interrupt belongs in another room. The snacks that could tempt belong in an inconvenient location.\n\nCreate distinct spaces for different modes. If possible, have a specific location for deep work that you use for nothing else. The space itself becomes a cue for concentration.\n\nThe people around you are part of your environment too. Working alongside others who value focus reinforces the behavior. Explaining your focus goals to household members sets expectations."
            },
            {
                heading: "Habit Stacking for Focus",
                content: "New habits attach best to existing ones. 'Habit stacking' means defining new behaviors in terms of current patterns.\n\nAfter I pour my morning coffee, I will begin my first focus session. After I sit at my desk, I will put my phone in the drawer. After I finish a pomodoro, I will stand and stretch.\n\nThe existing habit becomes an automatic cue for the new one. You don't need to remember or decide—the sequence triggers itself.\n\nStack focus-supporting behaviors throughout your day. Morning routines, workspace rituals, end-of-session practices—each reinforces the next. Over time, the entire pattern becomes automatic."
            },
            {
                heading: "Recovering from Broken Streaks",
                content: "Missing a day happens. Life intervenes. The question is what happens next.\n\nNever miss twice. One skip is an accident; two begins a new pattern. When you miss, return the next opportunity. Don't wait for Monday, next month, or perfect conditions.\n\nExpect setbacks and plan for them. Identify your most common obstacles and create if-then plans: 'If I'm traveling, I will do a 10-minute focus session on my phone.' Preparation prevents permanent derailment.\n\nSelf-compassion beats self-criticism. Shame leads to avoidance. Treating yourself with understanding after a lapse makes return more likely, not less. Progress isn't linear—it's the overall trajectory that matters."
            }
        ]
    },
    {
        id: 7,
        category: "Energy",
        title: "Sleep: The Productivity Hack Everyone Ignores",
        subtitle: "Why rest is the foundation of all other optimization",
        date: "January 2026",
        readTime: "7 min read",
        sections: [
            {
                content: "In the pursuit of productivity, we optimize apps, techniques, and workflows. Yet we often neglect the single intervention that affects everything else: sleep. The research is clear—sleep deprivation devastates cognitive performance in ways no productivity system can overcome."
            },
            {
                heading: "The Cognitive Cost of Sleep Loss",
                content: "After 17-19 hours without sleep, cognitive performance equals that of someone with a blood alcohol level of 0.05%—legally impaired in many jurisdictions. After 24 hours, it drops to the equivalent of 0.10%—legally drunk.\n\nYet many professionals regularly operate in this state, working long hours fueled by caffeine, believing they're performing well. Research on self-assessment shows that sleep-deprived people dramatically overestimate their own performance.\n\nSleep deprivation impairs exactly the cognitive functions most important for knowledge work: complex decision-making, creative problem-solving, emotional regulation, and sustained attention. The very tasks that define valuable work suffer most."
            },
            {
                heading: "What Sleep Actually Does",
                content: "Sleep isn't merely the absence of waking—it's an active process of maintenance and consolidation.\n\nDuring sleep, the brain's glymphatic system clears metabolic waste that accumulates during waking hours. This includes beta-amyloid, the protein associated with Alzheimer's disease. Chronic sleep deprivation may literally allow toxins to build up in the brain.\n\nMemory consolidation happens during sleep. What you learn during the day is processed and transferred to long-term storage. Cutting sleep short cuts this process short—you learn less efficiently.\n\nDuring REM sleep, the brain makes creative connections between concepts. This is why solutions often appear after 'sleeping on' problems. Reducing sleep reduces access to this creative processing."
            },
            {
                heading: "How Much Do You Need?",
                content: "Most adults need 7-9 hours of sleep for optimal cognitive function. Some genuinely need less or more, but far fewer fall outside this range than claim to.\n\nIf you rely on caffeine to function in the morning, you're probably not getting enough sleep. If you would sleep past your alarm on weekends, you're accumulating sleep debt during the week. If you fall asleep within minutes of lying down, you're likely sleep-deprived.\n\nSleep needs are individual and can change with circumstances. Periods of intense learning, stress, or recovery may require more sleep. Tracking your performance at different sleep durations reveals your personal optimal."
            },
            {
                heading: "Optimizing Sleep Quality",
                content: "Duration matters, but so does quality. Eight hours of poor sleep isn't equivalent to eight hours of good sleep.\n\nTemperature affects sleep quality significantly. Most people sleep best in a cool room—around 65-68°F (18-20°C). The body needs to drop its core temperature to initiate and maintain sleep.\n\nLight exposure in the evening suppresses melatonin production. The blue light from screens is particularly disruptive. Dimming lights and avoiding screens in the hour before bed helps maintain natural sleep signals.\n\nConsistency matters more than most people realize. Going to bed and waking at the same time—even on weekends—strengthens circadian rhythms and improves sleep quality."
            },
            {
                heading: "The Sleep-Productivity Connection",
                content: "The time 'saved' by sleeping less is more than lost in reduced performance. Studies show that reducing sleep from 8 to 6 hours can reduce cognitive performance by up to 25%.\n\nMathematically, this means a well-rested person working 6 hours outperforms a sleep-deprived person working 8 hours. The extra hours are less productive than no hours at all—plus they incur health costs.\n\nElite performers increasingly recognize sleep as a competitive advantage. Athletes, executives, and creative professionals who once boasted about minimal sleep now protect it as their primary recovery tool.\n\nSleep is the foundation on which all other productivity techniques rest. No app, method, or system compensates for a brain that hasn't been properly restored."
            }
        ]
    },
    {
        id: 8,
        category: "Mindset",
        title: "The Psychology of Procrastination: Why We Delay and How to Stop",
        subtitle: "Understanding the emotional roots of avoidance",
        date: "January 2026",
        readTime: "8 min read",
        sections: [
            {
                content: "Procrastination isn't laziness. It isn't poor time management. At its core, procrastination is an emotion regulation problem—we avoid tasks that trigger negative feelings in favor of activities that provide immediate emotional relief."
            },
            {
                heading: "The Emotional Core of Avoidance",
                content: "When we face a difficult, boring, or anxiety-provoking task, we experience negative emotions. Procrastination is the attempt to regulate these feelings by doing something that feels better in the moment.\n\nThis explains why procrastinators often know exactly what they should be doing, and why they feel worse after procrastinating rather than better. It's not a lack of knowledge or even motivation—it's the pull of short-term emotional relief overpowering long-term goals.\n\nUnderstanding this reframes the solution. Rather than seeking more discipline or better time management, we need to address the emotional triggers that make tasks aversive in the first place."
            },
            {
                heading: "What Makes Tasks Aversive",
                content: "Different tasks trigger procrastination for different reasons. Identifying your specific triggers helps target solutions.\n\nBoredom: The task just isn't interesting. Solutions include pairing it with something you enjoy, gamifying it, or batching it with other boring tasks.\n\nAnxiety: You're worried about the outcome—failure, judgment, or inadequacy. Solutions include starting with a tiny step, focusing on the process rather than outcome, or reality-testing your fears.\n\nFrustration: The task is difficult or unclear. Solutions include breaking it into smaller pieces, seeking help, or accepting that struggle is part of the process.\n\nResentment: You don't want to do it or feel forced into it. Solutions include connecting the task to your own values, renegotiating if possible, or accepting what you can't change."
            },
            {
                heading: "The Power of Starting",
                content: "The Zeigarnik effect, discovered by psychologist Bluma Zeigarnik, shows that the brain remembers incomplete tasks better than complete ones. Once we start something, there's a psychological pull to finish it.\n\nThis means the hardest part of most tasks is truly beginning. The resistance we feel beforehand often dissolves once we're actually working.\n\nCommit to just two minutes. You can do almost anything for two minutes. Often, you'll continue past that point—momentum takes over. And even if you stop at two minutes, you've broken the initial resistance and made resuming easier.\n\nMake starting as easy as possible. Prepare materials in advance. Remove all barriers between you and beginning. When starting is effortless, it happens more often."
            },
            {
                heading: "Self-Compassion Over Self-Criticism",
                content: "Counterintuitively, self-criticism makes procrastination worse. When we shame ourselves for procrastinating, we create more negative emotions—which we then try to avoid through more procrastination. It's a vicious cycle.\n\nSelf-compassion—treating yourself with the same understanding you'd offer a friend—breaks this cycle. You acknowledge the difficulty without judgment, then redirect toward action.\n\nResearch shows that self-compassionate people procrastinate less, not more. Kindness toward yourself creates the emotional safety to face difficult tasks. Harsh self-judgment makes them more threatening."
            },
            {
                heading: "Practical Interventions",
                content: "Implementation intentions help: 'When [situation], I will [action].' This pre-decides behavior before the emotional moment of choice.\n\nTemptation bundling pairs aversive tasks with enjoyable ones: only listen to a favorite podcast while doing administrative work, for example. The positive anticipation counterbalances the negative.\n\nStructured procrastination uses the avoidance tendency productively. Designate one very important task—then avoid it by doing other important tasks. You'll be productive while technically procrastinating.\n\nAccountability partners add social commitment. Telling someone else your intention makes following through more likely. The fear of disappointing them outweighs the desire to avoid."
            }
        ]
    }
];

const categories = ["All", "Deep Work", "ADHD", "Pomodoro", "Pareto", "Habits", "Energy", "Mindset", "Productivity"];

export default function BlogPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

    useEffect(() => {
        const prefs = getPreferences();
        setDarkMode(prefs.darkMode || false);
    }, []);

    const bg = darkMode ? "#000" : "#FFF";
    const text = darkMode ? "#FFF" : "#000";
    const textMuted = darkMode ? "#AAA" : "#555";
    const textSecondary = darkMode ? "#888" : "#666";
    const border = darkMode ? "#222" : "#EEE";

    const filteredArticles = selectedCategory === "All"
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    // Article Detail View
    if (selectedArticle) {
        return (
            <div style={{ minHeight: '100vh', background: bg }}>
                {/* Header */}
                <header style={{
                    padding: '24px 32px',
                    maxWidth: 680,
                    margin: '0 auto'
                }}>
                    <button
                        onClick={() => setSelectedArticle(null)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: textSecondary,
                            fontSize: '0.9375rem',
                            cursor: 'pointer',
                            padding: 0
                        }}
                    >
                        ← Back
                    </button>
                </header>

                {/* Article Header */}
                <div style={{
                    maxWidth: 680,
                    margin: '0 auto',
                    padding: '40px 24px 0',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: textSecondary,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        marginBottom: 20
                    }}>
                        {selectedArticle.date} · {selectedArticle.readTime}
                    </p>

                    <h1 style={{
                        color: text,
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                        fontWeight: 500,
                        lineHeight: 1.25,
                        margin: '0 auto 20px',
                        letterSpacing: '-0.02em'
                    }}>
                        {selectedArticle.title}
                    </h1>

                    <p style={{
                        color: textSecondary,
                        fontSize: '1.0625rem',
                        maxWidth: 550,
                        margin: '0 auto 60px',
                        lineHeight: 1.5
                    }}>
                        {selectedArticle.subtitle}
                    </p>
                </div>

                {/* Article Content */}
                <article style={{
                    maxWidth: 680,
                    margin: '0 auto',
                    padding: '60px 24px 100px'
                }}>
                    {selectedArticle.sections.map((section, index) => (
                        <div key={index} style={{ marginBottom: 48 }}>
                            {section.heading && (
                                <h2 style={{
                                    fontSize: '1.375rem',
                                    fontWeight: 500,
                                    color: text,
                                    marginBottom: 16,
                                    marginTop: index === 0 ? 0 : 48,
                                    letterSpacing: '-0.01em'
                                }}>
                                    {section.heading}
                                </h2>
                            )}
                            {section.content.split('\n\n').map((paragraph, pIndex) => (
                                <p key={pIndex} style={{
                                    color: textMuted,
                                    fontSize: '1.0625rem',
                                    lineHeight: 1.8,
                                    marginBottom: 20
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}

                    <div style={{
                        marginTop: 80,
                        paddingTop: 40,
                        borderTop: `1px solid ${border}`,
                        textAlign: 'center'
                    }}>
                        <p style={{ color: textSecondary, marginBottom: 20, fontSize: '0.9375rem' }}>
                            Ready to put these ideas into practice?
                        </p>
                        <Link href="/" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '14px 32px',
                            background: text,
                            color: bg,
                            textDecoration: 'none',
                            borderRadius: 8,
                            fontSize: '0.9375rem',
                            fontWeight: 500
                        }}>
                            Start a Focus Session →
                        </Link>
                    </div>
                </article>
            </div>
        );
    }

    // Article List View
    return (
        <div style={{
            minHeight: '100vh',
            background: bg,
            transition: 'background 0.3s ease'
        }}>
            {/* Header */}
            <header style={{
                padding: '24px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 1000,
                margin: '0 auto'
            }}>
                <Link
                    href="/"
                    style={{
                        color: text,
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        fontWeight: 500
                    }}
                >
                    ← LockIn
                </Link>
            </header>

            <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 100px' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 500,
                    color: text,
                    marginBottom: 8,
                    letterSpacing: '-0.02em'
                }}>
                    Articles
                </h1>
                <p style={{
                    color: textSecondary,
                    fontSize: '1rem',
                    marginBottom: 40
                }}>
                    Essays on focus, productivity, and deep work
                </p>

                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    gap: 6,
                    flexWrap: 'wrap',
                    marginBottom: 48
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '6px 14px',
                                background: selectedCategory === cat ? text : 'transparent',
                                color: selectedCategory === cat ? bg : textSecondary,
                                border: 'none',
                                borderRadius: 100,
                                fontSize: '0.8125rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {filteredArticles.map((article) => (
                        <article
                            key={article.id}
                            onClick={() => setSelectedArticle(article)}
                            style={{
                                padding: '28px 0',
                                borderBottom: `1px solid ${border}`,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{
                                        fontSize: '0.6875rem',
                                        color: textSecondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        display: 'block',
                                        marginBottom: 8
                                    }}>
                                        {article.category} · {article.readTime}
                                    </span>
                                    <h2 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 500,
                                        color: text,
                                        margin: 0,
                                        marginBottom: 6,
                                        lineHeight: 1.3
                                    }}>
                                        {article.title}
                                    </h2>
                                    <p style={{
                                        fontSize: '0.9375rem',
                                        color: textSecondary,
                                        margin: 0,
                                        lineHeight: 1.5
                                    }}>
                                        {article.subtitle}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}
